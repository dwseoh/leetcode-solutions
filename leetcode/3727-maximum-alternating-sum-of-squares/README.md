# 3727. Maximum Alternating Sum of Squares

**Difficulty:** `Medium`  
**Acceptance Rate:** `74.2%`  
**Topics:** `array` `greedy` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-10-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/maximum-alternating-sum-of-squares/)

---

## Problem

> You are given an integer array nums. You may rearrange the elements in any order.
The alternating score of an array arr is defined as:
score = arr[0]2 - arr[1]2 + arr[2]2 - arr[3]2 + ...
Return an integer denoting the maximum possible alternating score of nums after rearranging its elements.

**Example 1:**
```
Input: nums = [1,2,3]
Output: 12
Explanation:
A possible rearrangement for nums is [2,1,3], which gives the maximum alternating score among all possible rearrangements.
The alternating score is calculated as:
score = 22 - 12 + 32 = 4 - 1 + 9 = 12
```

**Example 2:**
```
Input: nums = [1,-1,2,-2,3,-3]
Output: 16
Explanation:
A possible rearrangement for nums is [-3,-1,-2,1,3,2], which gives the maximum alternating score among all possible rearrangements.
The alternating score is calculated as:
score = (-3)2 - (-1)2 + (-2)2 - (1)2 + (3)2 - (2)2 = 9 - 1 + 4 - 1 + 9 - 4 = 16
```

**Constraints:**
- `1 <= nums.length <= 105`
- `-4 * 104 <= nums[i] <= 4 * 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(1)`

---

## Solution

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        nums[:] = [x ** 2 for x in nums]
        nums.sort()
        n = len(nums)
        return -sum(nums[: n // 2]) + sum(nums[n // 2 :])
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
