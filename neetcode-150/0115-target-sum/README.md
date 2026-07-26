# 115. Target Sum

**Difficulty:** `Medium`  
**Acceptance Rate:** `52.6%`  
**Topics:** `array` `dynamic-programming` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-26  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/target-sum/)

---

## Problem

> You are given an integer array nums and an integer target.
You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.
For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

**Example 1:**
```
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

**Example 2:**
```
Input: nums = [1], target = 1
Output: 1
```

**Constraints:**
- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {

        int n = nums.size();
        int totalsum = accumulate(nums.begin(), nums.end(), 0);
        int a = totalsum*2+1; // range is -cursum to cursum 
        vector<vector<int>> memo(n,vector<int> (a,-1));

        function<int(int, int)> dfs= [&](int idx, int cursum) -> int {
            if (idx==n) return cursum==target;
            if (memo[idx][cursum+totalsum] != -1) return memo[idx][cursum+totalsum];
            return memo[idx][cursum+totalsum] = dfs(idx+1,cursum-nums[idx])+dfs(idx+1,cursum+nums[idx]);
        };

        return dfs(0,0);
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
| [Expression Add Operators](https://leetcode.com/problems/expression-add-operators/) | Hard |
| [Ways to Express an Integer as Sum of Powers](https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers/) | Medium |
