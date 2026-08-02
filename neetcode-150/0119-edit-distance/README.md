# 119. Edit Distance

**Difficulty:** `Medium`  
**Acceptance Rate:** `61%`  
**Topics:** `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/edit-distance/)

---

## Problem

> Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
You have the following three operations permitted on a word:
Insert a character
	Delete a character
	Replace a character

**Example 1:**
```
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

**Example 2:**
```
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

**Constraints:**
- `0 <= word1.length, word2.length <= 500`
- `word1 and word2 consist of lowercase English letters.`

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
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,-1));

        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (i == m) return n - j; // insert remaining chars
            if (j == n) return m - i; // delete remaining chars
            if (dp[i][j] != -1) return dp[i][j];

            int res;
            if (word1[i] == word2[j]) {
                res = dfs(i+1, j+1);
            } else {
                res = 1 + min({dfs(i+1, j),   // delete
                                dfs(i, j+1),   // insert
                                dfs(i+1, j+1)}); // replace
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
| [One Edit Distance](https://leetcode.com/problems/one-edit-distance/) | Medium |
| [Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/) | Medium |
| [Minimum ASCII Delete Sum for Two Strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) | Medium |
| [Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/) | Medium |
| [Minimum White Tiles After Covering With Carpets](https://leetcode.com/problems/minimum-white-tiles-after-covering-with-carpets/) | Hard |
| [Longest Palindrome After Substring Concatenation II](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii/) | Hard |
| [Minimum Steps to Convert String with Operations](https://leetcode.com/problems/minimum-steps-to-convert-string-with-operations/) | Hard |
