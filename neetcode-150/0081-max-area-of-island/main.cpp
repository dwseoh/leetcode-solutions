class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int max_area = -1;

        for (int y = 0; y<grid.size(); y++)
            for (int x = 0; x<grid[0].size(); x++)
                max_area = max(dfs(grid,x,y),max_area);

        return (max_area != -1) ? max_area : 0;
    }

    int dfs(vector<vector<int>>& grid, int x, int y) {
        if (y < 0 || x < 0 || y >= (int)grid.size() || x >= (int)grid[0].size())
            return 0;
        if (grid[y][x] != 1) return 0;

        grid[y][x] = 0; int area = 0;
        area += dfs(grid, x + 1, y);
        area += dfs(grid, x, y + 1);
        area += dfs(grid, x - 1, y);
        area += dfs(grid, x, y - 1);
        return area+1;
    }

    
};
