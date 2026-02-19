# 010. Valid Palindrome

**Difficulty:** `Easy`  
**Acceptance Rate:** `52.8%`  
**Topics:** `two-pointers` `string`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/valid-palindrome/)

---

## Problem

> A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**
```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

**Constraints:**
- `1 <= s.length <= 2 * 105`
- `s consists only of printable ASCII characters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a two-pointer problem.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize two pointers, one at the start and one at the end
2. Skip non-alphanumeric characters from the left
3. Skip non-alphanumeric characters from the right
4. Compare the characters at the two pointers
5. If they are not equal, return false
6. If they are equal, move the pointers inward
7. If the pointers cross, return true

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int ptr1 = 0;
        int ptr2 = s.size() - 1;

        while (ptr1 < ptr2) {
            // skip non-alphanumeric from left
            while (ptr1 < ptr2 && !((s[ptr1] >= 'a' && s[ptr1] <= 'z') || (s[ptr1] >= 'A' && s[ptr1] <= 'Z') || (s[ptr1] >= '0' && s[ptr1] <= '9'))) {
                ptr1++;
            }

            // skip non-alphanumeric from right
            while (ptr1 < ptr2 && !((s[ptr2] >= 'a' && s[ptr2] <= 'z') || (s[ptr2] >= 'A' && s[ptr2] <= 'Z') || (s[ptr2] >= '0' && s[ptr2] <= '9'))) {
                ptr2--;
            }

            // lowercase conversion
            char s1 = s[ptr1];
            char s2 = s[ptr2];
            if (s1 >= 'A' && s1 <= 'Z') s1 = s1 - 'A' + 'a';
            if (s2 >= 'A' && s2 <= 'Z') s2 = s2 - 'A' + 'a';

            if (s1 != s2) return false;
            ptr1++; ptr2--;
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
| [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) | Easy |
| [Maximum Product of the Length of Two Palindromic Subsequences](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences/) | Medium |
| [Find First Palindromic String in the Array](https://leetcode.com/problems/find-first-palindromic-string-in-the-array/) | Easy |
| [Valid Palindrome IV](https://leetcode.com/problems/valid-palindrome-iv/) | Medium |
| [Maximum Palindromes After Operations](https://leetcode.com/problems/maximum-palindromes-after-operations/) | Medium |
