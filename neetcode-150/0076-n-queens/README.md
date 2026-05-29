# 076. N-Queens

**Difficulty:** `Hard`  
**Acceptance Rate:** `75.6%`  
**Topics:** `array` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-29  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/n-queens/)

---

## Problem

> The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

**Example 1:**
```
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
```

**Example 2:**
```
Input: n = 1
Output: [["Q"]]
```

**Constraints:**
- `1 <= n <= 9`

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
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        unordered_set<int> cols, diag1, diag2;  // diag1: r-c, diag2: r+c
        dfs(res, board, cols, diag1, diag2, 0, n);
        return res;
    }

    void dfs(vector<vector<string>> &res,
             vector<string> &board,
             unordered_set<int> &cols,
             unordered_set<int> &diag1,
             unordered_set<int> &diag2,
             int row, int n) {
        if (row == n) {
            res.push_back(board);
            return;
        }

        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col))
                continue;

            board[row][col] = 'Q';
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);

            dfs(res, board, cols, diag1, diag2, row + 1, n);

            board[row][col] = '.';
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
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
| [N-Queens II](https://leetcode.com/problems/n-queens-ii/) | Hard |
| [Grid Illumination](https://leetcode.com/problems/grid-illumination/) | Hard |
