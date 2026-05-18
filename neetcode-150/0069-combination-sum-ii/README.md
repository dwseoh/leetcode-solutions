# 069. Combination Sum II

**Difficulty:** `Medium`  
**Acceptance Rate:** `59.4%`  
**Topics:** `array` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-18  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/combination-sum-ii/)

---

## Problem

> Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
Each number in candidates may only be used once in the combination.
Note: The solution set must not contain duplicate combinations.

**Example 1:**
```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**Example 2:**
```
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
```

**Constraints:**
- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n * (2^n))`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:

    vector<vector<int>> res;

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<int> cur;
        sort(candidates.begin(), candidates.end());
        dfs(candidates,cur,target,0,0);
        return res;   
    }

    void dfs(vector<int>& nums, vector<int>& cur, int target, int cursum, int idx) {
        if (cursum==target) {
            res.push_back(cur);
            return;
        }

        if (cursum>target) return;

        for (int i = idx; i < nums.size(); i++) {
            if (i > idx && nums[i] == nums[i-1]) continue;
            cur.push_back(nums[i]);
            dfs(nums, cur, target, cursum+nums[i], i+1);
            cur.pop_back();
        }
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
| [Combination Sum](https://leetcode.com/problems/combination-sum/) | Medium |
