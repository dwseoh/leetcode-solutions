# 006. Palindrome Number

**Difficulty:** `Easy`  
**Acceptance Rate:** `60.4%`  
**Topics:** `math`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/palindrome-number/)

---

## Problem

> Given an integer x, return true if x is a palindrome, and false otherwise.

**Example 1:**
```
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

**Example 2:**
```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

**Example 3:**
```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

**Constraints:**
- `-231 <= x <= 231 - 1`

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
    bool isPalindrome(int x) {
        string s = to_string(x);
        int ptr1 = 0;
        int ptr2 = s.size()-1;

        while (ptr1<ptr2) {
            if (s[ptr1] != s[ptr2]) return false;
            ptr1++;ptr2--;
        }
        return true;
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
| [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) | Easy |
| [Find Palindrome With Fixed Length](https://leetcode.com/problems/find-palindrome-with-fixed-length/) | Medium |
| [Strictly Palindromic Number](https://leetcode.com/problems/strictly-palindromic-number/) | Medium |
| [  Count Symmetric Integers](https://leetcode.com/problems/count-symmetric-integers/) | Easy |
| [Find the Count of Good Integers](https://leetcode.com/problems/find-the-count-of-good-integers/) | Hard |
| [Find the Largest Palindrome Divisible by K](https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k/) | Hard |
