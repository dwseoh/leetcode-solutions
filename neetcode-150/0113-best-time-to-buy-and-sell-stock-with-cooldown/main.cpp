class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        // memo[i][holding]: best profit from day i onward, given holding state.
        // holding: 0 = not holding, 1 = holding a share.
        vector<vector<int>> memo(n, vector<int>(2, -1));
        // equivalent of having 3 memos for memo_sold, memo_unsold, memo_final

        function<int(int,int)> dfs = [&](int i, int holding) -> int {
            if (i >= n) return 0;                 // no days left, no more profit
            if (memo[i][holding] != -1) return memo[i][holding];

            int rest = dfs(i + 1, holding);       // do nothing today
            int action;
            if (holding) {
                // sell today: gain prices[i], then cooldown -> jump to i+2, not holding
                action = prices[i] + dfs(i + 2, 0);
            } else {
                // buy today: pay prices[i], now holding
                action = -prices[i] + dfs(i + 1, 1);
            }
            return memo[i][holding] = max(rest, action);
            // same as return max(rest[0], hold[0]);   
        };

        return dfs(0, 0);
    }
};