class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<int> dp(amount+1,0); 
        dp[0] = 1;

        for (int i = 0; i<n; i++) {
            for (int j = coins[i]; j<=amount; j++) {
                dp[j] += (dp[j-coins[i]]);
            }
        }

        return dp[amount];
    }

    // brute force is dfs deciding whether to choose or not 
};

/*

Counting Permutations Instead of Combinations
Iterating over amounts in the outer loop and coins in the inner loop counts permutations (order matters), not combinations. This causes [1,2] and [2,1] to be counted as different ways.

# Wrong: Counts permutations
for a in range(1, amount + 1):
    for coin in coins:
        dp[a] += dp[a - coin]

# Correct: Counts combinations (coins in outer loop)
for coin in coins:
    for a in range(coin, amount + 1):
        dp[a] += dp[a - coin]

*/
