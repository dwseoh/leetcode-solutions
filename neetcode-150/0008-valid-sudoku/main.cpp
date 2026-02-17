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

