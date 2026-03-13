# 122. Maximum Subarray

**Difficulty:** `Medium`  
**Acceptance Rate:** `53%`  
**Topics:** `array` `divide-and-conquer` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-09  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/maximum-subarray/)

---

## Problem

> Given an integer array nums, find the subarray with the largest sum, and return its sum.

**Example 1:**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

**Example 2:**
```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

**Example 3:**
```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

**Constraints:**
- `1 <= nums.length <= 105`
- `-104 <= nums[i] <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Greedy algorithm. But I originally thought it was more of a sliding window but then I realized it was much simpler than that and I can solve it in one traversal of the array.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Traverse the list and store current sum 
2. If the current sum is negative, start a new list in that index
3. Return max current sum

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size();
        int cursum = nums[0];
        int maxsum = nums[0];

        for (int i = 1; i < n; i++) {
            if (nums[i] > cursum + nums[i]) {
                cursum = nums[i];
            } else {
                cursum += nums[i];
            }

            if (cursum>maxsum) maxsum = cursum;
        }

        return maxsum;
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
| [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Easy |
| [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | Medium |
| [Degree of an Array](https://leetcode.com/problems/degree-of-an-array/) | Easy |
| [Longest Turbulent Subarray](https://leetcode.com/problems/longest-turbulent-subarray/) | Medium |
| [Maximum Score Of Spliced Array](https://leetcode.com/problems/maximum-score-of-spliced-array/) | Hard |
| [Maximum Absolute Sum of Any Subarray](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) | Medium |
| [Maximum Subarray Sum After One Operation](https://leetcode.com/problems/maximum-subarray-sum-after-one-operation/) | Medium |
| [Substring With Largest Variance](https://leetcode.com/problems/substring-with-largest-variance/) | Hard |
| [Count Subarrays With Score Less Than K](https://leetcode.com/problems/count-subarrays-with-score-less-than-k/) | Hard |
| [Maximum Value of a String in an Array](https://leetcode.com/problems/maximum-value-of-a-string-in-an-array/) | Easy |
| [Find the Substring With Maximum Cost](https://leetcode.com/problems/find-the-substring-with-maximum-cost/) | Medium |
| [K Items With the Maximum Sum](https://leetcode.com/problems/k-items-with-the-maximum-sum/) | Easy |
| [Maximum Good Subarray Sum](https://leetcode.com/problems/maximum-good-subarray-sum/) | Medium |
| [Maximize Subarray Sum After Removing All Occurrences of One Element](https://leetcode.com/problems/maximize-subarray-sum-after-removing-all-occurrences-of-one-element/) | Hard |
