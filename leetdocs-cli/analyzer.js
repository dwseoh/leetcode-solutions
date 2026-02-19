/**
 * Static analysis complexity estimator for Python, C, and C++ solutions.
 * Analyzes common LeetCode patterns to estimate time/space complexity.
 */

/**
 * Detect the language of a file by extension
 */
function detectLanguage(filename) {
    if (filename.endsWith('.py')) return 'python';
    if (filename.endsWith('.cpp') || filename.endsWith('.cc') || filename.endsWith('.cxx')) return 'cpp';
    if (filename.endsWith('.c')) return 'c';
    return 'unknown';
}

/**
 * Analyze a solution file and estimate time/space complexity.
 * Returns { time: "O(...)", space: "O(...)" }
 */
export function analyzeComplexity(code, filename = 'main.py') {
    const lang = detectLanguage(filename);
    const cleaned = stripComments(code, lang);
    const lines = cleaned.split('\n');

    const time = estimateTime(cleaned, lines, lang);
    const space = estimateSpace(cleaned, lines, lang);

    return { time, space };
}

/**
 * Strip comments and string literals
 */
function stripComments(code, lang) {
    if (lang === 'python') {
        let cleaned = code.replace(/"""[\s\S]*?"""/g, '');
        cleaned = cleaned.replace(/'''[\s\S]*?'''/g, '');
        cleaned = cleaned.replace(/#.*$/gm, '');
        return cleaned;
    }

    // C/C++: remove block and line comments
    let cleaned = code.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/\/\/.*$/gm, '');
    return cleaned;
}

// ───────────────────────────────────────────────
//  TIME COMPLEXITY
// ───────────────────────────────────────────────

