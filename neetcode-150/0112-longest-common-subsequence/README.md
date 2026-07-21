# 112. Longest Common Subsequence

**Difficulty:** `Medium`  
**Acceptance Rate:** `59.4%`  
**Topics:** `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-21  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-common-subsequence/)

---

## Problem

> Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

**Example 1:**
```
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
```

**Example 2:**
```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

**Example 3:**
```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

**Constraints:**
- `1 <= text1.length, text2.length <= 1000`
- `text1 and text2 consist of only lowercase English characters.`

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
    int longestCommonSubsequence(string text1, string text2) {

        vector<vector<int>> memo(text1.size(),vector<int> (text2.size(),-1));

        function<int(int,int)> recurse = [&](int i, int j) -> int {
            if (i >= text1.size() || j >= text2.size()) return 0;
            if (memo[i][j] != -1) return memo[i][j];

            if (text1[i] == text2[j]) {
                return memo[i][j]=1+recurse(i+1,j+1);
            } 
            
            return memo[i][j]=max(recurse(i+1,j),recurse(i,j+1));
        };

        return recurse(0,0);
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
| [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) | Medium |
| [Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/) | Medium |
| [Shortest Common Supersequence ](https://leetcode.com/problems/shortest-common-supersequence/) | Hard |
| [Maximize Number of Subsequences in a String](https://leetcode.com/problems/maximize-number-of-subsequences-in-a-string/) | Medium |
| [Subsequence With the Minimum Score](https://leetcode.com/problems/subsequence-with-the-minimum-score/) | Hard |
