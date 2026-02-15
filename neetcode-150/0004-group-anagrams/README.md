# 004. Group Anagrams

**Difficulty:** `Medium`  
**Acceptance Rate:** `72.1%`  
**Topics:** `array` `hash-map` `string` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-15  
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
At first, I was going to iterate through the list to convert each string into a hash map and compare it with every other string in the list to see if they were anagrams. However, this would be inefficient as it would require nested loops, resulting in a time complexity of O(n^2 * k), where n is the number of strings and k is the length of each string. 

Then I realized there is a much more simple approach. We can use a hash map to store the anagrams together. The key of the hash map will be the sorted version of the string, and the value will be the list of anagrams. 

"eat" → freq → key (1,0,0,0,1,0,...,1,...) → groups[key] = ["eat"]  
"tea" → same freq → same key            → groups[key] = ["eat", "tea"]  
"ate" → same freq → same key            → groups[key] = ["eat", "tea", "ate"]  
"tan" → different freq                  → groups[new_key] = ["tan"]  

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize an empty hash map `groups` to store the anagrams.
2. Iterate through each string `s` in the input list `strs`.
3. For each string `s`, create a frequency array `freq` of size 26 to store the frequency of each character.
4. Iterate through each character `c` in the string `s` and increment the frequency of the corresponding character in the `freq` array.
5. Convert the `freq` array into a tuple `key` to make it hashable.
6. Use `groups.setdefault(key, [])` to get the list of anagrams for the current key. If the key does not exist, create a new empty list for it.
7. Append the current string `s` to the list of anagrams for the current key.
8. After iterating through all the strings, return the values of the `groups` hash map as a list.

**Time Complexity:** `O(n * k)`  
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
