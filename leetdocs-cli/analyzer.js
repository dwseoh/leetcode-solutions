/**
 * Static analysis complexity estimator for Python solutions.
 * Analyzes common LeetCode patterns to estimate time/space complexity.
 */

/**
 * Analyze a Python solution file and estimate time/space complexity.
 * Returns { time: "O(...)", space: "O(...)" }
 */
export function analyzeComplexity(code) {
    const lines = code.split('\n');
    const cleaned = stripComments(code);

    const time = estimateTime(cleaned, lines);
    const space = estimateSpace(cleaned, lines);

    return { time, space };
}

/**
 * Strip Python comments and docstrings
 */
function stripComments(code) {
    // Remove docstrings
    let cleaned = code.replace(/"""[\s\S]*?"""/g, '');
    cleaned = cleaned.replace(/'''[\s\S]*?'''/g, '');
    // Remove single-line comments
    cleaned = cleaned.replace(/#.*$/gm, '');
    return cleaned;
}

/**
 * Estimate time complexity from code patterns
 */
function estimateTime(code, lines) {
    const lower = code.toLowerCase();

    // Check for sorting
    const hasSorting = /\.sort\(/.test(code) || /sorted\(/.test(code);

    // Check for binary search patterns
    const hasBinarySearch =
        /bisect/.test(code) ||
        (/while\s+.*<.*:/.test(code) && (/mid\s*=/.test(code) || /\/\/\s*2/.test(code)));

    // Check for heap operations
    const hasHeap = /heapq\./.test(code) || /heappush|heappop/.test(code);

    // Count loop nesting depth
    const maxLoopDepth = getMaxLoopDepth(lines);

    // Check for recursion
    const funcNames = [...code.matchAll(/def\s+(\w+)\s*\(/g)].map(m => m[1]);
    const hasRecursion = funcNames.some(name => {
        const funcBody = getFunctionBody(code, name);
        return funcBody && new RegExp(`\\b${name}\\s*\\(`).test(funcBody);
    });

    // Check for specific patterns
    const hasWhileHalving = /while\b[\s\S]*?(?:\/\/=?\s*2|>>=?\s*1|<<)/.test(code);

    // Determine time complexity
    if (hasBinarySearch || hasWhileHalving) {
        if (maxLoopDepth >= 1) return 'O(n log n)';
        return 'O(log n)';
    }

    if (hasSorting) {
        // Sorting dominates unless there's something worse
        if (maxLoopDepth >= 2) return `O(n^${maxLoopDepth})`;
        return 'O(n log n)';
    }

    if (hasHeap) {
        return 'O(n log k)';
    }

    if (hasRecursion) {
        // Check if it's divide-and-conquer (halving)
        if (/\[\s*:.*mid\s*\]|\[.*mid\s*:\s*\]/.test(code) || /\/\/\s*2/.test(code)) {
            return 'O(n log n)';
        }
        // Check for exponential (e.g., two recursive calls without memoization)
        const hasMemo = /@cache|@lru_cache|memo|dp\[/.test(code);
        if (!hasMemo) {
            const recursiveCalls = funcNames.reduce((count, name) => {
                const body = getFunctionBody(code, name);
                if (!body) return count;
                const calls = (body.match(new RegExp(`\\b${name}\\s*\\(`, 'g')) || []).length;
                return Math.max(count, calls);
            }, 0);
            if (recursiveCalls >= 2) return 'O(2^n)';
        }
        return 'O(n)';
    }

    if (maxLoopDepth === 0) return 'O(1)';
    if (maxLoopDepth === 1) return 'O(n)';
    if (maxLoopDepth === 2) return 'O(n^2)';
    return `O(n^${maxLoopDepth})`;
}

/**
 * Estimate space complexity from code patterns
 */
function estimateSpace(code, lines) {
    const lower = code.toLowerCase();

    // Check for fixed-size allocations (constant space)
    const hasFixedArray = /\[\s*0\s*\]\s*\*\s*\d+/.test(code) || /\[0\]\s*\*\s*(26|128|256)/.test(code);

    // Check for dynamic data structures
    const hasDict = /dict\(|{.*:.*}|\bdefaultdict\b/.test(code) || /\w+\s*=\s*\{\}/.test(code);
    const hasSet = /set\(|\bset\b/.test(code);
    const hasList = /\[\s*\]|\blist\(/.test(code) || /\.append\(/.test(code);
    const hasDeque = /deque\(/.test(code);
    const hasHeap = /heapq/.test(code);

    // Check for matrix/2D structures
    const has2D = /\[\s*\[/.test(code) || /\[\s*\]\s*\*/.test(code);

    // Check for recursion (stack space)
    const funcNames = [...code.matchAll(/def\s+(\w+)\s*\(/g)].map(m => m[1]);
    const hasRecursion = funcNames.some(name => {
        const funcBody = getFunctionBody(code, name);
        return funcBody && new RegExp(`\\b${name}\\s*\\(`).test(funcBody);
    });

    // Determine space complexity
    if (has2D) return 'O(n * m)';

    if (hasDict || hasSet || hasList || hasDeque || hasHeap) {
        return 'O(n)';
    }

    if (hasRecursion) {
        return 'O(n)'; // recursion stack
    }

    if (hasFixedArray) return 'O(1)';

    return 'O(1)';
}

/**
 * Get the maximum loop nesting depth in the code
 */
function getMaxLoopDepth(lines) {
    let maxDepth = 0;
    let currentDepths = []; // stack of indent levels for active loops

    for (const line of lines) {
        const stripped = line.replace(/#.*$/, '').trimEnd();
        if (!stripped.trim()) continue;

        const indent = stripped.length - stripped.trimStart().length;
        const trimmed = stripped.trim();

        // Pop loops that are no longer active (indent decreased)
        while (currentDepths.length > 0 && indent <= currentDepths[currentDepths.length - 1]) {
            currentDepths.pop();
        }

        // Detect loop statements
        if (/^(for|while)\s+/.test(trimmed) && trimmed.endsWith(':')) {
            currentDepths.push(indent);
            maxDepth = Math.max(maxDepth, currentDepths.length);
        }
    }

    return maxDepth;
}

/**
 * Extract the body of a function by name
 */
function getFunctionBody(code, funcName) {
    const regex = new RegExp(`def\\s+${funcName}\\s*\\([^)]*\\)[^:]*:`);
    const match = regex.exec(code);
    if (!match) return null;

    const startIdx = match.index + match[0].length;
    const lines = code.substring(startIdx).split('\n');

    if (lines.length <= 1) return '';

    // Get the indent of the first line of the body
    let bodyIndent = -1;
    const bodyLines = [];

    for (const line of lines.slice(1)) {
        const stripped = line.trimEnd();
        if (!stripped.trim()) {
            bodyLines.push(stripped);
            continue;
        }
        const indent = stripped.length - stripped.trimStart().length;
        if (bodyIndent === -1) {
            bodyIndent = indent;
        }
        if (indent < bodyIndent && stripped.trim()) break;
        bodyLines.push(stripped);
    }

    return bodyLines.join('\n');
}
