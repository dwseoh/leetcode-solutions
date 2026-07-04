# 103. Longest Palindromic Substring

**Difficulty:** `Medium`  
**Acceptance Rate:** `38.1%`  
**Topics:** `two-pointers` `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-04  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-palindromic-substring/)

---

## Problem

> Given a string s, return the longest palindromic substring in s.

**Example 1:**
```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

**Example 2:**
```
Input: s = "cbbd"
Output: "bb"
```

**Constraints:**
- `1 <= s.length <= 1000`
- `s consist of only digits and English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^3)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    string longestPalindrome_dp(string s) {
        int n = s.size();
        // let dp[i][j] be true if the substring s[i..j] is a palindrome.
        // dp[i][j] = (s[i] == s[j]) && (j - i < 2 || dp[i+1][j-1])
        vector<vector<bool>> dp(n,vector<bool>(n,false));
        int start = 0, maxLen = 1;

        // 
        for (int i = 0; i<n; i++) dp[i][i] = true;

        // len is the substring length we're currently filling in
        for (int len = 2; len<=n; len++) {
            for (int i = 0; i+len-1 < n; i++) { // i = left bound
                int j = i+len-1; // j = right bound 
                if (s[i] == s[j] && (len==2 || dp[i+1][j-1])) {
                    // we're checking inward bound i+1,j-1 because those are prereq
                    // in order for the next outer one to be considered
                    dp[i][j] = true;
                    if (len > maxLen) {
                        maxLen = len;
                        start = i;
                    }
                }
            }
        }

        return s.substr(start,maxLen);
    }
    // dp[i][j] depends on dp[i+1][j-1]


    string longestPalindrome(string s) {
        // 2 pointer appraoch, o(n^2) time complex, o(1) space complex
        int maxLen = 0;
        int n = s.size();
        int start = 0;

        auto expand = [&](int l, int r) {
            while (r<n && l>=0 && s[l] == s[r]) {
                if (r-l+1>maxLen) {
                    maxLen = r-l+1;
                    start = l;
                }
                l--; r++;
            }
        }; // could refactor so move l,r pointers first then check if max
        // since useless to compute while moving l,r pointers 

        for (int i = 0; i<n; i++) {
            expand(i, i); // odd length
            expand(i,i+1);  // even length
        }

        return s.substr(start,maxLen);
    }
};

// also possible through Manacher's algorithm
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
| [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/) | Hard |
| [Palindrome Permutation](https://leetcode.com/problems/palindrome-permutation/) | Easy |
| [Palindrome Pairs](https://leetcode.com/problems/palindrome-pairs/) | Hard |
| [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) | Medium |
| [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) | Medium |
| [Maximum Number of Non-overlapping Palindrome Substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/) | Hard |
