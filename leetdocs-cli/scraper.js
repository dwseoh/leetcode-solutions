import axios from 'axios';
import * as cheerio from 'cheerio';

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql/';
const NEETCODE_DATA_URL = 'https://raw.githubusercontent.com/neetcode-gh/leetcode/main/.problemSiteData.json';

/**
 * Wrap axios calls with network error handling
 */
function handleNetworkError(error, source) {
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN' || error.code === 'ENETUNREACH' || error.code === 'ECONNREFUSED') {
        throw new Error('No internet connection. Please check your wifi and try again.');
    }
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        throw new Error('Connection timed out. Please check your internet and try again.');
    }
    throw new Error(`Failed to scrape ${source}: ${error.message}`);
}

/**
 * Query LeetCode GraphQL API for full problem details
 */
async function queryLeetCodeGraphQL(slug) {
    const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        titleSlug
        difficulty
        content
        acRate
        similarQuestions
        topicTags {
          name
          slug
        }
        companyTags {
          name
          slug
        }
        hints
      }
    }
  `;

    try {
        const response = await axios.post(LEETCODE_GRAPHQL, {
            query,
            variables: { titleSlug: slug }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const data = response.data?.data?.question;
        if (!data) {
            throw new Error(`PROBLEM_NOT_FOUND:${slug}`);
        }
        return data;
    } catch (error) {
        if (error.message?.startsWith('PROBLEM_NOT_FOUND')) throw error;
        handleNetworkError(error, 'LeetCode');
    }
}

/**
 * Search LeetCode for a problem by title and return the slug
 */
async function searchLeetCodeByTitle(title) {
    const query = `
    query problemsetQuestionList($categorySlug: String, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        filters: $filters
      ) {
        questions: data {
          title
          titleSlug
          difficulty
        }
      }
    }
  `;

    try {
        const response = await axios.post(LEETCODE_GRAPHQL, {
            query,
            variables: {
                categorySlug: "",
                filters: { searchKeywords: title }
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const questions = response.data?.data?.problemsetQuestionList?.questions || [];
        // Only return exact title match — fuzzy matches cause wrong problem mapping
        const exact = questions.find(q => q.title.toLowerCase() === title.toLowerCase());
        if (exact) return exact.titleSlug;
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Parse HTML content from LeetCode into problem statement, examples, and constraints.
 *
 * LeetCode uses two HTML formats:
 *   Old format: <pre>Input: ...\nOutput: ...</pre>
 *   New format: <div class="example-block"><p><strong>Input:</strong> ...</p>...</div>
 */
function parseContent(html) {
    if (!html) return { problemStatement: '', examples: [], constraints: [] };

    const $ = cheerio.load(html);

    let problemStatement = '';
    let examples = [];
    let constraints = [];

    const allElements = $('body').children().toArray();
    let phase = 'statement'; // 'statement' -> 'examples' -> 'constraints'

    for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i];
        const tagName = ($(el).prop('tagName') || '').toLowerCase();
        const text = $(el).text().trim();

        // Detect example markers: <p><strong class="example">Example N:</strong></p>
        if ($(el).find('strong.example').length > 0 || text.match(/^Example\s+\d+:/)) {
            phase = 'examples';
            const nextEl = allElements[i + 1];
            if (!nextEl) continue;

            const nextTag = ($(nextEl).prop('tagName') || '').toLowerCase();

            // Old format: example is in a <pre> block
            if (nextTag === 'pre') {
                examples.push($(nextEl).text().trim());
                i++;
            }
            // New format: example is in a <div class="example-block">
            else if (nextTag === 'div' && $(nextEl).hasClass('example-block')) {
                // Extract Input/Output/Explanation from the div's <p> children
                const parts = [];
                $(nextEl).find('p').each((_, p) => {
                    const pText = $(p).text().trim();
                    if (pText) parts.push(pText);
                });
                examples.push(parts.join('\n'));
                i++;
            }
            continue;
        }

        // Detect standalone <pre> blocks in example phase (old format)
        if (phase === 'examples' && tagName === 'pre') {
            const preText = $(el).text().trim();
            if (preText.includes('Input') || preText.includes('Output')) {
                examples.push(preText);
            }
            continue;
        }

        // Detect standalone <div class="example-block"> in example phase (new format)
        if (phase === 'examples' && tagName === 'div' && $(el).hasClass('example-block')) {
            const parts = [];
            $(el).find('p').each((_, p) => {
                const pText = $(p).text().trim();
                if (pText) parts.push(pText);
            });
            examples.push(parts.join('\n'));
            continue;
        }

        // Detect "Constraints:" marker
        if (text === 'Constraints:' || text.startsWith('Constraints:')) {
            phase = 'constraints';
            continue;
        }

        // Collect constraints from <ul>
        if (phase === 'constraints' && tagName === 'ul') {
            constraints = $(el).find('li').toArray().map(li => $(li).text().trim());
            continue;
        }

        // Collect problem statement (before first example)
        if (phase === 'statement' && text && text !== '\u00a0' && text !== '') {
            if (problemStatement) problemStatement += '\n';
            problemStatement += text;
        }
    }

    return { problemStatement, examples, constraints };
}

/**
 * Parse similarQuestions JSON string from LeetCode
 */
function parseSimilarQuestions(rawStr) {
    if (!rawStr) return [];
    try {
        const parsed = JSON.parse(rawStr);
        return parsed.map(q => ({
            title: q.title,
            slug: q.titleSlug,
            difficulty: q.difficulty
        }));
    } catch {
        return [];
    }
}

/**
 * Map topic tag slugs to our format
 */
function mapTopicSlug(tagSlug) {
    const mapping = {
        'array': 'array',
        'hash-table': 'hash-map',
        'sliding-window': 'sliding-window',
        'two-pointers': 'two-pointers',
        'binary-search': 'binary-search',
        'dynamic-programming': 'dynamic-programming',
        'recursion': 'recursion',
        'backtracking': 'backtracking',
        'greedy': 'greedy',
        'graph': 'graph',
        'breadth-first-search': 'bfs',
        'depth-first-search': 'dfs',
        'tree': 'tree',
        'binary-tree': 'tree',
        'linked-list': 'linked-list',
        'stack': 'stack',
        'queue': 'queue',
        'heap-priority-queue': 'heap',
        'trie': 'trie',
        'math': 'math',
        'string': 'string',
        'bit-manipulation': 'bit-manipulation',
        'sorting': 'sorting',
        'matrix': 'matrix',
        'union-find': 'union-find',
        'design': 'design',
        'simulation': 'simulation',
        'counting': 'counting',
        'prefix-sum': 'prefix-sum',
        'monotonic-stack': 'monotonic-stack',
        'divide-and-conquer': 'divide-and-conquer',
    };
    return mapping[tagSlug] || tagSlug;
}

/**
 * Map NeetCode pattern string to slug
 */
function mapPattern(pattern) {
    const mapping = {
        'Arrays & Hashing': 'arrays-and-hashing',
        'Two Pointers': 'two-pointers',
        'Sliding Window': 'sliding-window',
        'Stack': 'stack',
        'Binary Search': 'binary-search',
        'Linked List': 'linked-list',
        'Trees': 'tree',
        'Tries': 'trie',
        'Heap / Priority Queue': 'heap',
        'Backtracking': 'backtracking',
        'Graphs': 'graph',
        'Advanced Graphs': 'graph',
        '1-D Dynamic Programming': 'dynamic-programming',
        '2-D Dynamic Programming': 'dynamic-programming',
        'Greedy': 'greedy',
        'Intervals': 'intervals',
        'Math & Geometry': 'math',
        'Bit Manipulation': 'bit-manipulation',
    };
    return mapping[pattern] || pattern.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Scrape LeetCode problem using GraphQL API.
 * Returns full problem data including acceptance rate and similar questions.
 */
export async function scrapeLeetCode(url) {
    const slugMatch = url.match(/problems\/([^\/?#]+)/);
    if (!slugMatch) {
        throw new Error('Invalid LeetCode URL. Expected format: https://leetcode.com/problems/problem-name/');
    }
    const slug = slugMatch[1];

    const data = await queryLeetCodeGraphQL(slug);
    const { problemStatement, examples, constraints } = parseContent(data.content);

    const topics = (data.topicTags || []).map(t => mapTopicSlug(t.slug));
    const companies = (data.companyTags || []).map(c => c.slug);
    const similarQuestions = parseSimilarQuestions(data.similarQuestions);
    const acceptanceRate = data.acRate ? Math.round(data.acRate * 10) / 10 : null;

    return {
        title: data.title,
        slug: data.titleSlug,
        url: `https://leetcode.com/problems/${data.titleSlug}/`,
        difficulty: data.difficulty,
        acceptanceRate,
        topics,
        companies,
        patterns: [],
        problemStatement,
        examples,
        constraints,
        similarQuestions,
    };
}

