# 004. Group Anagrams

**Difficulty:** `Medium`  
**Acceptance Rate:** `72.1%`  
**Topics:** `array` `hash-map` `string` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/group-anagrams/)

---

## Problem

> Given an array of strings strs, group the anagrams together. You can return the answer in any order.

**Example 1:**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Explanation:
```

**Example 2:**
```
Input: strs = [""]
Output: [[""]]
```

**Example 3:**
```
Input: strs = ["a"]
Output: [["a"]]
```

**Constraints:**
- `1 <= strs.length <= 104`
- `0 <= strs[i].length <= 100`
- `strs[i] consists of lowercase English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}
        for s in strs:
            freq = [0] * 26
            for c in s:
                freq[ord(c) - ord('a')] += 1
            key = tuple(freq)
            groups.setdefault(key, []).append(s)
            
        return list(groups.values())
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
| [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Easy |
| [Group Shifted Strings](https://leetcode.com/problems/group-shifted-strings/) | Medium |
| [Find Resultant Array After Removing Anagrams](https://leetcode.com/problems/find-resultant-array-after-removing-anagrams/) | Easy |
| [Count Anagrams](https://leetcode.com/problems/count-anagrams/) | Hard |
