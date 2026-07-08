class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // dp[i] = min coins to make amount i.
        // Seed every cell with amount+1, a value larger than any real answer
        // (you can never use more than `amount` coins, since the smallest coin is >= 1).
        // This lets us skip explicit "impossible" guards and avoids INT_MAX overflow.
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;  // zero coins to make amount 0

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
};

// class Solution {
// public:
//     int coinChange(vector<int>& coins, int amount) {

//         vector<int> ways(amount+1,-1);
//         ways[0] = 0; 

//         for (int i = 1; i<=amount; i++) {
//             int minima = INT_MAX;
//             for (const int &coin: coins) {
//                 if (i-coin>=0 && ways[i-coin] != -1) {
//                     minima = min(minima, ways[i-coin]+1);
//                 }
//             }
//             ways[i] = minima==INT_MAX? -1: minima;
//         }

//         return ways[amount];
//     }
// };
