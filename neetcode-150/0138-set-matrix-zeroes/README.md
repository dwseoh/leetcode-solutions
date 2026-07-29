# 138. Set Matrix Zeroes

**Difficulty:** `Medium`  
**Acceptance Rate:** `63.4%`  
**Topics:** `array` `hash-map` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-29  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/set-matrix-zeroes/)

---

## Problem

> Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
You must do it in place.

**Example 1:**
```
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

**Example 2:**
```
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

**Constraints:**
- `A straightforward solution using O(mn) space is probably a bad idea.`
- `A simple improvement uses O(m + n) space, but still not the best solution.`
- `Could you devise a constant space solution?`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^4)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        // the first row + column of the matrix is going to 
        // store info about if that row/column needs to be zeroed out
        // that's why we check if first row, first column has zero
        // since at the end we're gonna have to zero-out if so.
        
        bool firstRowHasZero = false;
        bool firstColumnHasZero = false;
        for (int i = 0; i<n;i++) if (matrix[0][i] == 0) {firstRowHasZero = true; break;}
        for (int i = 0; i<m;i++) if (matrix[i][0] == 0) {firstColumnHasZero = true; break;}

        for (int i = 1; i<m; i++) {
            for (int j = 1; j<n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    matrix[i][0] = 0;
                }
            }
        }

        for (int i = 1; i<m; i++) {
            for (int j = 1; j<n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        if (firstRowHasZero) {
            for (int i = 0; i<n; i++) matrix[0][i] = 0;
        }
        if (firstColumnHasZero) {
            for (int i = 0; i<m; i++) matrix[i][0] = 0;
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
| [Game of Life](https://leetcode.com/problems/game-of-life/) | Medium |
| [Number of Laser Beams in a Bank](https://leetcode.com/problems/number-of-laser-beams-in-a-bank/) | Medium |
| [Minimum Operations to Remove Adjacent Ones in Matrix](https://leetcode.com/problems/minimum-operations-to-remove-adjacent-ones-in-matrix/) | Hard |
| [Remove All Ones With Row and Column Flips II](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii/) | Medium |
