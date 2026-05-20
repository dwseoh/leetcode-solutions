# 070. Permutations

**Difficulty:** `Medium`  
**Acceptance Rate:** `81.9%`  
**Topics:** `array` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-20  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/permutations/)

---

## Problem

> Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**
```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Example 3:**
```
Input: nums = [1]
Output: [[1]]
```

**Constraints:**
- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `All the integers of nums are unique.`

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
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;

        dfs({},nums,res,nums.size());
        return res;
    }

    void dfs(vector<int> used, vector<int> unused,
         vector<vector<int>>& res, int size) {
        if (used.size() == size) {
            res.push_back(used);
            return;
        }
        for (int i = 0; i < unused.size(); i++) {
            int tmp = unused[i];
            unused.erase(unused.begin() + i);
            used.push_back(tmp);
            dfs(used, unused, res, size);
            used.pop_back();
            unused.insert(unused.begin() + i, tmp);
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
| [Next Permutation](https://leetcode.com/problems/next-permutation/) | Medium |
| [Permutations II](https://leetcode.com/problems/permutations-ii/) | Medium |
| [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/) | Hard |
| [Combinations](https://leetcode.com/problems/combinations/) | Medium |
