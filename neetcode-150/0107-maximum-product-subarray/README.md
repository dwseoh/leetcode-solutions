# 107. Maximum Product Subarray

**Difficulty:** `Medium`  
**Acceptance Rate:** `36.6%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-09  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/maximum-product-subarray/)

---

## Problem

> Given an integer array nums, find a subarray that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.
Note that the product of an array with a single element is the value of that element.

**Example 1:**
```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

**Example 2:**
```
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

**Constraints:**
- `1 <= nums.length <= 2 * 104`
- `-10 <= nums[i] <= 10`
- `The product of any subarray of nums is guaranteed to fit in a 32-bit integer.`

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
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int maxEndingHere = nums[0], minEndingHere = nums[0], ans = nums[0];
        for (int i = 1; i < n; i++) {
            int x = nums[i];
            int a = maxEndingHere * x, b = minEndingHere * x;
            maxEndingHere = max({x, a, b});
            minEndingHere = min({x, a, b});
            ans = max(ans, maxEndingHere);
        }
        return ans;
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
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Medium |
| [House Robber](https://leetcode.com/problems/house-robber/) | Medium |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Medium |
| [Maximum Product of Three Numbers](https://leetcode.com/problems/maximum-product-of-three-numbers/) | Easy |
| [Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/) | Medium |
