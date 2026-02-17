# 007. Product of Array Except Self

**Difficulty:** `Medium`  
**Acceptance Rate:** `68.6%`  
**Topics:** `array` `prefix-sum`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-17  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/product-of-array-except-self/)

---

## Problem

> Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

**Example 2:**
```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

**Constraints:**
- `2 <= nums.length <= 105`
- `-30 <= nums[i] <= 30`
- `The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I took the naive approach at first, multiplying all numbers and then storing into a variable and then creating a vector where each element is the total sum divided by the element in the original list corresponding to the same index. However, this did not account for when there was a '0' element present.

I took another approach involving left pass and right pass, basically multiplying all numbers to the left and then to the right excluding itself. 

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Left pass: For each position, store the product of all elements to its left (start with 1)
2. Right pass: For each position, multiply by the product of all elements to its right (traverse backwards)
3. Return: Each position now contains left product × right product = everything except itself

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // initalize every element to 1
        int n = nums.size();
        vector<int> output(n,1);

        int left = 1;
        for (int i = 0; i < n; i++) {
            output[i] = left;
            left *= nums[i];
        }

        int right = 1;
        for (int i = n-1; i>=0; i--) {
            output[i] *= right;
            right *= nums[i];
        }

        return output;
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
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Hard |
| [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | Medium |
| [Paint House II](https://leetcode.com/problems/paint-house-ii/) | Hard |
| [Minimum Difference in Sums After Removal of Elements](https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements/) | Hard |
| [Construct Product Matrix](https://leetcode.com/problems/construct-product-matrix/) | Medium |
| [Find Sum of Array Product of Magical Sequences](https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences/) | Hard |
