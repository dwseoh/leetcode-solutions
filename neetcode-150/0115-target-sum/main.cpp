class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {

        int n = nums.size();
        int totalsum = accumulate(nums.begin(), nums.end(), 0);
        int a = totalsum*2+1; // range is -cursum to cursum 
        vector<vector<int>> memo(n,vector<int> (a,-1));

        function<int(int, int)> dfs= [&](int idx, int cursum) -> int {
            if (idx==n) return cursum==target;
            if (memo[idx][cursum+totalsum] != -1) return memo[idx][cursum+totalsum];
            return memo[idx][cursum+totalsum] = dfs(idx+1,cursum-nums[idx])+dfs(idx+1,cursum+nums[idx]);
        };

        return dfs(0,0);
    }
};
