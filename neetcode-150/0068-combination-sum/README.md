# 068. Combination Sum

**Difficulty:** `Medium`  
**Acceptance Rate:** `76.5%`  
**Topics:** `array` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-18  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/combination-sum/)

---

## Problem

> Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

**Example 1:**
```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

**Example 2:**
```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

**Example 3:**
```
Input: candidates = [2], target = 1
Output: []
```

**Constraints:**
- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- `All elements of candidates are distinct.`
- `1 <= target <= 40`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(2^(t/m))`  
**Space Complexity:** `O(t/m)`

---

## Solution

```cpp
class Solution {
public:

    vector<vector<int>> res;

    vector<vector<int>> combinationSum(vector<int>& nums, int target) {
        vector<int> cur;
        dfs(nums,cur,target,0,0);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& cur, int target, int cursum, int idx) {
        if (cursum==target) {
            res.push_back(cur);
            return;
        }

        if (cursum>target) return;

        for (int i = idx; i < nums.size(); i++) {
            cur.push_back(nums[i]);
            dfs(nums, cur, target, cursum+nums[i], i);
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
| [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Medium |
| [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) | Medium |
| [Combinations](https://leetcode.com/problems/combinations/) | Medium |
| [Combination Sum III](https://leetcode.com/problems/combination-sum-iii/) | Medium |
| [Factor Combinations](https://leetcode.com/problems/factor-combinations/) | Medium |
| [Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/) | Medium |
| [The Number of Ways to Make the Sum](https://leetcode.com/problems/the-number-of-ways-to-make-the-sum/) | Medium |
