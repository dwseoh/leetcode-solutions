class Solution {
public:

    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int prev2 = cost[0], prev1 = cost[1];
        for (int i = 2; i < n; i++) {
            int cur = cost[i] + min(prev1, prev2);
            prev2 = prev1;
            prev1 = cur;
        }
        return min(prev1, prev2);
    }

    // int minCostClimbingStairs(vector<int>& cost) {
    //     int n = cost.size();
    //     vector<int> memo(n);
    //     memo[0]=cost[0]; memo[1]=cost[1];

    //     for (int i = 2;i<n;i++) {
    //         memo[i] = min(memo[i-1]+cost[i],memo[i-2]+cost[i]);
    //     }

    //     return min(memo[n-1],memo[n-2]);
    // }
};
