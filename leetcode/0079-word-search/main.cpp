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