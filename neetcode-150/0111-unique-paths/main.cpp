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
