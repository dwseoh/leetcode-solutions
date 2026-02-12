# 002. Valid Anagram

**Difficulty:** `Easy`  
**Acceptance Rate:** `67.7%`  
**Topics:** `hash-map` `string` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/valid-anagram/)

---

## Problem

> Given two strings s and t, return true if t is an anagram of s, and false otherwise.

**Example 1:**
```
Input: s = "anagram", t = "nagaram"
Output: true
```

**Example 2:**
```
Input: s = "rat", t = "car"
Output: false
```

**Constraints:**
- `1 <= s.length, t.length <= 5 * 104`
- `s and t consist of lowercase English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Use a hash map to store freq & compare
Sorting could work but O(n log n)

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize a hash map
2. Iterate through s and increment the count of each character
3. Iterate through t and decrement the count of each character
4. If the count of any character is not 0, return false
5. Return true

OPTIMIZATION: use for loop 26 with one frequency list and increment/decrement in the same loop

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```python
class Solution:

    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        arr = [0] * 26

        for i in range(len(s)):
            arr[ord(s[i]) - ord('a')] += 1
            arr[ord(t[i]) - ord('a')] -= 1

        for check in arr:
            if check != 0:
                return False
        return True
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
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Medium |
| [Palindrome Permutation](https://leetcode.com/problems/palindrome-permutation/) | Easy |
| [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Medium |
| [Find Resultant Array After Removing Anagrams](https://leetcode.com/problems/find-resultant-array-after-removing-anagrams/) | Easy |
