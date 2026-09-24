# 1658. Minimum Operations to Reduce X to Zero

**Difficulty:** `Medium`  
**Acceptance Rate:** `45%`  
**Topics:** `array` `hash-map` `binary-search` `sliding-window` `prefix-sum`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/)

---

## Problem

> You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.
Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.

**Example 1:**
```
Input: nums = [1,1,4,2,3], x = 5
Output: 2
Explanation: The optimal solution is to remove the last two elements to reduce x to zero.
```

**Example 2:**
```
Input: nums = [5,6,7,8,9], x = 4
Output: -1
```

**Example 3:**
```
Input: nums = [3,2,20,1,1,3], x = 10
Output: 5
Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.
```

**Constraints:**
- `1 <= nums.length <= 105`
- `1 <= nums[i] <= 104`
- `1 <= x <= 109`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int target = accumulate(nums.begin(), nums.end(), 0) - x;
        if (target < 0) return -1;

        int l = 0, sum = 0, max_len = target == 0 ? 0 : -1;

        for (int r = 0; r<nums.size(); r++) {
            sum += nums[r];

            while (sum>target) {
                sum -= nums[l++];
            }            

            if (sum==target) {
                max_len = max(max_len, r-l+1);
            }
        }
        
        return max_len==-1 ? -1 : nums.size()-max_len;
        
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
| [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Medium |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium |
| [Minimum Operations to Convert Number](https://leetcode.com/problems/minimum-operations-to-convert-number/) | Medium |
| [Removing Minimum Number of Magic Beans](https://leetcode.com/problems/removing-minimum-number-of-magic-beans/) | Medium |
| [Minimum Operations to Make the Integer Zero](https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero/) | Medium |
