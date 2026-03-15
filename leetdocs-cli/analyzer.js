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

    // Library binary search
    const hasBinarySearchLib = lang === 'python'
        ? /bisect/.test(code)
        : /\blower_bound\b|\bupper_bound\b|\bbinary_search\b/.test(code);

    // Manual binary search: midpoint calculation + converging while bounds
    const hasManualBinarySearch = detectManualBinarySearch(code);

    // Fallback: while loop with explicit halving (e.g. n >>= 1, n /= 2)
    const hasWhileHalving = /while\b[\s\S]*?(?:\/=\s*2|>>=\s*1)/.test(code);

    const hasBinarySearch = hasBinarySearchLib || hasManualBinarySearch || hasWhileHalving;

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
    // True if any non-constant for-loop exists (indicates a linear O(n) pass)
    const hasForLoop = loopInfo.hasForLoop;

    const hasRecursion = detectRecursion(code, lang);

    // Binary search:
    // - O(log n) if the only non-constant loops are while-based (the BS itself)
    // - O(n log n) if there are also linear for-loops (e.g. binary search on answer
    //   where each step calls an O(n) helper) or if sorting is also present
    if (hasBinarySearch) {
        if (hasSorting || hasForLoop) {
            // Binary search on value range (e.g. "binary search on answer"):
            // right/hi is set to the max element value, not array size → O(n log m)
            const isBSOnValueRange =
                /\*\s*max_element\s*\(/.test(code) ||
                /right\s*=\s*\*max_element/.test(code) ||
                (/(?:int|long)\s+\w*[Mm]ax\w*\s*=/.test(code) && /right\s*=\s*\w*[Mm]ax\w*\b/.test(code)) ||
                // Python: right = max(piles) or similar
                /(?:right|hi)\s*=\s*max\s*\(/.test(code);
            if (isBSOnValueRange) return 'O(n log m)';
            return 'O(n log n)';
        }
        return 'O(log n)';
    }

    // Sorting dominates
    if (hasSorting) {
        if (maxLoopDepth >= 2) return `O(n^${maxLoopDepth})`;
        return 'O(n log n)';
    }

    // Heap operations
    if (hasHeap) return 'O(n log k)';

    // Recursion analysis
    if (hasRecursion) {
        // Divide and conquer: recursion with halving → O(n log n)
        if (/\/\s*2/.test(code) || />>/.test(code)) return 'O(n log n)';

        const memoType = detectMemoization(code, lang);
        if (memoType === '2d') return 'O(n * m)';
        if (memoType === '1d') return 'O(n)';

        // No memoization: count number of recursive branches
        if (countRecursiveCalls(code, lang) >= 2) return 'O(2^n)';
        return 'O(n)';
    }

    if (maxLoopDepth === 0) return 'O(1)';
    if (maxLoopDepth === 1) return 'O(n)';
    if (maxLoopDepth === 2 && (hasBucketTraversal || hasAmortizedLinear)) return 'O(n)';
    if (maxLoopDepth === 2 && hasCharIteration) return 'O(n * k)';
    if (maxLoopDepth === 2) return 'O(n^2)';
    return `O(n^${maxLoopDepth})`;
}

/**
 * Detect manual binary search: midpoint calculation paired with converging while bounds.
 * Handles: mid = (l+r)/2, mid = l + (r-l)/2, var = var + (var-var)/2, etc.
 */
function detectManualBinarySearch(code) {
    const hasMidpoint =
        // mid = left + (right - left) / 2  or  x = a + (b - a) / 2
        /\w+\s*=\s*\w+\s*\+\s*\(\s*\w+\s*-\s*\w+\s*\)\s*\/\s*2/.test(code) ||
        // mid = (left + right) / 2
        /\b\w+\s*=\s*\(\s*\w+\s*\+\s*\w+\s*\)\s*\/\s*2/.test(code) ||
        // Python: mid = (left + right) // 2
        /\b\w+\s*=\s*\(\s*\w+\s*\+\s*\w+\s*\)\s*\/\/\s*2/.test(code) ||
        // mid = left + (right - left) // 2  (Python)
        /\w+\s*=\s*\w+\s*\+\s*\(\s*\w+\s*-\s*\w+\s*\)\s*\/\/\s*2/.test(code);

    // while (left <= right) or while (left < right) or while lo < hi, etc.
    const hasConvergingWhile =
        /while\s*[\s\S]{0,20}(?:left|lo|l|start)\s*<=?\s*(?:right|hi|r|end)/.test(code) ||
        /while\s*[\s\S]{0,20}(?:left|lo|l|start)\s*<\s*(?:right|hi|r|end)/.test(code);

    return hasMidpoint && hasConvergingWhile;
}

/**
 * Detect memoization type: '2d', '1d', or null.
 * Recognizes cache/memo/dp variable names in addition to decorators.
 */
function detectMemoization(code, lang) {
    if (lang === 'python') {
        // Decorators
        if (/@cache|@lru_cache|@functools\.cache/.test(code)) return '1d';
        // 2D: tuple key cache[(i,j)] or dp[i][j] or dp = [[...]]
        if (/(?:cache|memo|dp)\s*\[\s*\(/.test(code) || /\bdp\s*=\s*\[\s*\[/.test(code)) return '2d';
        // 1D: cache[i], memo[i], dp[i], or empty dict used as cache
        if (/(?:cache|memo|dp)\s*\[/.test(code) ||
            /\b(?:cache|memo|dp)\s*=\s*\{/.test(code)) return '1d';
    } else {
        // C++: dp[i][j] → 2D
        if (/\bdp\s*\[\w+\]\s*\[\w+\]/.test(code)) return '2d';
        // 1D: dp[i], memo map
        if (/\bdp\s*\[\w+\]/.test(code) ||
            /(?:unordered_map|map)\s*<[^>]*>\s*(?:memo|cache|dp)\b/.test(code) ||
            /\bmemo\s*\[/.test(code)) return '1d';
    }
    return null;
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
    // Fixed-size array: [0] * 26  (constant literal multiplier)
    const hasFixedArray = /\[\s*(?:0|1|True|False|None)\s*\]\s*\*\s*\d+/.test(code);
    // DP array: [0] * n  (variable multiplier → O(n))
    const hasDPArray = /\[\s*(?:0|1|True|False|None|float\s*\(|math\.inf|-?inf)\s*\]\s*\*\s*[a-zA-Z_]\w*/.test(code);
    const hasDict = /dict\(|{[^}]*:[^}]*}|\bdefaultdict\b/.test(code) || /\w+\s*=\s*\{\}/.test(code);
    const hasSet = /set\(/.test(code);
    const hasList = /\[\s*\]|\blist\(/.test(code) || /\.append\(/.test(code);
    const hasDeque = /deque\(/.test(code);
    // True 2D: [[0]*m for ...] or nested literal, but NOT [[] for ...] (just list of empty lists)
    const has2D = /\[\s*\[/.test(code) && !/\[\s*\[\s*\]\s*(for|,)/.test(code);

    if (hasOnlyConstantLoops) return 'O(1)';

    if (has2D) return 'O(n * m)';
    if (hasDPArray || hasDict || hasSet || hasList || hasDeque) return 'O(n)';
    if (hasFixedArray) return 'O(1)';
    if (detectRecursion(code, 'python')) {
        const memoType = detectMemoization(code, 'python');
        if (memoType === '2d') return 'O(n * m)';
        return 'O(n)';
    }
    return 'O(1)';
}

function estimateSpaceC(code, hasOnlyConstantLoops = false) {
    const has2D = /vector\s*<\s*vector/.test(code) || /\w+\s*\[.*\]\s*\[/.test(code);
    const hasFixedArray = /\b\w+\s*\[\s*\d+\s*\]/.test(code);

    // char-keyed maps/sets are bounded by alphabet size (≤256) → O(1)
    const hasCharKeyedMap = /(?:unordered_map|map)\s*<\s*char\s*,/.test(code);
    const hasCharKeyedSet = /(?:unordered_set|set)\s*<\s*char\s*>/.test(code);

    // Only count vector as allocated space if it's not a reference/pointer parameter
    // e.g. "vector<int>& piles" is a ref param → no allocation; "vector<int> res" is
    const hasVector = code.split('\n').some(line => {
        if (!/vector\s*</.test(line)) return false;
        // Exclude lines where vector<...> is immediately followed by & or * (ref/ptr param)
        if (/vector\s*<[^;{=\n]*>\s*[&*]/.test(line)) return false;
        return true;
    });
    const hasMap = /unordered_map|map\s*</.test(code);
    const hasSet = /unordered_set|set\s*</.test(code);
    const hasStack = /stack\s*</.test(code);
    const hasQueue = /queue\s*</.test(code);
    const hasMalloc = /malloc\s*\(|calloc\s*\(|new\s+/.test(code);

    if (hasOnlyConstantLoops) return 'O(1)';

    if (has2D) return 'O(n * m)';

    // If all maps/sets are char-keyed (and no unbounded structures), space is O(1)
    const hasOnlyCharBoundedContainers =
        (hasCharKeyedMap || hasCharKeyedSet) &&
        !hasVector && !hasStack && !hasQueue && !hasMalloc &&
        // exclude int/string-keyed maps/sets
        !/(?:unordered_map|map)\s*<\s*(?:int|string|long)/.test(code) &&
        !/(?:unordered_set|set)\s*<\s*(?:int|string|long)/.test(code);

    if (hasOnlyCharBoundedContainers) return 'O(1)';

    if (hasVector || hasMap || hasSet || hasStack || hasQueue || hasMalloc) return 'O(n)';
    if (hasFixedArray) return 'O(1)';
    if (detectRecursion(code, 'cpp')) {
        const memoType = detectMemoization(code, 'cpp');
        if (memoType === '2d') return 'O(n * m)';
        return 'O(n)';
    }
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

// Extract variable names from a condition string
function extractConditionVars(condition) {
    return [...condition.matchAll(/\b([a-zA-Z_]\w*)\b/g)].map(m => m[1])
        .filter(v => !['while', 'and', 'or', 'not', 'true', 'false', 'True', 'False',
                       'empty', 'size', 'length', 'null', 'nullptr'].includes(v));
}

// Extract the condition from a while statement using balanced paren matching
function extractWhileCondition(trimmedLine) {
    const m = trimmedLine.match(/while\s*\(/);
    if (!m) return null;
    let start = m.index + m[0].length;
    let depth = 1;
    let i = start;
    while (i < trimmedLine.length && depth > 0) {
        if (trimmedLine[i] === '(') depth++;
        if (trimmedLine[i] === ')') depth--;
        i++;
    }
    if (depth === 0) return trimmedLine.substring(start, i - 1);
    return null;
}

function getMaxLoopDepthPython(lines) {
    let maxDepth = 0;
    let loopStack = [];    // indent levels of active loops
    let loopVars = [];     // iteration variables at each loop level
    let loopIsConstant = [];// whether each loop level has constant/amortized bounds
    let loopConditions = [];// condition text of while loops
    let hasCharIteration = false;
    let hasBucketTraversal = false;
    let hasAmortizedLinear = false;
    let hasForLoop = false;
    let totalLoops = 0;
    let constantLoops = 0;

    for (const line of lines) {
        const stripped = line.trimEnd();
        if (!stripped.trim()) continue;

        const indent = stripped.length - stripped.trimStart().length;
        const trimmed = stripped.trim();

        // Pop loops whose blocks have ended (indent decreased past loop level)
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

            // Constant for-loop: "for x in range(CONST):"
            const rangeConstMatch = trimmed.match(/^for\s+\w+\s+in\s+range\(\s*(\d+)\s*\)\s*:$/);
            if (rangeConstMatch && isConstantBound(rangeConstMatch[1])) {
                isConstant = true;
            }

            // Check if inner for-loop iterates over an outer loop variable → char iteration
            const forMatch = trimmed.match(/^for\s+\w+\s+in\s+(\w+)\s*:$/);
            const bucketMatch = trimmed.match(/^for\s+\w+\s+in\s+(\w+)\s*\[(\w+)\]\s*:$/);
            if (forMatch && loopVars.length > 0) {
                if (loopVars.includes(forMatch[1])) hasCharIteration = true;
            }
            if (bucketMatch && loopVars.length > 0) {
                // for n in arr[i]: where i is an outer loop variable → bucket traversal
                if (loopVars.includes(bucketMatch[2])) hasBucketTraversal = true;
            }

            // Extract while condition for amortized/two-pointer detection
            const whileMatch = trimmed.match(/^while\s+(.+)\s*:$/);
            let isAmortized = false;
            if (whileMatch) {
                conditionText = whileMatch[1];
                // Two-pointer: inner while shares condition vars with an outer while
                for (let ci = loopConditions.length - 1; ci >= 0; ci--) {
                    const outerCond = loopConditions[ci];
                    if (outerCond) {
                        const shared = extractConditionVars(conditionText)
                            .filter(v => extractConditionVars(outerCond).includes(v));
                        if (shared.length > 0) { hasAmortizedLinear = true; isAmortized = true; break; }
                    }
                }
                // Stack/deque amortized: while with stack ops inside an outer loop
                if (loopStack.length > 0 && /\bstack\b|\bpop\b|\bappend\b|\bpopleft\b|\blen\s*\(/.test(conditionText)) {
                    hasAmortizedLinear = true; isAmortized = true;
                }
                // Sliding window: inner while condition has a "left-pointer" var AND
                // references the outer for-loop's iteration variable (right-pointer).
                // e.g. while left < right and ..., while left <= right
                if (!isAmortized && loopStack.length > 0 &&
                    /\b(?:left|lo|lptr|ptr1|slow)\b/.test(conditionText)) {
                    const innerVars = extractConditionVars(conditionText);
                    const outerForVarInCond = loopVars.filter(v => v && innerVars.includes(v));
                    if (outerForVarInCond.length > 0) {
                        hasAmortizedLinear = true; isAmortized = true;
                    }
                }
            }

            if (isConstant || isAmortized) {
                constantLoops++;
                loopStack.push(indent);
                loopVars.push(null);
                loopIsConstant.push(true);
                loopConditions.push(conditionText);
            } else {
                // Non-constant loop: track var and update max depth
                const varMatch = trimmed.match(/^for\s+(\w+)\s+in\s+/);
                loopStack.push(indent);
                loopVars.push(varMatch ? varMatch[1] : null);
                loopIsConstant.push(false);
                loopConditions.push(conditionText);

                if (/^for\s+/.test(trimmed)) hasForLoop = true;

                const nonConstDepth = loopIsConstant.filter(c => !c).length;
                maxDepth = Math.max(maxDepth, nonConstDepth);
            }
        }
    }

    const hasOnlyConstantLoops = totalLoops > 0 && constantLoops === totalLoops;
    return { depth: maxDepth, hasCharIteration, hasBucketTraversal, hasAmortizedLinear, hasOnlyConstantLoops, hasForLoop };
}

function getMaxLoopDepthC(lines) {
    let maxDepth = 0;
    let currentDepth = 0;
    let braceDepths = [];   // brace depth at each loop entry
    let loopVars = [];      // iteration variables at each loop level
    let loopIsConstant = [];// whether each loop level has constant/amortized bounds
    let loopConditions = [];// condition text of while loops
    let hasCharIteration = false;
    let hasBucketTraversal = false;
    let hasAmortizedLinear = false;
    let hasForLoop = false;
    let totalLoops = 0;
    let constantLoops = 0;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Count braces to track block nesting
        for (const ch of trimmed) {
            if (ch === '{') currentDepth++;
            if (ch === '}') {
                currentDepth--;
                // Pop loops whose blocks have closed
                while (braceDepths.length > 0 && currentDepth < braceDepths[braceDepths.length - 1]) {
                    braceDepths.pop();
                    loopVars.pop();
                    loopIsConstant.pop();
                    loopConditions.pop();
                }
            }
        }

        if (/^\s*(for|while)\s*\(/.test(line)) {
            const isWhileLine = /^\s*while\s*\(/.test(line);

            // Skip single-line while loops (no block body): these are deduplication
            // advances like `while (l < r && nums[l] == nums[l+1]) l++;`
            // They don't add algorithmic nesting depth.
            if (isWhileLine && !line.includes('{')) continue;

            totalLoops++;
            let isConstant = false;
            let conditionText = '';

            // Constant-bound for-loop: for (int i = 0; i < 9; i++)
            const forConstMatch = trimmed.match(/for\s*\([^;]*;\s*\w+\s*<\s*(\d+)\s*;/);
            if (forConstMatch && isConstantBound(forConstMatch[1])) {
                isConstant = true;
            }

            // Range-based for iterating over a simple outer variable → char iteration
            const rangeMatch = trimmed.match(/for\s*\(\s*(?:auto|char|int|const\s+auto)\s*&?\s+(\w+)\s*:\s*(\w+)\s*\)/);
            if (rangeMatch && loopVars.length > 0) {
                if (loopVars.includes(rangeMatch[2])) hasCharIteration = true;
            }

            // Range-based for over indexed container: for (auto x : adj[node]) → bucket traversal
            // Handles adjacency list traversal (total work = O(edges), not O(V*E))
            const indexedRangeMatch = trimmed.match(/for\s*\(\s*(?:auto|char|int|const\s+auto)\s*&?\s+\w+\s*:\s*(\w+)\s*\[\s*(\w+)\s*\]\s*\)/);
            if (indexedRangeMatch && loopVars.length > 0) {
                if (loopVars.includes(indexedRangeMatch[2])) hasBucketTraversal = true;
            }

            // Extract while condition for amortized/two-pointer detection
            const whileCondition = isWhileLine ? extractWhileCondition(trimmed) : null;
            let isAmortized = false;
            if (whileCondition !== null) {
                conditionText = whileCondition;
                const innerVars = extractConditionVars(conditionText);

                // Two-pointer: inner while shares condition vars with outer while
                for (let ci = loopConditions.length - 1; ci >= 0; ci--) {
                    const outerCond = loopConditions[ci];
                    if (outerCond) {
                        const shared = innerVars.filter(v => extractConditionVars(outerCond).includes(v));
                        if (shared.length > 0) { hasAmortizedLinear = true; isAmortized = true; break; }
                    }
                }
                // Hash set/map lookup in while condition (e.g. while (set.count(x)))
                if (braceDepths.length > 0 && /\.count\s*\(|\.find\s*\(/.test(conditionText)) {
                    hasAmortizedLinear = true; isAmortized = true;
                }
                // Monotonic stack/queue: while (.empty() / .top() / .front() / .pop())
                if (braceDepths.length > 0 && /\.empty\s*\(|\.top\s*\(|\.front\s*\(|\.back\s*\(/.test(conditionText)) {
                    hasAmortizedLinear = true; isAmortized = true;
                }
                // Sliding window: inner while has a "left-pointer" var AND condition references
                // the outer for-loop's iteration variable (e.g. while (left < right && ...)).
                // Each element is processed at most twice total → O(n) amortized.
                // Require explicit "left/lo/l"-style naming to avoid false positives
                // on patterns like `while (j < i)` which can be O(n^2).
                if (!isAmortized && braceDepths.length > 0 &&
                    /\b(?:left|lo|lptr|ptr1|slow)\b/.test(conditionText)) {
                    const outerForVarInCond = loopVars.filter(v => v && innerVars.includes(v));
                    if (outerForVarInCond.length > 0) {
                        hasAmortizedLinear = true; isAmortized = true;
                    }
                }
            }

            if (isConstant || isAmortized) {
                constantLoops++;
            }

            // Extract loop variable: try range-based for first, then index-based for
            const rangeVarMatch = trimmed.match(/for\s*\(\s*(?:auto|char|int|const\s+auto)\s*&?\s+(\w+)\s*:/);
            const indexVarMatch = rangeVarMatch ? null
                : trimmed.match(/for\s*\(\s*(?:\w+(?:\s+\w+)?)\s+(\w+)\s*=[^;]+;/);
            const loopVar = rangeVarMatch ? rangeVarMatch[1] : (indexVarMatch ? indexVarMatch[1] : null);

            braceDepths.push(currentDepth);
            loopVars.push(loopVar);
            loopIsConstant.push(isConstant || isAmortized);
            loopConditions.push(conditionText);

            if (!isConstant && !isAmortized) {
                if (/^\s*for\s*\(/.test(line)) hasForLoop = true;
                const nonConstDepth = loopIsConstant.filter(c => !c).length;
                maxDepth = Math.max(maxDepth, nonConstDepth);
            }
        }
    }

    const hasOnlyConstantLoops = totalLoops > 0 && constantLoops === totalLoops;
    return { depth: maxDepth, hasCharIteration, hasBucketTraversal, hasAmortizedLinear, hasOnlyConstantLoops, hasForLoop };
}

// ───────────────────────────────────────────────
//  RECURSION DETECTION
// ───────────────────────────────────────────────

function detectRecursion(code, lang) {
    const funcNames = lang === 'python'
        ? [...code.matchAll(/def\s+(\w+)\s*\(/g)].map(m => m[1])
        : [...code.matchAll(/(?:void|int|bool|string|vector|auto|long|double|ListNode\*?|TreeNode\*?)\s+(\w+)\s*\(/g)].map(m => m[1]);

    return funcNames.some(name => {
        const body = getFunctionBody(code, name, lang);
        return body && new RegExp(`\\b${name}\\s*\\(`).test(body);
    });
}

function countRecursiveCalls(code, lang) {
    const funcNames = lang === 'python'
        ? [...code.matchAll(/def\s+(\w+)\s*\(/g)].map(m => m[1])
        : [...code.matchAll(/(?:void|int|bool|string|vector|auto|long|double)\s+(\w+)\s*\(/g)].map(m => m[1]);

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

    let depth = 1;
    let i = match.index + match[0].length;

    while (i < code.length && depth > 0) {
        if (code[i] === '{') depth++;
        if (code[i] === '}') depth--;
        i++;
    }
    return code.substring(match.index + match[0].length, i - 1);
}
