# 079. Word Search

**Difficulty:** `Medium`  
**Acceptance Rate:** `48.2%`  
**Topics:** `array` `string` `backtracking` `dfs` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/word-search/)

---

## Problem

> Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

**Example 2:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

**Example 3:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

**Constraints:**
- `m == board.length`
- `n = board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board and word consists of only lowercase and uppercase English letters.`

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
    bool exist(vector<vector<char>>& board, string word) {
        int ylim = board.size(), xlim = board[0].size();
        int n = word.size()-1;
        // dfs with backtracking 
        function<bool(int,int,int)> dfs = [&](int x, int y, int idx) -> bool {
            if (x<0 || x>=xlim || y<0 || y>=ylim ) return false;
            if (word[idx] != board[y][x]) return false;
            if (idx==n) return true;
            board[y][x] = '#';
            bool found = dfs(x+1,y,idx+1) || dfs(x,y+1,idx+1) || dfs(x-1,y,idx+1) || dfs(x,y-1,idx+1);
            board[y][x] = word[idx];
            return found;
        };

        for (int i = 0; i<board.size();i++)
            for (int j = 0; j<board[0].size();j++)
                if (dfs(j,i,0)) return true;

        return false;
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
| [Word Search II](https://leetcode.com/problems/word-search-ii/) | Hard |
