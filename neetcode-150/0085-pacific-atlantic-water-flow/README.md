# 085. Pacific Atlantic Water Flow

**Difficulty:** `Medium`  
**Acceptance Rate:** `61%`  
**Topics:** `array` `dfs` `bfs` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/pacific-atlantic-water-flow/)

---

## Problem

> There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

**Example 1:**
```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
```

**Example 2:**
```
Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
```

**Constraints:**
- `m == heights.length`
- `n == heights[r].length`
- `1 <= m, n <= 200`
- `0 <= heights[r][c] <= 105`

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

    int m, n;

    vector<vector<int>> dir = {
        {0, 1}, {1, 0}, {0, -1}, {-1, 0}
    };

    bool inbound(int y, int x) {
        return y >= 0 && y < m && x >= 0 && x < n;
    }

    void dfs(vector<vector<int>>& heights,
             vector<vector<bool>>& vis,
             int y, int x) {
        
        if (vis[y][x]) return;

        vis[y][x] = true;

        for (const auto& d: dir) {
            int ny = y+d[0]; int nx = x+d[1];
            if (inbound(ny,nx) && heights[ny][nx] >= heights[y][x])
            dfs(heights,vis,ny,nx);
        }

    }

    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        m = heights.size(); n = heights[0].size();

        vector<vector<bool>> pacific(m, vector<bool>(n, false));
        vector<vector<bool>> atlantic(m, vector<bool>(n, false));

        for (int i = 0; i < m; i++)
            dfs(heights, pacific, i, 0);
        for (int j = 0; j < n; j++)
            dfs(heights, pacific, 0, j);

        for (int i = 0; i < m; i++)
            dfs(heights, atlantic, i, n - 1);
        for (int j = 0; j < n; j++)
            dfs(heights, atlantic, m - 1, j);

        vector<vector<int>> res;

        for (int i = 0; i < m; i++) 
            for (int j = 0; j < n; j++) 
                if (pacific[i][j] && atlantic[i][j]) 
                    res.push_back({i, j});

        return res;
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
