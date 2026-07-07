# 104. Palindromic Substrings

**Difficulty:** `Medium`  
**Acceptance Rate:** `73%`  
**Topics:** `two-pointers` `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-07  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/palindromic-substrings/)

---

## Problem

> Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.

**Example 1:**
```
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
```

**Example 2:**
```
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
```

**Constraints:**
- `1 <= s.length <= 1000`
- `s consists of lowercase English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int res = 0;
        int n = s.size();

        auto expand = [&](int l, int r) -> int {
            int cnt = 0;
            while (l>=0 && r<n && s[l] == s[r]) {
                l--; r++; cnt++;
            }
            return cnt; 
        };

        for (int i=0;i<n;i++) {
            res += expand(i,i);
            res += expand(i,i+1);
        }

        return res;
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
| [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | Medium |
| [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) | Medium |
