# 123. Jump Game

**Difficulty:** `Medium`  
**Acceptance Rate:** `40.5%`  
**Topics:** `array` `dynamic-programming` `greedy`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-10  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/jump-game/)

---

## Problem

> You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
Return true if you can reach the last index, or false otherwise.

**Example 1:**
```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**
```
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
```

**Constraints:**
- `1 <= nums.length <= 104`
- `0 <= nums[i] <= 105`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Greedy algorithm. Always try to jump to the position that can reach the furthest.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Traverse the array from left to right.
2. Keep track of the maximum reach from the current position.
3. If the maximum reach is greater than or equal to the last index, return true.
4. If the maximum reach is less than the current index, return false.

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
  bool canJump(vector<int> &nums) {
    int i = 0;
    int n = nums.size();

    while (i != n - 1) {
      if (nums[i] == 0)
        return false;

      int bestReach = i;
      int bestK = i;

      for (int k = i + 1; k <= i + nums[i] && k < n; k++) {
        if (k + nums[k] > bestReach) {
          bestReach = k + nums[k];
          bestK = k;
        }
      }

      if (bestK == i)
        return false; // couldn't advance
      if (bestReach >= n - 1)
        return true;
      i = bestK;
    }

    return true;
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
| [Jump Game II](https://leetcode.com/problems/jump-game-ii/) | Medium |
| [Jump Game III](https://leetcode.com/problems/jump-game-iii/) | Medium |
| [Jump Game VII](https://leetcode.com/problems/jump-game-vii/) | Medium |
| [Jump Game VIII](https://leetcode.com/problems/jump-game-viii/) | Medium |
| [Minimum Number of Visited Cells in a Grid](https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid/) | Hard |
| [Largest Element in an Array after Merge Operations](https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations/) | Medium |
