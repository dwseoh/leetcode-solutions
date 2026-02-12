import fs from 'fs/promises';
import path from 'path';

/**
 * Build the README content from scraped problem data.
 * Matches the 000-template format exactly.
 */
function generateReadme(problemData) {
    const paddedId = problemData.id.toString().padStart(3, '0');

    // Format topics
    const topicsStr = problemData.topics.length > 0
        ? problemData.topics.map(t => `\`${t}\``).join(' ')
        : '`topic1` `topic2` `topic3`';

    // Format companies
    const companiesStr = problemData.companies.length > 0
        ? problemData.companies.map(c => `\`${c}\``).join(' ')
        : '`company1` `company2`';

    // Format acceptance rate
    const acceptanceStr = problemData.acceptanceRate
        ? `**Acceptance Rate:** \`${problemData.acceptanceRate}%\`  \n`
        : '';

    // Format problem statement
    const problemStatement = problemData.problemStatement
        ? problemData.problemStatement
        : 'Paste or summarize the problem statement here.';

    // Format examples
    let examplesStr = '';
    if (problemData.examples && problemData.examples.length > 0) {
        examplesStr = problemData.examples.map((ex, i) => {
            return `**Example ${i + 1}:**\n\`\`\`\n${ex}\n\`\`\``;
        }).join('\n\n');
    } else {
        examplesStr = `**Example:**\n\`\`\`\nInput: \nOutput: \nExplanation: \n\`\`\``;
    }

    // Format constraints
    let constraintsStr = '';
    if (problemData.constraints && problemData.constraints.length > 0) {
        constraintsStr = problemData.constraints.map(c => `- \`${c}\``).join('\n');
    } else {
        constraintsStr = '- ';
    }

    // Format similar questions as a table
    let relatedProblemsStr = '';
    if (problemData.similarQuestions && problemData.similarQuestions.length > 0) {
        const rows = problemData.similarQuestions.map(q =>
            `| [${q.title}](https://leetcode.com/problems/${q.slug}/) | ${q.difficulty} |`
        ).join('\n');
        relatedProblemsStr = `
---

## Related Problems

| Title | Difficulty |
|-------|------------|
${rows}`;
    } else {
        relatedProblemsStr = `
<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->`;
    }

    return `# ${paddedId}. ${problemData.title}

**Difficulty:** \`${problemData.difficulty}\`  
${acceptanceStr}**Topics:** ${topicsStr}  
**Companies:** ${companiesStr}  
**Date Solved:** YYYY-MM-DD  
**Status:** ✅ Solved / 🔁 Revisit / ❌ Unsolved  

🔗 [LeetCode Link](${problemData.url})

---

## Problem

> ${problemStatement}

${examplesStr}

**Constraints:**
${constraintsStr}

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** \`O()\`  
**Space Complexity:** \`O()\`

---

## Solution

\`\`\`cpp
// C++ solution


\`\`\`

---

## Alternative Approaches

### Approach 2: [Name]
<!-- Briefly describe trade-offs vs your main approach -->

\`\`\`cpp


\`\`\`

**Time:** \`O()\` | **Space:** \`O()\`

---

## Edge Cases

- [ ] Empty input
- [ ] Single element
- [ ] All duplicates
- [ ] Negative numbers
- [ ] Max constraints

---

## Notes & Mistakes

<!-- What tripped you up? What would you do differently next time? -->

${relatedProblemsStr}
`;
}

/**
 * Generate metadata.json content using scraped data.
 */
function generateMetadata(problemData) {
    const meta = {
        id: problemData.id,
        title: problemData.title,
        slug: problemData.slug,
        url: problemData.url,
        difficulty: problemData.difficulty,
        acceptance_rate: problemData.acceptanceRate || null,
        status: "unsolved",
        date_solved: "YYYY-MM-DD",
        attempts: 0,
        complexity: {
            time: "O()",
            space: "O()"
        },
        topics: problemData.topics || [],
        patterns: problemData.patterns || [],
        companies: problemData.companies || [],
        similar_questions: (problemData.similarQuestions || []).map(q => ({
            title: q.title,
            slug: q.slug,
            difficulty: q.difficulty
        })),
        notes: ""
    };
    return meta;
}

/**
 * Get the next available ID by scanning existing directories
 */
export async function getNextId(parentDir) {
    try {
        const entries = await fs.readdir(parentDir, { withFileTypes: true });
        const dirs = entries.filter(e => e.isDirectory());

        let maxId = 0;
        for (const dir of dirs) {
            const match = dir.name.match(/^(\d+)-/);
            if (match) {
                const id = parseInt(match[1]);
                if (id > maxId) maxId = id;
            }
        }

        return maxId + 1;
    } catch (error) {
        return 1;
    }
}

/**
 * Generate directory name from ID and title
 */
function generateDirName(id, title) {
    const paddedId = id.toString().padStart(4, '0');
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

    return `${paddedId}-${slug}`;
}

/**
 * Check if a directory already exists
 */
export async function directoryExists(parentDir, id, title) {
    const dirName = generateDirName(id, title);
    const dirPath = path.join(parentDir, dirName);
    try {
        await fs.access(dirPath);
        return { exists: true, dirPath, dirName };
    } catch {
        return { exists: false, dirPath, dirName };
    }
}

/**
 * Generate directory with README and metadata.
 * If the directory already exists, only overwrites README.md and metadata.json.
 */
export async function generateDirectory(parentDir, problemData) {
    const dirName = generateDirName(problemData.id, problemData.title);
    const dirPath = path.join(parentDir, dirName);

    let alreadyExisted = false;
    try {
        await fs.access(dirPath);
        alreadyExisted = true;
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }

    // Write README.md (create or overwrite)
    const readmeContent = generateReadme(problemData);
    await fs.writeFile(path.join(dirPath, 'README.md'), readmeContent);

    // Write metadata.json (create or overwrite)
    const metadata = generateMetadata(problemData);
    await fs.writeFile(
        path.join(dirPath, 'metadata.json'),
        JSON.stringify(metadata, null, 2)
    );

    return { dirPath, alreadyExisted };
}
