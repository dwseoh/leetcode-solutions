# 073. Word Search

**Difficulty:** `Medium`  
**Acceptance Rate:** `47.4%`  
**Topics:** `array` `string` `backtracking` `dfs` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-26  
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

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int n = board.size(), l = board[0].size();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j<l;j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int idx) {
            if (idx == word.size()) return true;
            if (r<0 || c<0 || r>=board.size()|| c>=board[0].size()) return false;
            if (board[r][c] != word[idx]) return false;

            char tmp = board[r][c];
            board[r][c] = '#'; // IMPORTANT!!!
            bool found = dfs(board, word, r+1, c, idx+1)
                  || dfs(board, word, r-1, c, idx+1)
                  || dfs(board, word, r, c+1, idx+1)
                  || dfs(board, word, r, c-1, idx+1);
            board[r][c] = tmp;
            return found;

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
