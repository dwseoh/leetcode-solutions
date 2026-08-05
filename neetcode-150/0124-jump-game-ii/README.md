# 124. Jump Game II

**Difficulty:** `Medium`  
**Acceptance Rate:** `43.3%`  
**Topics:** `array` `dynamic-programming` `greedy`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-05  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/jump-game-ii/)

---

## Problem

> You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.
Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:
0 <= j <= nums[i] and
	i + j < n
Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.

**Example 1:**
```
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**
```
Input: nums = [2,3,0,1,4]
Output: 2
```

**Constraints:**
- `1 <= nums.length <= 104`
- `0 <= nums[i] <= 1000`
- `It's guaranteed that you can reach nums[n - 1].`

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
    int jump(vector<int>& nums) {
        int jumps = 0, currentEnd = 0, farthest = 0;
        
        for (int i = 0; i<nums.size()-1; i++) {
            farthest = max(farthest,i+nums[i]);

            if (i==currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }

        return jumps;
        
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
| [Jump Game](https://leetcode.com/problems/jump-game/) | Medium |
| [Jump Game III](https://leetcode.com/problems/jump-game-iii/) | Medium |
| [Jump Game VII](https://leetcode.com/problems/jump-game-vii/) | Medium |
| [Jump Game VIII](https://leetcode.com/problems/jump-game-viii/) | Medium |
| [Minimum Number of Visited Cells in a Grid](https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid/) | Hard |
| [Maximum Number of Jumps to Reach the Last Index](https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index/) | Medium |
| [Visit Array Positions to Maximize Score](https://leetcode.com/problems/visit-array-positions-to-maximize-score/) | Medium |