function estimateTime(code, lines, lang) {
    const hasSorting = lang === 'python'
        ? (/\.sort\(/.test(code) || /sorted\(/.test(code))
        : (/\bsort\s*\(/.test(code) || /std::sort/.test(code));

    const hasBinarySearch = lang === 'python'
        ? /bisect/.test(code)
        : (/\blower_bound\b|\bupper_bound\b|\bbinary_search\b/.test(code));
    const hasManualBinarySearch = /while\s+.*<.*/.test(code) && (/mid\s*=/.test(code) || /\/\s*2/.test(code));

    const hasHeap = lang === 'python'
        ? /heapq\./.test(code)
        : (/priority_queue/.test(code) || /\bmake_heap\b|\bpush_heap\b/.test(code));

    const loopInfo = lang === 'python'
        ? getMaxLoopDepthPython(lines)
        : getMaxLoopDepthC(lines);
    const maxLoopDepth = loopInfo.depth;
    const hasCharIteration = loopInfo.hasCharIteration;
    const hasBucketTraversal = loopInfo.hasBucketTraversal;
    const hasAmortizedLinear = loopInfo.hasAmortizedLinear;
    const hasOnlyConstantLoops = loopInfo.hasOnlyConstantLoops;

    const hasRecursion = detectRecursion(code, lang);
    const hasWhileHalving = /while\b[\s\S]*?(?:\/=?\s*2|>>=?\s*1)/.test(code);

    // If all loops have constant bounds, the entire algorithm is O(1)
    if (hasOnlyConstantLoops && maxLoopDepth > 0) return 'O(1)';

    // Determine time complexity
    if (hasBinarySearch || hasManualBinarySearch || hasWhileHalving) {
        if (maxLoopDepth >= 1) return 'O(n log n)';
        return 'O(log n)';
    }

    if (hasSorting) {
        if (maxLoopDepth >= 2) return `O(n^${maxLoopDepth})`;
        return 'O(n log n)';
    }

    if (hasHeap) return 'O(n log k)';

    if (hasRecursion) {
        if (/\/\s*2/.test(code) || />>/.test(code)) return 'O(n log n)';
        const hasMemo = lang === 'python'
            ? /@cache|@lru_cache|memo|dp\[/.test(code)
            : (/\bmemo\b|\bdp\[/.test(code) || /unordered_map.*memo/.test(code));
        if (!hasMemo && countRecursiveCalls(code, lang) >= 2) return 'O(2^n)';
        return 'O(n)';
    }

    if (maxLoopDepth === 0) return 'O(1)';
    if (maxLoopDepth === 1) return 'O(n)';
    if (maxLoopDepth === 2 && (hasBucketTraversal || hasAmortizedLinear)) return 'O(n)';
    if (maxLoopDepth === 2 && hasCharIteration) return 'O(n * k)';
    if (maxLoopDepth === 2) return 'O(n^2)';
    return `O(n^${maxLoopDepth})`;
}

// ───────────────────────────────────────────────
//  SPACE COMPLEXITY
// ───────────────────────────────────────────────

function estimateSpace(code, lines, lang) {
    const loopInfo = lang === 'python'
        ? getMaxLoopDepthPython(lines)
        : getMaxLoopDepthC(lines);
    if (lang === 'python') return estimateSpacePython(code, loopInfo.hasOnlyConstantLoops);
    return estimateSpaceC(code, loopInfo.hasOnlyConstantLoops);
}

function estimateSpacePython(code, hasOnlyConstantLoops = false) {
    const hasFixedArray = /\[\s*0\s*\]\s*\*\s*\d+/.test(code);
    const hasDict = /dict\(|{.*:.*}|\bdefaultdict\b/.test(code) || /\w+\s*=\s*\{\}/.test(code);
    const hasSet = /set\(/.test(code);
    const hasList = /\[\s*\]|\blist\(/.test(code) || /\.append\(/.test(code);
    const hasDeque = /deque\(/.test(code);
    // True 2D arrays like [[0]*m for ...] or nested list literals, but NOT
    // [[] for ...] which just creates a flat list of empty sublists (O(n))
    const has2D = /\[\s*\[/.test(code) && !/\[\s*\[\s*\]\s*(for|,)/.test(code);

    // If all loops are constant-bound, containers populated inside them are O(1)
    if (hasOnlyConstantLoops) return 'O(1)';

    if (has2D) return 'O(n * m)';
    if (hasDict || hasSet || hasList || hasDeque) return 'O(n)';
    if (hasFixedArray) return 'O(1)';
    if (detectRecursion(code, 'python')) return 'O(n)';
    return 'O(1)';
}

function estimateSpaceC(code, hasOnlyConstantLoops = false) {
    const hasVector = /vector\s*</.test(code);
    const hasMap = /unordered_map|map\s*</.test(code);
    const hasSet = /unordered_set|set\s*</.test(code);
    const hasStack = /stack\s*</.test(code);
    const hasQueue = /queue\s*</.test(code);
    const hasMalloc = /malloc\s*\(|calloc\s*\(|new\s+/.test(code);
    const has2D = /vector\s*<\s*vector/.test(code) || /\w+\s*\[.*\]\s*\[/.test(code);
    const hasFixedArray = /\w+\s*\[\s*\d+\s*\]/.test(code);

    // If all loops are constant-bound, containers populated inside them are O(1)
    if (hasOnlyConstantLoops) return 'O(1)';

    if (has2D) return 'O(n * m)';
    if (hasVector || hasMap || hasSet || hasStack || hasQueue || hasMalloc) return 'O(n)';
    if (hasFixedArray) return 'O(1)';
    if (detectRecursion(code, 'cpp')) return 'O(n)';
    return 'O(1)';
}

// ───────────────────────────────────────────────
//  LOOP DEPTH DETECTION
// ───────────────────────────────────────────────

// Check if a loop bound is a small constant (≤256), common fixed sizes in LeetCode
function isConstantBound(value) {
    const n = parseInt(value, 10);
    return !isNaN(n) && n >= 0 && n <= 256;
}

// Extract variable names from a while condition for two-pointer detection
function extractConditionVars(condition) {
    return [...condition.matchAll(/\b([a-zA-Z_]\w*)\b/g)].map(m => m[1])
        .filter(v => !['while', 'and', 'or', 'not', 'true', 'false', 'True', 'False'].includes(v));
}

function getMaxLoopDepthPython(lines) {
    let maxDepth = 0;
    let loopStack = []; // indent levels of active loops
    let loopVars = [];  // iteration variables at each loop level
    let loopIsConstant = []; // whether each loop level has constant bounds
    let loopConditions = []; // condition text of while loops
    let hasCharIteration = false;
    let hasBucketTraversal = false;
    let hasAmortizedLinear = false;
    let totalLoops = 0;
    let constantLoops = 0;

    for (const line of lines) {
        const stripped = line.trimEnd();
        if (!stripped.trim()) continue;

        const indent = stripped.length - stripped.trimStart().length;
        const trimmed = stripped.trim();

        while (loopStack.length > 0 && indent <= loopStack[loopStack.length - 1]) {
            loopStack.pop();
            loopVars.pop();
            loopIsConstant.pop();
            loopConditions.pop();
        }

        if (/^(for|while)\s+/.test(trimmed) && trimmed.endsWith(':')) {
            totalLoops++;
            let isConstant = false;
            let conditionText = '';

            // Check for constant-bound for loops: "for x in range(CONST):"
            const rangeConstMatch = trimmed.match(/^for\s+\w+\s+in\s+range\((\d+)\)\s*:$/);
            if (rangeConstMatch && isConstantBound(rangeConstMatch[1])) {
                isConstant = true;
            }

            // Check if this inner loop iterates over an outer loop variable
            const forMatch = trimmed.match(/^for\s+\w+\s+in\s+(\w+)\s*:$/);
            const bucketMatch = trimmed.match(/^for\s+\w+\s+in\s+\w+\[(\w+)\]\s*:$/);
            if (forMatch && loopVars.length > 0) {
                const iterTarget = forMatch[1];
                if (loopVars.includes(iterTarget)) {
                    hasCharIteration = true;
                }
            }
            if (bucketMatch && loopVars.length > 0) {
                const indexVar = bucketMatch[1];
                if (loopVars.includes(indexVar)) {
                    hasBucketTraversal = true;
                }
            }

            // Extract while condition for two-pointer detection
            const whileMatch = trimmed.match(/^while\s+(.+)\s*:$/);
            if (whileMatch) {
                conditionText = whileMatch[1];
                // Check for two-pointer: nested while sharing condition vars with outer while
                if (loopConditions.length > 0) {
                    const outerCond = loopConditions[loopConditions.length - 1];
                    if (outerCond) {
                        const outerVars = extractConditionVars(outerCond);
                        const innerVars = extractConditionVars(conditionText);
                        const shared = innerVars.filter(v => outerVars.includes(v));
                        if (shared.length > 0) {
                            hasAmortizedLinear = true;
                        }
                    }
                }
                // Also detect hash set/dict lookup pattern
                if (loopStack.length > 0 && /\bin\b/.test(conditionText)) {
                    hasAmortizedLinear = true;
                }
            }

            if (isConstant) {
                constantLoops++;
                // Don't count constant loops toward depth
                loopStack.push(indent);
                loopVars.push(null);
                loopIsConstant.push(true);
                loopConditions.push(conditionText);
            } else {
                const varMatch = trimmed.match(/^for\s+(\w+)\s+in\s+/);
                loopStack.push(indent);
                loopVars.push(varMatch ? varMatch[1] : null);
                loopIsConstant.push(false);
                loopConditions.push(conditionText);
                // Only count non-constant loops toward depth
                const nonConstDepth = loopIsConstant.filter(c => !c).length;
                maxDepth = Math.max(maxDepth, nonConstDepth);
            }
        }
    }

    const hasOnlyConstantLoops = totalLoops > 0 && constantLoops === totalLoops;
    return { depth: maxDepth, hasCharIteration, hasBucketTraversal, hasAmortizedLinear, hasOnlyConstantLoops };
}

function getMaxLoopDepthC(lines) {
    let maxDepth = 0;
    let currentDepth = 0;
    let braceDepths = []; // brace depth at each loop entry
    let loopVars = [];    // iteration variables at each loop level
    let loopIsConstant = []; // whether each loop level has constant bounds
    let loopConditions = []; // condition text of while loops
    let hasCharIteration = false;
    let hasBucketTraversal = false;
    let hasAmortizedLinear = false;
    let totalLoops = 0;
    let constantLoops = 0;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Count braces
        for (const ch of trimmed) {
            if (ch === '{') currentDepth++;
            if (ch === '}') {
                currentDepth--;
                // Pop loops that ended
                while (braceDepths.length > 0 && currentDepth < braceDepths[braceDepths.length - 1]) {
                    braceDepths.pop();
                    loopVars.pop();
                    loopIsConstant.pop();
                    loopConditions.pop();
                }
            }
        }

        // Detect loop starts
        if (/^\s*(for|while)\s*\(/.test(line)) {
            totalLoops++;
            let isConstant = false;
            let conditionText = '';

            // Check for constant-bound for loops: "for (int i=0; i<9; i++)"
            const forConstMatch = trimmed.match(/for\s*\([^;]*;[^;]*<\s*(\d+)\s*;/);
            if (forConstMatch && isConstantBound(forConstMatch[1])) {
                isConstant = true;
            }

            // Check for range-based for loop iterating over outer variable
            const rangeMatch = trimmed.match(/for\s*\(\s*(?:auto|char|int|const\s+auto)\s*&?\s+\w+\s*:\s*(\w+)\s*\)/);
            if (rangeMatch && loopVars.length > 0) {
                const iterTarget = rangeMatch[1];
                if (loopVars.includes(iterTarget)) {
                    hasCharIteration = true;
                }
            }

            // Extract while condition for two-pointer detection
            const whileMatch = trimmed.match(/while\s*\((.+)\)\s*\{?$/);
            if (whileMatch) {
                conditionText = whileMatch[1];
                // Check for two-pointer: nested while sharing condition vars with outer while
                if (loopConditions.length > 0) {
                    const outerCond = loopConditions[loopConditions.length - 1];
                    if (outerCond) {
                        const outerVars = extractConditionVars(outerCond);
                        const innerVars = extractConditionVars(conditionText);
                        const shared = innerVars.filter(v => outerVars.includes(v));
                        if (shared.length > 0) {
                            hasAmortizedLinear = true;
                        }
                    }
                }
                // Also detect hash set/map lookup pattern
                if (braceDepths.length > 0 && (/\.count\s*\(|\.find\s*\(/.test(conditionText))) {
                    hasAmortizedLinear = true;
                }
            }

            if (isConstant) {
                constantLoops++;
            }

            // Extract loop variable from range-based for
            const varMatch = trimmed.match(/for\s*\(\s*(?:auto|char|int|const\s+auto)\s*&?\s+(\w+)\s*:/);
            braceDepths.push(currentDepth);
            loopVars.push(varMatch ? varMatch[1] : null);
            loopIsConstant.push(isConstant);
            loopConditions.push(conditionText);

            // Only count non-constant loops toward depth
            const nonConstDepth = loopIsConstant.filter(c => !c).length;
            maxDepth = Math.max(maxDepth, nonConstDepth);
        }
    }

    const hasOnlyConstantLoops = totalLoops > 0 && constantLoops === totalLoops;
    return { depth: maxDepth, hasCharIteration, hasBucketTraversal, hasAmortizedLinear, hasOnlyConstantLoops };
}

// ───────────────────────────────────────────────
//  RECURSION DETECTION
// ───────────────────────────────────────────────

function detectRecursion(code, lang) {
    const funcNames = lang === 'python'
        ? [...code.matchAll(/def\s+(\w+)\s*\(/g)].map(m => m[1])
        : [...code.matchAll(/(?:void|int|bool|string|vector|auto|ListNode\*?|TreeNode\*?)\s+(\w+)\s*\(/g)].map(m => m[1]);

    return funcNames.some(name => {
        const body = getFunctionBody(code, name, lang);
        return body && new RegExp(`\\b${name}\\s*\\(`).test(body);
    });
}

function countRecursiveCalls(code, lang) {
    const funcNames = lang === 'python'
        ? [...code.matchAll(/def\s+(\w+)\s*\(/g)].map(m => m[1])
        : [...code.matchAll(/(?:void|int|bool|string|vector|auto)\s+(\w+)\s*\(/g)].map(m => m[1]);

    let maxCalls = 0;
    for (const name of funcNames) {
        const body = getFunctionBody(code, name, lang);
        if (!body) continue;
        const calls = (body.match(new RegExp(`\\b${name}\\s*\\(`, 'g')) || []).length;
        maxCalls = Math.max(maxCalls, calls);
    }
    return maxCalls;
}

function getFunctionBody(code, funcName, lang) {
    if (lang === 'python') return getPythonFunctionBody(code, funcName);
    return getCFunctionBody(code, funcName);
}

function getPythonFunctionBody(code, funcName) {
    const regex = new RegExp(`def\\s+${funcName}\\s*\\([^)]*\\)[^:]*:`);
    const match = regex.exec(code);
    if (!match) return null;

    const startIdx = match.index + match[0].length;
    const lines = code.substring(startIdx).split('\n');
    if (lines.length <= 1) return '';

    let bodyIndent = -1;
    const bodyLines = [];

    for (const line of lines.slice(1)) {
        const stripped = line.trimEnd();
        if (!stripped.trim()) { bodyLines.push(stripped); continue; }
        const indent = stripped.length - stripped.trimStart().length;
        if (bodyIndent === -1) bodyIndent = indent;
        if (indent < bodyIndent && stripped.trim()) break;
        bodyLines.push(stripped);
    }
    return bodyLines.join('\n');
}

function getCFunctionBody(code, funcName) {
    const regex = new RegExp(`\\b${funcName}\\s*\\([^)]*\\)\\s*\\{`);
    const match = regex.exec(code);
    if (!match) return null;

    let depth = 0;
    let start = match.index + match[0].length;
    let i = start;
    depth = 1;

    while (i < code.length && depth > 0) {
        if (code[i] === '{') depth++;
        if (code[i] === '}') depth--;
        i++;
    }
    return code.substring(start, i - 1);
}
