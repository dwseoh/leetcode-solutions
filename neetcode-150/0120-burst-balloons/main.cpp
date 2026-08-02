class Solution {
public:
    int maxCoins(vector<int>& nums) {
        nums.emplace(nums.begin(),1);
        nums.push_back(1);
        int n = nums.size();
        vector<vector<int>> dp(n,vector<int>(n,-1));

        // dp[i][j] = best possibility b/w left window i and right window j.
        // this expands to dp[i][k]+dp[k][j]+dp[i]*dp[k]*dp[j]
        // the trick is to think of k as the last element we're gonna remove where i & j are just boundaries
        // if that's the case then the remaining list is only [nums[i],nums[k],nums[j]]. then we go backwards
        // and insert elements in between i,k and k,j

        // dp[left][right] = max over all k in (left, right) of:
        // dp[left][k] + dp[k][right] + nums[left]*nums[k]*nums[right]

        function<int(int,int)> dfs = [&](int l, int r) -> int {
            if (dp[l][r] != -1) return dp[l][r];

            int res = 0;
            for (int i = l+1; i<r; i++) {
                res = max(res,dfs(l,i)+dfs(i,r)+nums[l]*nums[i]*nums[r]);
            }
            
            return dp[l][r] = res;
        };

        return dfs(0,n-1);

    }
};
