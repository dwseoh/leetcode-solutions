class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        // dp[i][j] represent if string s3 (up to index i+j+1) can be constructed
        // with ~i idx in s1, ~j idx in s2

        int l1 = s1.size(); int l2 = s2.size();
        if (l1 + l2 != (int)s3.size()) return false;
        vector<vector<int>> memo(l1+1,vector<int>(l2+1,-1));
        // do not define dfs[0][0] = 1 because dfs(0,0) will always return true

        // this approach is memoization; top-down
        // if i did tabulation - every cell's value depends on cells before it.

        function<bool(int,int)>dfs = [&](int i, int j) -> bool {
            if (memo[i][j] != -1) return memo[i][j];
            if (i==l1 && j==l2) return true;

            bool res = false;

            if (i<l1 && s3[i+j] == s1[i]) res += dfs(i+1,j);
            if (j<l2 && s3[i+j] == s2[j]) res += dfs(i,j+1);

            return memo[i][j] = res;
        };

        return dfs(0,0);
    }
};
