# 086. Surrounded Regions

**Difficulty:** `Medium`  
**Acceptance Rate:** `45.5%`  
**Topics:** `array` `dfs` `bfs` `union-find` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/surrounded-regions/)

---

## Problem

> You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:
Connect: A cell is connected to adjacent cells horizontally or vertically.
	Region: To form a region connect every 'O' cell.
	Surround: A region is surrounded if none of the 'O' cells in that region are on the edge of the board. Such regions are completely enclosed by 'X' cells.
To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.

**Example 1:**
```
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation:
In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.
```

**Example 2:**
```
Input: board = [["X"]]
Output: [["X"]]
```

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`
- `board[i][j] is 'X' or 'O'.`

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
    int mx,my;

    bool in_bound(int y, int x) {
        return 0<=y && y<my && 0<=x && x<mx;
    }

// this dfs loop is to check whos SAFE from changing
// dfs starts from the edges, branches in until it reaches a X.
// all cells not touched becomes a X

    void dfs(vector<vector<char>>& board, int y, int x) {
        if (!in_bound(y,x) || board[y][x] != 'O') return;

        board[y][x] = '#';
        dfs(board, y+1, x);
        dfs(board, y-1, x);
        dfs(board, y, x+1);
        dfs(board, y, x-1);
    }

    void solve(vector<vector<char>>& board) {
        my = board.size(); mx = board[0].size();
        
        for (int i = 0; i < my; i++) {
            dfs(board, i, 0);
            dfs(board, i, mx-1);
        }
        for (int j = 0; j < mx; j++) {
            dfs(board, 0, j);
            dfs(board, my-1, j);
        }

        for (int i = 0; i < my; i++)
            for (int j = 0; j < mx; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == '#') board[i][j] = 'O';
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
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Medium |
| [Walls and Gates](https://leetcode.com/problems/walls-and-gates/) | Medium |
