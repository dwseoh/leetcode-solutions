# 081. Max Area of Island

**Difficulty:** `Medium`  
**Acceptance Rate:** `74%`  
**Topics:** `array` `dfs` `bfs` `union-find` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/max-area-of-island/)

---

## Problem

> You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
The area of an island is the number of cells with a value 1 in the island.
Return the maximum area of an island in grid. If there is no island, return 0.

**Example 1:**
```
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
```

**Example 2:**
```
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j] is either 0 or 1.`

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
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int max_area = -1;

        for (int y = 0; y<grid.size(); y++)
            for (int x = 0; x<grid[0].size(); x++)
                max_area = max(dfs(grid,x,y),max_area);

        return (max_area != -1) ? max_area : 0;
    }

    int dfs(vector<vector<int>>& grid, int x, int y) {
        if (y < 0 || x < 0 || y >= (int)grid.size() || x >= (int)grid[0].size())
            return 0;
        if (grid[y][x] != 1) return 0;

        grid[y][x] = 0; int area = 0;
        area += dfs(grid, x + 1, y);
        area += dfs(grid, x, y + 1);
        area += dfs(grid, x - 1, y);
        area += dfs(grid, x, y - 1);
        return area+1;
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
| [Battleships in a Board](https://leetcode.com/problems/battleships-in-a-board/) | Medium |
| [Island Perimeter](https://leetcode.com/problems/island-perimeter/) | Easy |
| [Largest Submatrix With Rearrangements](https://leetcode.com/problems/largest-submatrix-with-rearrangements/) | Medium |
| [Detonate the Maximum Bombs](https://leetcode.com/problems/detonate-the-maximum-bombs/) | Medium |
| [Maximum Number of Fish in a Grid](https://leetcode.com/problems/maximum-number-of-fish-in-a-grid/) | Medium |
