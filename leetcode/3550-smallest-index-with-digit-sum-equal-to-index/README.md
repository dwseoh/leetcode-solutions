# 3550. Smallest Index With Digit Sum Equal to Index

**Difficulty:** `Easy`  
**Acceptance Rate:** `84%`  
**Topics:** `array` `math`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/)

---

## Problem

> You are given an integer array nums.
Return the smallest index i such that the sum of the digits of nums[i] is equal to i.
If no such index exists, return -1.

**Example 1:**
```
Input: nums = [1,3,2]
Output: 2
Explanation:
```

**Example 2:**
```
Input: nums = [1,10,11]
Output: 1
Explanation:
```

**Example 3:**
```
Input: nums = [1,2,3]
Output: -1
Explanation:
```

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

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

```python
class Solution:
    def smallestIndex(self, nums: List[int]) -> int:
        for idx, num in enumerate(nums):
            dig_sum =  sum(int(dig) for dig in str(num))
            if dig_sum == idx: 
                return idx
        return -1
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
