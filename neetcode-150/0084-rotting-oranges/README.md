# 084. Rotting Oranges

**Difficulty:** `Medium`  
**Acceptance Rate:** `58.8%`  
**Topics:** `array` `bfs` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-11  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/rotting-oranges/)

---

## Problem

> You are given an m x n grid where each cell can have one of three values:
0 representing an empty cell,
	1 representing a fresh orange, or
	2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

**Example 1:**
```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

**Example 2:**
```
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
```

**Example 3:**
```
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
```

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10`
- `grid[i][j] is 0, 1, or 2.`

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
    int orangesRotting(vector<vector<int>>& grid) {
        
        std::queue<pair<int,int>> q;
        int ones{}; int mins{};

        int rows = grid.size();
        int cols = grid[0].size();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 2) 
                    q.push({i,j});
                else if (grid[i][j] == 1) ones++;
            }
        }

        auto inBound = [&](int y, int x) -> bool {
            return (y >= 0 && x >= 0 && y < rows && x < cols);
        };

        auto process = [&](int y, int x) -> void {
            if (inBound(y, x) && grid[y][x] == 1) {
                grid[y][x] = 2;
                ones--;
                q.push({y, x});
            }
        };

        while (ones > 0 && !q.empty()) {
            int sz = q.size();

            for (int i = 0; i < sz; i++) {
                auto coord = q.front();
                q.pop();

                int y = coord.first;
                int x = coord.second;

                process(y + 1, x);
                process(y - 1, x);
                process(y, x + 1);
                process(y, x - 1);
            }

            mins++;
        }

        return ones == 0 ? mins : -1;
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
| [Walls and Gates](https://leetcode.com/problems/walls-and-gates/) | Medium |
| [Battleships in a Board](https://leetcode.com/problems/battleships-in-a-board/) | Medium |
| [Detonate the Maximum Bombs](https://leetcode.com/problems/detonate-the-maximum-bombs/) | Medium |
| [Escape the Spreading Fire](https://leetcode.com/problems/escape-the-spreading-fire/) | Hard |
