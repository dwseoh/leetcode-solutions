# 008. Valid Sudoku

**Difficulty:** `Medium`  
**Acceptance Rate:** `64.1%`  
**Topics:** `array` `hash-map` `matrix`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/valid-sudoku/)

---

## Problem

> Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
	Each column must contain the digits 1-9 without repetition.
	Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.
	Only the filled cells need to be validated according to the mentioned rules.

**Example 1:**
```
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

**Example 2:**
```
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
```

**Constraints:**
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j] is a digit 1-9 or '.'.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized that I needed to implement a hash map for each row, column, and boxes.
By setting the key to be [row/col/box][#][num_shown], I could use one unordered set to check out for duplicates. 

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Single pass through board - iterate all cells, skip empty ones
2. Encode constraints as unique strings - for each digit, create 3 keys: row constraint "r{row}{digit}", column constraint "c{col}{digit}", and box constraint "b{row/3}{col/3}{digit}"
3. Check duplicates with set - if any constraint key already exists in seen, return false; otherwise insert all 3 keys and continue

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int n = board.size();
        unordered_set<string> seen;

        for (int r = 0; r<9; r++) {
            for (int c = 0; c<9; c++) {
                if (board[r][c] == '.') continue;
                
                char digit = board[r][c];
                string row = "r" + to_string(r) + digit;
                string col = "c" + to_string(c) + digit;
                string box = "b" + to_string(r/3) + to_string(c/3) + digit;

                if (seen.count(row) || seen.count(col) || seen.count(box)) {
                    return false;
                }

                seen.insert(row);
                seen.insert(col);
                seen.insert(box);

            }
        }

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
| [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) | Hard |
| [Check if Every Row and Column Contains All Numbers](https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers/) | Easy |
