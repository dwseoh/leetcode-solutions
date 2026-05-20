# 071. Subsets II

**Difficulty:** `Medium`  
**Acceptance Rate:** `61.3%`  
**Topics:** `array` `backtracking` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-20  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/subsets-ii/)

---

## Problem

> Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

**Example 1:**
```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**Example 2:**
```
Input: nums = [0]
Output: [[],[0]]
```

**Constraints:**
- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:

    vector<vector<int>> res;

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<int> cur;
        sort(nums.begin(), nums.end());
        dfs(nums, cur, 0);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& cur, int idx) {
        res.push_back(cur);
        for (int i = idx; i < nums.size(); i++) {
            if (i > idx && nums[i] == nums[i-1]) continue;
            cur.push_back(nums[i]);
            dfs(nums, cur, i + 1);
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
| [Subsets](https://leetcode.com/problems/subsets/) | Medium |
| [Find Array Given Subset Sums](https://leetcode.com/problems/find-array-given-subset-sums/) | Hard |
