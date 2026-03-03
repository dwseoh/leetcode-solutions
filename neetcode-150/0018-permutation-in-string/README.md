# 018. Permutation in String

**Difficulty:** `Medium`  
**Acceptance Rate:** `48.5%`  
**Topics:** `hash-map` `two-pointers` `string` `sliding-window`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/permutation-in-string/)

---

## Problem

> Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
In other words, return true if one of s1's permutations is the substring of s2.

**Example 1:**
```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

**Example 2:**
```
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

**Constraints:**
- `1 <= s1.length, s2.length <= 104`
- `s1 and s2 consist of lowercase English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a hash map + sliding window problem.
Originally I got O(n+m) time complexity by recomparing the hash maps every time I slide the window.
But i reiterated that we can optimize this by keeping track of the number of matches between the two hash maps which gave O(n) time complexity.
I also avoided hash map overhead by using a fixed size array of 26 to store the frequencies of each character.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize two arrays of size 26 to store the frequencies of each character in s1 and the current window of s2.
2. Initialize a variable `match` to 0 to keep track of the number of matches between the two arrays.
3. Iterate through the string s2 with a sliding window of size equal to the length of s1.
4. For each window, update the frequency of the characters in the current window and the `match` variable.
5. If the `match` variable is equal to 26, return true.
6. If the loop finishes without finding a match, return false.

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int freq[26] = {0};
        int cur[26] = {0};

        int window_len = s1.length();
        int n = s2.length();

        if (window_len>n) {
            return false;
        }

        for (char c: s1) {
            freq[c-'a'] ++;
        }

        for (int j=0;j<window_len;j++) {
            cur[s2[j]-'a'] ++;
        }
        
        int match = 0;
        for (int j=0;j<26;j++) {
            if (freq[j]==cur[j]) {
                match++;
            } 
        }

        if (match==26) return true;
        
        for (int i=window_len;i<n;i++) {
            
            // incoming char:
            int idx = s2[i] - 'a';
            if (cur[idx] == freq[idx]) match--;  
            cur[idx]++;
            if (cur[idx] == freq[idx]) match++; 

            // outgoing char:
            idx = s2[i - window_len] - 'a';
            if (cur[idx] == freq[idx]) match--;  
            cur[idx]--;
            if (cur[idx] == freq[idx]) match++;  

            if (match==26) return true;

        }

        return false;


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
| [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | Hard |
| [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Medium |
