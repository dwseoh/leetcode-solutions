class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int target_sum = 0;
        for (const int num: nums) target_sum += num;
        if (target_sum%2) return false; // no partition possible
        target_sum /= 2; // we only care if we can find the target 
        vector<bool> dp(target_sum+1,false);
        dp[0] = true; 

        // 2d would be dp[i][j] = "using only the first i numbers, can I make sum j?"


        for (const int num: nums) { // now that num is given, what new sums are reachable? 
            for (int j = target_sum; j>=num; j--) {
                dp[j] = dp[j] || dp[j - num]; // ORing to see if its possible to make num by using the current num
            } // counting down
        }

        return dp[target_sum];

    }
};
