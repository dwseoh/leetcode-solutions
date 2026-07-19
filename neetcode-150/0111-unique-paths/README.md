# 111. Unique Paths

**Difficulty:** `Medium`  
**Acceptance Rate:** `67.1%`  
**Topics:** `math` `dynamic-programming` `combinatorics`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/unique-paths/)

---

## Problem

> There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
The test cases are generated so that the answer will be less than or equal to 2 * 109.

**Example 1:**
```
Input: m = 3, n = 7
Output: 28
```

**Example 2:**
```
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

**Constraints:**
- `1 <= m, n <= 100`

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
    int uniquePaths(int m, int n) {
        // n is 1d m is 2d
        vector<vector<int>> dp(n,vector<int>(m,0));

        for (int i = 0; i<m; i++) dp[0][i] = 1;
        for (int i = 0; i<n; i++) dp[i][0] = 1;

        function<int(int,int)> dfs = [&](int x, int y) -> int {
            if (dp[y][x]) return dp[y][x];
            return dp[y][x] = (dfs(x,y-1)+dfs(x-1,y));
        };

        return dfs(m-1,n-1);
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
| [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/) | Medium |
| [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) | Medium |
| [Dungeon Game](https://leetcode.com/problems/dungeon-game/) | Hard |
| [Minimum Path Cost in a Grid](https://leetcode.com/problems/minimum-path-cost-in-a-grid/) | Medium |
| [Minimum Cost Homecoming of a Robot in a Grid](https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid/) | Medium |
| [Number of Ways to Reach a Position After Exactly k Steps](https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/) | Medium |
| [Paths in Matrix Whose Sum Is Divisible by K](https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k/) | Hard |
