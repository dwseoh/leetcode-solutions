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
