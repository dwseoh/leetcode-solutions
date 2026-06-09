# 083. Walls and Gates

**Difficulty:** `Medium`  
**Acceptance Rate:** `64%`  
**Topics:** `array` `bfs` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-09  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/walls-and-gates/)

---

## Problem
You are given a m×n 2D grid initialized with these three possible values:

-1 - A water cell that can not be traversed.
0 - A treasure chest.
INF - A land cell that can be traversed. We use the integer 2^31 - 1 = 2147483647 to represent INF.
Fill each land cell with the distance to its nearest treasure chest. If a land cell cannot reach a treasure chest then the value should remain INF.

Assume the grid can only be traversed up, down, left, or right.

Modify the grid in-place.

Example 1:

Input: [
  [2147483647,-1,0,2147483647],
  [2147483647,2147483647,2147483647,-1],
  [2147483647,-1,2147483647,-1],
  [0,-1,2147483647,2147483647]
]

Output: [
  [3,-1,0,1],
  [2,2,1,-1],
  [1,-1,2,-1],
  [0,-1,3,4]
]
Example 2:

Input: [
  [0,-1],
  [2147483647,2147483647]
]

Output: [
  [0,-1],
  [1,2]
]


**Constraints:**
- 

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
    void islandsAndTreasure(vector<vector<int>>& grid) {
        int cnt{};
        for (int y = 0; y < grid.size(); y++)
            for (int x = 0; x < grid[0].size(); x++)
                if (grid[y][x] == 0) {
                    dfs(grid, x, y, cnt);
                }
    }

    void dfs(vector<vector<int>>& grid, int x, int y, int cnt) {
        if (y < 0 || x < 0 || y >= (int)grid.size() || x >= (int)grid[0].size())
            return;

        if (grid[y][x] < cnt) return;  
        grid[y][x] = cnt;

        dfs(grid, x + 1, y, cnt+1);
        dfs(grid, x, y + 1,cnt+1);
        dfs(grid, x - 1, y,cnt+1);
        dfs(grid, x, y - 1,cnt+1);
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
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Medium |
| [Shortest Distance from All Buildings](https://leetcode.com/problems/shortest-distance-from-all-buildings/) | Hard |
| [Battleships in a Board](https://leetcode.com/problems/battleships-in-a-board/) | Medium |
| [Robot Room Cleaner](https://leetcode.com/problems/robot-room-cleaner/) | Hard |
| [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | Medium |
| [Count the Number of Houses at a Certain Distance I](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i/) | Medium |
| [Count the Number of Houses at a Certain Distance II](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii/) | Hard |
