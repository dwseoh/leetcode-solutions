class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,-1));
        
        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (j==n) return i==m;
            if (dp[i][j] != -1) return dp[i][j];

            bool firstMatch = (i < m) && (p[j] == '.' || p[j] == s[i]);
            int res = 0;

            // when we consume the "*", we DONT advance the j marker
            // so in next i index we have the choice to skip again (consume another ) or end (advance *)
            if (j+1<n && p[j+1] == '*') {
                return dfs(i,j+2) || firstMatch && dfs(i+1,j);
                // try matching (skip *) OR advance to next i by consuming the same "preceding element" again
            } else {
                return firstMatch && dfs(i+1,j+1);
            }

            return dp[i][j] = res;

        };

        return dfs(0,0);
    }
};
