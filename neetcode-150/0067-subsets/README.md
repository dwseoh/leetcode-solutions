# 067. Subsets

**Difficulty:** `Medium`  
**Acceptance Rate:** `82.3%`  
**Topics:** `array` `backtracking` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-16  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/subsets/)

---

## Problem

> Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**Example 2:**
```
Input: nums = [0]
Output: [[],[0]]
```

**Constraints:**
- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- `All the numbers of nums are unique.`

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

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> cur;
        dfs(nums, cur, 0);
        return res;
    }
    
    void dfs(vector<int>& nums, vector<int>& cur, int idx) {
        res.push_back(cur);
        for (int i = idx; i < nums.size(); i++) {
            cur.push_back(nums[i]);
            dfs(nums, cur, i + 1);
            cur.pop_back();
        }
    }
};

/*
dfs(idx=0, cur=[])           → record []
  i=0: cur=[1]
    dfs(idx=1, cur=[1])      → record [1]
      i=1: cur=[1,2]
        dfs(idx=2, cur=[1,2]) → record [1,2]
          i=2: cur=[1,2,3]
            dfs(idx=3)        → record [1,2,3]
          pop → [1,2]
      pop → [1]
      i=2: cur=[1,3]
        dfs(idx=3)            → record [1,3]
      pop → [1]
  pop → []
  i=1: cur=[2]
    ...

*/
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
| [Subsets II](https://leetcode.com/problems/subsets-ii/) | Medium |
| [Generalized Abbreviation](https://leetcode.com/problems/generalized-abbreviation/) | Medium |
| [Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/) | Medium |
| [Find Array Given Subset Sums](https://leetcode.com/problems/find-array-given-subset-sums/) | Hard |
| [Count Number of Maximum Bitwise-OR Subsets](https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/) | Medium |
