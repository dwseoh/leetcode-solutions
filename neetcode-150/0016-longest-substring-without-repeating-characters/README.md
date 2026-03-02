# 016. Longest Substring Without Repeating Characters

**Difficulty:** `Medium`  
**Acceptance Rate:** `38.5%`  
**Topics:** `hash-map` `string` `sliding-window`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

---

## Problem

> Given a string s, find the length of the longest substring without duplicate characters.

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**
```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Constraints:**
- `0 <= s.length <= 5 * 104`
- `s consists of English letters, digits, symbols and spaces.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a sliding window problem. I used a set to keep track of the characters in the current window and if I encountered a duplicate, I would shrink the window from the left until the duplicate was removed.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize ptr1 to 0 and ptr2 to 0
2. Initialize maxL to 0
3. Initialize a set to keep track of the characters in the current window
4. While ptr2 is less than the length of the string
5. If the character at ptr2 is in the set, remove the character at ptr1 from the set and increment ptr1
6. Else, add the character at ptr2 to the set and increment ptr2
7. Update maxL to the maximum of maxL and ptr2 - ptr1
8. Return maxL

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int ptr1 = 0;
        int ptr2 = 0;
        int n = s.length();
        int maxL = 0;

        unordered_set<int> used;

        while (ptr2<n) {
            
            if (used.count(s[ptr2]) > 0) {
                used.erase(s[ptr1]);
                ptr1+=1;
        

            } else {
                used.insert(s[ptr2]);
                ptr2++;
            }

            maxL = max(maxL,ptr2-ptr1);
            
        }

  

        return maxL;

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
| [Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/) | Medium |
| [Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | Medium |
| [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/) | Hard |
| [Maximum Erasure Value](https://leetcode.com/problems/maximum-erasure-value/) | Medium |
| [Number of Equal Count Substrings](https://leetcode.com/problems/number-of-equal-count-substrings/) | Medium |
| [Minimum Consecutive Cards to Pick Up](https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/) | Medium |
| [Longest Nice Subarray](https://leetcode.com/problems/longest-nice-subarray/) | Medium |
| [Optimal Partition of String](https://leetcode.com/problems/optimal-partition-of-string/) | Medium |
| [Count Complete Subarrays in an Array](https://leetcode.com/problems/count-complete-subarrays-in-an-array/) | Medium |
| [Find Longest Special Substring That Occurs Thrice II](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-ii/) | Medium |
| [Find Longest Special Substring That Occurs Thrice I](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i/) | Medium |
