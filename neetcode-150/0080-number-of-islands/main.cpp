class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int cnt = 0;
        for (int y = 0; y < grid.size(); y++)
            for (int x = 0; x < grid[0].size(); x++)
                cnt += dfs(grid, x, y);
        return cnt;
    }

    bool dfs(vector<vector<char>>& grid, int x, int y) {
        if (y < 0 || x < 0 || y >= (int)grid.size() || x >= (int)grid[0].size())
            return false;
        if (grid[y][x] != '1') return false;

        grid[y][x] = '0';
        dfs(grid, x + 1, y);
        dfs(grid, x, y + 1);
        dfs(grid, x - 1, y);
        dfs(grid, x, y - 1);
        return true;
    }
};