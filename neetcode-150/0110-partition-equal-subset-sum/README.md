# 110. Partition Equal Subset Sum

**Difficulty:** `Medium`  
**Acceptance Rate:** `49.7%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/partition-equal-subset-sum/)

---

## Problem

> Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

**Example 1:**
```
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

**Example 2:**
```
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^3)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int target_sum = 0;
        for (const int num: nums) target_sum += num;
        if (target_sum%2) return false; // no partition possible
        target_sum /= 2; // we only care if we can find the target 
        vector<bool> dp(target_sum+1,false);
        dp[0] = true; 

        // 2d would be dp[i][j] = "using only the first i numbers, can I make sum j?"


        for (const int num: nums) { // now that num is given, what new sums are reachable? 
            for (int j = target_sum; j>=num; j--) {
                dp[j] = dp[j] || dp[j - num]; // ORing to see if its possible to make num by using the current num
            } // counting down
        }

        return dp[target_sum];

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
| [Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | Medium |
| [Minimize the Difference Between Target and Chosen Elements](https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements/) | Medium |
| [Maximum Number of Ways to Partition an Array](https://leetcode.com/problems/maximum-number-of-ways-to-partition-an-array/) | Hard |
| [Partition Array Into Two Arrays to Minimize Sum Difference](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/) | Hard |
| [Find Subarrays With Equal Sum](https://leetcode.com/problems/find-subarrays-with-equal-sum/) | Easy |
| [Number of Great Partitions](https://leetcode.com/problems/number-of-great-partitions/) | Hard |
| [Split With Minimum Sum](https://leetcode.com/problems/split-with-minimum-sum/) | Easy |
