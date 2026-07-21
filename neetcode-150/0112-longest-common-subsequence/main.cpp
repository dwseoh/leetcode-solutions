class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {

        vector<vector<int>> memo(text1.size(),vector<int> (text2.size(),-1));

        function<int(int,int)> recurse = [&](int i, int j) -> int {
            if (i >= text1.size() || j >= text2.size()) return 0;
            if (memo[i][j] != -1) return memo[i][j];

            if (text1[i] == text2[j]) {
                return memo[i][j]=1+recurse(i+1,j+1);
            } 
            
            return memo[i][j]=max(recurse(i+1,j),recurse(i,j+1));
        };

        return recurse(0,0);
    }
};
