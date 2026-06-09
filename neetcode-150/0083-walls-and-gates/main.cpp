class Solution {
public:
    void islandsAndTreasure(vector<vector<int>>& grid) {
        int cnt{};
        for (int y = 0; y < grid.size(); y++)
            for (int x = 0; x < grid[0].size(); x++)
                if (grid[y][x] == 0) {
                    dfs(grid, x, y, cnt);
                }
    }

    void dfs(vector<vector<int>>& grid, int x, int y, int cnt) {
        if (y < 0 || x < 0 || y >= (int)grid.size() || x >= (int)grid[0].size())
            return;

        if (grid[y][x] < cnt) return;  
        grid[y][x] = cnt;

        dfs(grid, x + 1, y, cnt+1);
        dfs(grid, x, y + 1,cnt+1);
        dfs(grid, x - 1, y,cnt+1);
        dfs(grid, x, y - 1,cnt+1);
    }
};
