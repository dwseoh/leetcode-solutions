# 017. Longest Repeating Character Replacement

**Difficulty:** `Medium`  
**Acceptance Rate:** `59.1%`  
**Topics:** `hash-map` `string` `sliding-window`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-repeating-character-replacement/)

---

## Problem

> You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
Return the length of the longest substring containing the same letter you can get after performing the above operations.

**Example 1:**
```
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
```

**Example 2:**
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
```

**Constraints:**
- `1 <= s.length <= 105`
- `s consists of only uppercase English letters.`
- `0 <= k <= s.length`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a sliding window problem. I used a hash map to keep track of the frequency of each character in the current window and if the number of replacements needed to make all characters in the window the same exceeded k, I would shrink the window from the left until it was valid again.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize a hash map to keep track of the frequency of each character in the current window
2. Initialize maxLen to 0
3. Initialize maxFreq to 0
4. Initialize left to 0
5. Initialize n to the length of the string
6. Iterate through the string with a right pointer
7. Increment the frequency of the character at the right pointer in the hash map
8. Update maxFreq to the maximum of maxFreq and the frequency of the character at the right pointer
9. Calculate the window size
10. If the window size minus maxFreq is greater than k, shrink the window from the left
11. Update maxLen to the maximum of maxLen and the window size
12. Return maxLen

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        unordered_map<char,int> freq;
        int maxLen = 0;
        int maxFreq = 0;
        int left = 0;
        int n = s.length();

        for (int right = 0; right < n; right++ ) {
            freq[s[right]]++;
            maxFreq = max(maxFreq, freq[s[right]]);

            int windowSize = right-left+1;

            if (windowSize-maxFreq > k ) {
                freq[s[left]]--;
                left++;
            }

            maxLen = max(maxLen, right-left+1);
        }

        return maxLen;

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
| [Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) | Medium |
| [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) | Medium |
| [Minimum Number of Operations to Make Array Continuous](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/) | Hard |
| [Maximize the Confusion of an Exam](https://leetcode.com/problems/maximize-the-confusion-of-an-exam/) | Medium |
| [Longest Substring of One Repeating Character](https://leetcode.com/problems/longest-substring-of-one-repeating-character/) | Hard |
