class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        
        std::queue<pair<int,int>> q;
        int ones{}; int mins{};

        int rows = grid.size();
        int cols = grid[0].size();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 2) 
                    q.push({i,j});
                else if (grid[i][j] == 1) ones++;
            }
        }

        auto inBound = [&](int y, int x) -> bool {
            return (y >= 0 && x >= 0 && y < rows && x < cols);
        };

        auto process = [&](int y, int x) -> void {
            if (inBound(y, x) && grid[y][x] == 1) {
                grid[y][x] = 2;
                ones--;
                q.push({y, x});
            }
        };

        while (ones > 0 && !q.empty()) {
            int sz = q.size();

            for (int i = 0; i < sz; i++) {
                auto coord = q.front();
                q.pop();

                int y = coord.first;
                int x = coord.second;

                process(y + 1, x);
                process(y - 1, x);
                process(y, x + 1);
                process(y, x - 1);
            }

            mins++;
        }

        return ones == 0 ? mins : -1;
    }
};