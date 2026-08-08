# 128. Partition Labels

**Difficulty:** `Medium`  
**Acceptance Rate:** `82%`  
**Topics:** `hash-map` `two-pointers` `string` `greedy`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/partition-labels/)

---

## Problem

> You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.
Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
Return a list of integers representing the size of these parts.

**Example 1:**
```
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
```

**Example 2:**
```
Input: s = "eccbbbbdec"
Output: [10]
```

**Constraints:**
- `1 <= s.length <= 500`
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
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        last = {char: i for i, char in enumerate(s)}
        
        res = []
        start = end = 0
        
        for i, char in enumerate(s):
            end = max(end, last[char])
            if i == end:
                res.append(end - start + 1)
                start = i + 1
        
        return res
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
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Medium |
| [Optimal Partition of String](https://leetcode.com/problems/optimal-partition-of-string/) | Medium |
