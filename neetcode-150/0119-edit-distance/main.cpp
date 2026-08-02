class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,-1));

        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (i == m) return n - j; // insert remaining chars
            if (j == n) return m - i; // delete remaining chars
            if (dp[i][j] != -1) return dp[i][j];

            int res;
            if (word1[i] == word2[j]) {
                res = dfs(i+1, j+1);
            } else {
                res = 1 + min({dfs(i+1, j),   // delete
                                dfs(i, j+1),   // insert
                                dfs(i+1, j+1)}); // replace
            }
            return dp[i][j] = res;
        };
        

        return dfs(0,0);

    }
};
