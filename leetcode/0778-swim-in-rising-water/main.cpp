class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int cur_time = 0;

        auto check_bounds = [&](int y, int x) {
            return y>=0 && x>=0 && y<m && x<n;
        };

        vector<vector<int>> dir = {{0,1},{1,0},{0,-1},{-1,0}};
        set<pair<int,int>> seen;
        // can use 2d array like DP instead to optimize time complexity since checking for existence in a set is o(log n)
        priority_queue<array<int, 3>, vector<std::array<int, 3>>, greater<std::array<int, 3>>> q; // priority, x, y

        q.push({grid[0][0],0,0});

        while (!q.empty()) {
            auto cur = q.top(); q.pop();
            cur_time = max(cur_time, cur[0]);
            if (cur[2] == m-1 && cur[1] == n-1) break;
            for (const auto& d: dir) {
                int aim_x = d[0]+cur[1], aim_y = d[1]+cur[2];
                if (check_bounds(aim_y,aim_x) && !seen.contains({aim_y,aim_x})) {
                    q.push({grid[aim_y][aim_x], aim_x, aim_y});
                    seen.insert({aim_y,aim_x});
                }
            }
        }

        return cur_time;
    }
};