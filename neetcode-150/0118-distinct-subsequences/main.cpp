class Solution {
public:
    int numDistinct(string s, string t) {
        // dp[m][n] - using up 0...m chars and 0...n chars how many matches do we have?
        int m = s.size(), n = t.size();
        vector<vector<int>> dp(m+1,vector<int>(n+1,-1)); // do we need to index it as 0 

        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (j==n) return 1; // reached end of matching word (j) so it is a match 
            if (i==m) return 0; // ran out of characters
            if (dp[i][j] != -1) return dp[i][j];
            
            int res = 0;
            res += dfs(i+1,j); // when we skip the current char
            if (s[i] == t[j])
            res+= dfs(i+1,j+1); // if its a match 

            return dp[i][j] = res;
        };

        return dfs(0,0);
    }
};
