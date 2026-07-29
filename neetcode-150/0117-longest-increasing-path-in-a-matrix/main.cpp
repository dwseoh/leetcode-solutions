class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        // need to track length of subseq, choose max for dfs
        // from matrix[m][n], we can find intermediate results for longest inc
        // path starting from that index. it will never go back 
        // branch off until there is no higher number to branch until 

        int max_res = 0;
        int ys = matrix.size(), xs = matrix[0].size();
        vector<vector<int>> dir = {{0,1},{1,0},{0,-1},{-1,0}};
        vector<vector<int>> memo(ys,vector<int>(xs,-1));

        function<int(int,int)> dfs = [&](int y, int x) -> int {
            auto checkbounds = [&](int x, int y) -> bool {
                return y<ys && x<xs && y>=0 && x>=0;
            };
            
            if (!checkbounds(x,y)) return 0;
            if (memo[y][x] != -1) return memo[y][x];
            int res = 0;
            int cur = matrix[y][x];

            for (const auto& d: dir) {
                int yleap = y+d[0], xleap = x+d[1];
                if (checkbounds(xleap,yleap)&&matrix[yleap][xleap] > cur) res = max(res,dfs(yleap,xleap));
            }

            return memo[y][x] = res+1;
        };

        for (int i=0;i<ys;i++)
            for (int j = 0; j<xs; j++)
                max_res = max(max_res, dfs(i,j));

        return max_res;
    }
};
