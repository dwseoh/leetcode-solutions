# 137. Spiral Matrix

**Difficulty:** `Medium`  
**Acceptance Rate:** `57.8%`  
**Topics:** `array` `matrix` `simulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/spiral-matrix/)

---

## Problem

> Given an m x n matrix, return all elements of the matrix in spiral order.

**Example 1:**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

**Example 2:**
```
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> output;

        int top = 0;
        int bottom = matrix.size() - 1;
        int left = 0;
        int right = matrix[0].size() - 1;

        while (top <= bottom && left <= right) {

            // left -> right
            for (int col = left; col <= right; col++) {
                output.push_back(matrix[top][col]);
            }
            top++;

            // top -> bottom
            for (int row = top; row <= bottom; row++) {
                output.push_back(matrix[row][right]);
            }
            right--;

            // right -> left
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    output.push_back(matrix[bottom][col]);
                }
                bottom--;
            }

            // bottom -> top
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    output.push_back(matrix[row][left]);
                }
                left++;
            }
        }

        return output;
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
| [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/) | Medium |
| [Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii/) | Medium |
| [Spiral Matrix IV](https://leetcode.com/problems/spiral-matrix-iv/) | Medium |
