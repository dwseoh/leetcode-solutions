# 117. Longest Increasing Path in a Matrix

**Difficulty:** `Hard`  
**Acceptance Rate:** `56.9%`  
**Topics:** `array` `dynamic-programming` `dfs` `bfs` `graph` `topological-sort` `memoization` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-29  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)

---

## Problem

> Given an m x n integers matrix, return the length of the longest increasing path in matrix.
From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

**Example 1:**
```
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
```

**Example 2:**
```
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
```

**Example 3:**
```
Input: matrix = [[1]]
Output: 1
```

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `0 <= matrix[i][j] <= 231 - 1`

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
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        // need to track length of subseq, choose max for dfs
        // from matrix[m][n], we can find intermediate results for longest inc
        // path starting from that index. it will never go back 
        // branch off until there is no higher number to branch until 

        int max_res = 0;
        int ys = matrix.size(), xs = matrix[0].size();
        vector<vector<int>> dir = {{0,1},{1,0},{0,-1},{-1,0}};
        vector<vector<int>> memo(ys,vector<int>(xs,-1));

        function<int(int,int)> dfs = [&](int y, int x) -> int {
            auto checkbounds = [&](int x, int y) -> bool {
                return y<ys && x<xs && y>=0 && x>=0;
            };
            
            if (!checkbounds(x,y)) return 0;
            if (memo[y][x] != -1) return memo[y][x];
            int res = 0;
            int cur = matrix[y][x];

            for (const auto& d: dir) {
                int yleap = y+d[0], xleap = x+d[1];
                if (checkbounds(xleap,yleap)&&matrix[yleap][xleap] > cur) res = max(res,dfs(yleap,xleap));
            }

            return memo[y][x] = res+1;
        };

        for (int i=0;i<ys;i++)
            for (int j = 0; j<xs; j++)
                max_res = max(max_res, dfs(i,j));

        return max_res;
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
| [Number of Increasing Paths in a Grid](https://leetcode.com/problems/number-of-increasing-paths-in-a-grid/) | Hard |
