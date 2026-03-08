# 028. Search a 2D Matrix

**Difficulty:** `Medium`  
**Acceptance Rate:** `53.6%`  
**Topics:** `array` `binary-search` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/search-a-2d-matrix/)

---

## Problem

> You are given an m x n integer matrix matrix with the following two properties:
Each row is sorted in non-decreasing order.
	The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.
You must write a solution in O(log(m * n)) time complexity.

**Example 1:**
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

**Example 2:**
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-104 <= matrix[i][j], target <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Binary search two times

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Binary search on the rows first to find the appropriate subarray to search
2. Binary search on the columns within that subarray to find if element found

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int left = 0;
        int right = matrix.size()-1;

        while (left<=right) {
            int mid = (right-left)/2+left;
            if (matrix[mid][0] == target) return true;
            else if (matrix[mid][0] > target) right = mid-1;
            else if (matrix[mid][0] < target) left = mid+1;
        }

        if (right < 0) return false; 

        int idx = right;
        left = 0;
        right = matrix[idx].size()-1;

        while (left<=right) {
            int mid = (right-left)/2+left;

            if (matrix[idx][mid] == target) return true;
            else if (matrix[idx][mid] > target) right = mid-1;
            else if (matrix[idx][mid] < target) left = mid+1;
        }

        return false;


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
| [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) | Medium |
| [Split Message Based on Limit](https://leetcode.com/problems/split-message-based-on-limit/) | Hard |
