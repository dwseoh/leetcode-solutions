# 144. Single Number

**Difficulty:** `Easy`  
**Acceptance Rate:** `77.8%`  
**Topics:** `array` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-23  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/single-number/)

---

## Problem

> Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**
```
Input: nums = [2,2,1]
Output: 1
```

**Example 2:**
```
Input: nums = [4,1,2,1,2]
Output: 4
```

**Example 3:**
```
Input: nums = [1]
Output: 1
```

**Constraints:**
- `1 <= nums.length <= 3 * 104`
- `-3 * 104 <= nums[i] <= 3 * 104`
- `Each element in the array appears twice except for one element which appears only once.`

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

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res{};
        for (const auto& num: nums) {
            res = res^num;
        }
        return res;
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
| [Single Number II](https://leetcode.com/problems/single-number-ii/) | Medium |
| [Single Number III](https://leetcode.com/problems/single-number-iii/) | Medium |
| [Missing Number](https://leetcode.com/problems/missing-number/) | Easy |
| [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) | Medium |
| [Find the Difference](https://leetcode.com/problems/find-the-difference/) | Easy |
| [Find the XOR of Numbers Which Appear Twice](https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice/) | Easy |
