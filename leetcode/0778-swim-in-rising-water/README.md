# 778. Swim in Rising Water

**Difficulty:** `Hard`  
**Acceptance Rate:** `68.1%`  
**Topics:** `array` `binary-search` `dfs` `bfs` `union-find` `heap` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-30  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/swim-in-rising-water/)

---

## Problem

> You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).
It starts raining, and water gradually rises over time. At time t, the water level is t, meaning any cell with elevation less than equal to t is submerged or reachable.
You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.
Return the minimum time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

**Example 1:**
```
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
```

**Example 2:**
```
Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
```

**Constraints:**
- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] < n2`
- `Each value grid[i][j] is unique.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log k)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int cur_time = 0;

        auto check_bounds = [&](int y, int x) {
            return y>=0 && x>=0 && y<m && x<n;
        };

        vector<vector<int>> dir = {{0,1},{1,0},{0,-1},{-1,0}};
        set<pair<int,int>> seen;
        // can use 2d array like DP instead to optimize time complexity since checking for existence in a set is o(log n)
        priority_queue<array<int, 3>, vector<std::array<int, 3>>, greater<std::array<int, 3>>> q; // priority, x, y

        q.push({grid[0][0],0,0});

        while (!q.empty()) {
            auto cur = q.top(); q.pop();
            cur_time = max(cur_time, cur[0]);
            if (cur[2] == m-1 && cur[1] == n-1) break;
            for (const auto& d: dir) {
                int aim_x = d[0]+cur[1], aim_y = d[1]+cur[2];
                if (check_bounds(aim_y,aim_x) && !seen.contains({aim_y,aim_x})) {
                    q.push({grid[aim_y][aim_x], aim_x, aim_y});
                    seen.insert({aim_y,aim_x});
                }
            }
        }

        return cur_time;
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
| [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) | Medium |
