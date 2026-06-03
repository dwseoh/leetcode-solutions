# 080. Number of Islands

**Difficulty:** `Medium`  
**Acceptance Rate:** `64.4%`  
**Topics:** `array` `dfs` `bfs` `union-find` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/number-of-islands/)

---

## Problem

> Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Example 2:**
```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j] is '0' or '1'.`

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
    int numIslands(vector<vector<char>>& grid) {
        int cnt = 0;
        for (int y = 0; y < grid.size(); y++)
            for (int x = 0; x < grid[0].size(); x++)
                cnt += dfs(grid, x, y);
        return cnt;
    }

    bool dfs(vector<vector<char>>& grid, int x, int y) {
        if (y < 0 || x < 0 || y >= (int)grid.size() || x >= (int)grid[0].size())
            return false;
        if (grid[y][x] != '1') return false;

        grid[y][x] = '0';
        dfs(grid, x + 1, y);
        dfs(grid, x, y + 1);
        dfs(grid, x - 1, y);
        dfs(grid, x, y - 1);
        return true;
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
| [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) | Medium |
| [Walls and Gates](https://leetcode.com/problems/walls-and-gates/) | Medium |
| [Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/) | Hard |
| [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Medium |
| [Battleships in a Board](https://leetcode.com/problems/battleships-in-a-board/) | Medium |
| [Number of Distinct Islands](https://leetcode.com/problems/number-of-distinct-islands/) | Medium |
| [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) | Medium |
| [Count Sub Islands](https://leetcode.com/problems/count-sub-islands/) | Medium |
| [Find All Groups of Farmland](https://leetcode.com/problems/find-all-groups-of-farmland/) | Medium |
| [Count Unreachable Pairs of Nodes in an Undirected Graph](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/) | Medium |
| [Maximum Number of Fish in a Grid](https://leetcode.com/problems/maximum-number-of-fish-in-a-grid/) | Medium |
| [Count Islands With Total Value Divisible by K](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k/) | Medium |
