# 121. Regular Expression Matching

**Difficulty:** `Hard`  
**Acceptance Rate:** `31.5%`  
**Topics:** `string` `dynamic-programming` `recursion`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/regular-expression-matching/)

---

## Problem

> Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
'.' Matches any single character.​​​​
	'*' Matches zero or more of the preceding element.
Return a boolean indicating whether the matching covers the entire input string (not partial).

**Example 1:**
```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

**Example 2:**
```
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

**Example 3:**
```
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

**Constraints:**
- `1 <= s.length <= 20`
- `1 <= p.length <= 20`
- `s contains only lowercase English letters.`
- `p contains only lowercase English letters, '.', and '*'.`
- `It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,-1));
        
        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (j==n) return i==m;
            if (dp[i][j] != -1) return dp[i][j];

            bool firstMatch = (i < m) && (p[j] == '.' || p[j] == s[i]);
            int res = 0;

            // when we consume the "*", we DONT advance the j marker
            // so in next i index we have the choice to skip again (consume another ) or end (advance *)
            if (j+1<n && p[j+1] == '*') {
                return dfs(i,j+2) || firstMatch && dfs(i+1,j);
                // try matching (skip *) OR advance to next i by consuming the same "preceding element" again
            } else {
                return firstMatch && dfs(i+1,j+1);
            }

            return dp[i][j] = res;

        };

        return dfs(0,0);
    }
};
```
---

## Alternative Approaches

### Approach 2: [Name]
<!-- Briefly describe trade-offs vs your main approach -->

```cpp


```

**Time:** `O()` | **Space:** `O()`

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


---

## Related Problems

| Title | Difficulty |
|-------|------------|
| [Wildcard Matching](https://leetcode.com/problems/wildcard-matching/) | Hard |
