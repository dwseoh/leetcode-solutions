class Solution {
public:

    int m, n;

    vector<vector<int>> dir = {
        {0, 1}, {1, 0}, {0, -1}, {-1, 0}
    };

    bool inbound(int y, int x) {
        return y >= 0 && y < m && x >= 0 && x < n;
    }

    void dfs(vector<vector<int>>& heights,
             vector<vector<bool>>& vis,
             int y, int x) {
        
        if (vis[y][x]) return;

        vis[y][x] = true;

        for (const auto& d: dir) {
            int ny = y+d[0]; int nx = x+d[1];
            if (inbound(ny,nx) && heights[ny][nx] >= heights[y][x])
            dfs(heights,vis,ny,nx);
        }

    }

    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        m = heights.size(); n = heights[0].size();

        vector<vector<bool>> pacific(m, vector<bool>(n, false));
        vector<vector<bool>> atlantic(m, vector<bool>(n, false));

        for (int i = 0; i < m; i++)
            dfs(heights, pacific, i, 0);
        for (int j = 0; j < n; j++)
            dfs(heights, pacific, 0, j);

        for (int i = 0; i < m; i++)
            dfs(heights, atlantic, i, n - 1);
        for (int j = 0; j < n; j++)
            dfs(heights, atlantic, m - 1, j);

        vector<vector<int>> res;

        for (int i = 0; i < m; i++) 
            for (int j = 0; j < n; j++) 
                if (pacific[i][j] && atlantic[i][j]) 
                    res.push_back({i, j});

        return res;
    }
};
