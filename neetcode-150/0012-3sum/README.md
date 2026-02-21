# 012. 3Sum

**Difficulty:** `Medium`  
**Acceptance Rate:** `38.6%`  
**Topics:** `array` `two-pointers` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-21  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/3sum/)

---

## Problem

> Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
Notice that the solution set must not contain duplicate triplets.

**Example 1:**
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```

**Example 2:**
```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

**Example 3:**
```
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

**Constraints:**
- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Two pointer question with a pointer that iterates through the array. However, the list is not sorted, so we need to sort it first.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Sort the array
2. Iterate through the array with a pointer `ptr1`
3. For each `ptr1`, use two pointers `ptr2` and `ptr3` to find the other two numbers
4. If `nums[ptr1] + nums[ptr2] + nums[ptr3] == 0`, add the triplet to the output
5. If `nums[ptr1] + nums[ptr2] + nums[ptr3] < 0`, increment `ptr2`
6. If `nums[ptr1] + nums[ptr2] + nums[ptr3] > 0`, decrement `ptr3`
7. Skip duplicate values for `ptr1`, `ptr2`, and `ptr3`

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int ptr1 = 0;
        int ptr2; int ptr3;
        int curr;

        sort(nums.begin(), nums.end());

        vector<vector<int>> output;

        while (ptr1 < nums.size()-2) {
            ptr2 = ptr1+1;
            ptr3 = nums.size()-1;
            curr = -1;

            while (ptr2<ptr3) {
                if (nums[ptr1] + nums[ptr2] + nums[ptr3] == 0) {
                    output.push_back({nums[ptr1],nums[ptr2],nums[ptr3]});
                    while (ptr2 < ptr3 && nums[ptr2] == nums[ptr2+1]) ptr2++;
                    while (ptr2 < ptr3 && nums[ptr3] == nums[ptr3-1]) ptr3--;
                    ptr2++; ptr3--;
                }
                else if (nums[ptr2] + nums[ptr3] < -nums[ptr1]) {
                    ptr2++;
                } else {
                    ptr3--;
                }
            }

            while (ptr1 < nums.size()-2 && nums[ptr1] == nums[ptr1+1]) ptr1++;
            ptr1++;
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
| [Two Sum](https://leetcode.com/problems/two-sum/) | Easy |
| [3Sum Closest](https://leetcode.com/problems/3sum-closest/) | Medium |
| [4Sum](https://leetcode.com/problems/4sum/) | Medium |
| [3Sum Smaller](https://leetcode.com/problems/3sum-smaller/) | Medium |
| [Number of Arithmetic Triplets](https://leetcode.com/problems/number-of-arithmetic-triplets/) | Easy |
| [Minimum Sum of Mountain Triplets I](https://leetcode.com/problems/minimum-sum-of-mountain-triplets-i/) | Easy |
| [Minimum Sum of Mountain Triplets II](https://leetcode.com/problems/minimum-sum-of-mountain-triplets-ii/) | Medium |