/**
 * Attempt to find a LeetCode slug from a NeetCode slug.
 * Tries multiple strategies:
 *   1. Match against the NeetCode GitHub data file
 *   2. Humanize the slug and search LeetCode by title
 *   3. Try using the slug directly
 */
export async function lookupNeetCodeSlug(neetcodeSlug) {
    // Strategy 1: NeetCode GitHub data file
    try {
        const response = await axios.get(NEETCODE_DATA_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000
        });

        const problems = response.data;

        for (const key of Object.keys(problems)) {
            const p = problems[key];
            if (!p.problem || !p.link) continue;

            const linkSlug = p.link.replace(/\/$/, '');

            // Match by problem name slugified
            const nameSlug = p.problem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            if (nameSlug === neetcodeSlug) {
                return { leetcodeSlug: linkSlug, pattern: p.pattern, title: p.problem };
            }

            // Match by code field
            if (p.code && p.code.includes(neetcodeSlug)) {
                return { leetcodeSlug: linkSlug, pattern: p.pattern, title: p.problem };
            }

            // Match by leetcode slug directly
            if (linkSlug === neetcodeSlug) {
                return { leetcodeSlug: linkSlug, pattern: p.pattern, title: p.problem };
            }
        }
    } catch (error) {
        // If we can't reach the data file, continue to strategy 2
        if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN' || error.code === 'ENETUNREACH') {
            throw new Error('No internet connection. Please check your wifi and try again.');
        }
    }

    // Strategy 2: Humanize the slug and search LeetCode
    // "duplicate-integer" -> "Duplicate Integer" -> search LeetCode
    const humanized = neetcodeSlug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    const lcSlug = await searchLeetCodeByTitle(humanized);
    if (lcSlug) {
        return { leetcodeSlug: lcSlug, pattern: null, title: humanized };
    }

    // Strategy 3: Try using the neetcode slug directly as a leetcode slug
    try {
        await queryLeetCodeGraphQL(neetcodeSlug);
        return { leetcodeSlug: neetcodeSlug, pattern: null, title: null };
    } catch {
        // Slug doesn't exist on LeetCode either
    }

    return null;
}

/**
 * Scrape NeetCode problem by auto-mapping to LeetCode.
 * If leetcodeUrl is provided, uses that directly (fallback).
 */
export async function scrapeNeetCode(url, leetcodeUrl = null) {
    let leetcodeSlug;
    let neetcodePattern = null;

    if (leetcodeUrl) {
        const match = leetcodeUrl.match(/problems\/([^\/?#]+)/);
        if (!match) throw new Error('Invalid LeetCode URL.');
        leetcodeSlug = match[1];
    } else {
        const slugMatch = url.match(/problems\/([^\/?#]+)/);
        if (!slugMatch) {
            throw new Error('Invalid NeetCode URL. Expected format: https://neetcode.io/problems/problem-name');
        }

        const lookup = await lookupNeetCodeSlug(slugMatch[1]);
        if (!lookup) {
            throw new Error(`NEETCODE_LOOKUP_FAILED:${slugMatch[1]}`);
        }

        leetcodeSlug = lookup.leetcodeSlug;
        neetcodePattern = lookup.pattern;
    }

    const result = await scrapeLeetCode(`https://leetcode.com/problems/${leetcodeSlug}/`);

    if (neetcodePattern) {
        result.patterns = [mapPattern(neetcodePattern)];
    }

    return result;
}
