class Solution {
public:
    int mx,my;

    bool in_bound(int y, int x) {
        return 0<=y && y<my && 0<=x && x<mx;
    }

// this dfs loop is to check whos SAFE from changing
// dfs starts from the edges, branches in until it reaches a X.
// all cells not touched becomes a X

    void dfs(vector<vector<char>>& board, int y, int x) {
        if (!in_bound(y,x) || board[y][x] != 'O') return;

        board[y][x] = '#';
        dfs(board, y+1, x);
        dfs(board, y-1, x);
        dfs(board, y, x+1);
        dfs(board, y, x-1);
    }

    void solve(vector<vector<char>>& board) {
        my = board.size(); mx = board[0].size();
        
        for (int i = 0; i < my; i++) {
            dfs(board, i, 0);
            dfs(board, i, mx-1);
        }
        for (int j = 0; j < mx; j++) {
            dfs(board, 0, j);
            dfs(board, my-1, j);
        }

        for (int i = 0; i < my; i++)
            for (int j = 0; j < mx; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == '#') board[i][j] = 'O';
            }
    }
};
