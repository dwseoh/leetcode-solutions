# 118. Distinct Subsequences

**Difficulty:** `Hard`  
**Acceptance Rate:** `52.3%`  
**Topics:** `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-31  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/distinct-subsequences/)

---

## Problem

> Given two strings s and t, return the number of distinct subsequences of s which equals t.
The test cases are generated so that the answer fits on a 32-bit signed integer.

**Example 1:**
```
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
```

**Example 2:**
```
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
```

**Constraints:**
- `1 <= s.length, t.length <= 1000`
- `s and t consist of English letters.`

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
    int numDistinct(string s, string t) {
        // dp[m][n] - using up 0...m chars and 0...n chars how many matches do we have?
        int m = s.size(), n = t.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,-1)); // do we need to index it as 0 

        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (j==n) return 1; // reached end of matching word (j) so it is a match 
            if (i==m) return 0; // ran out of characters
            if (dp[i][j] != -1) return dp[i][j];
            
            int res = 0;
            res += dfs(i+1,j); // when we skip the current char
            if (s[i] == t[j])
            res+= dfs(i+1,j+1); // if its a match 

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
| [Number of Unique Good Subsequences](https://leetcode.com/problems/number-of-unique-good-subsequences/) | Hard |
