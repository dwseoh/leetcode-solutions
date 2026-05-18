class Solution {
public:

    vector<vector<int>> res;

    vector<vector<int>> combinationSum(vector<int>& nums, int target) {
        vector<int> cur;
        dfs(nums,cur,target,0,0);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& cur, int target, int cursum, int idx) {
        if (cursum==target) {
            res.push_back(cur);
            return;
        }

        if (cursum>target) return;

        for (int i = idx; i < nums.size(); i++) {
            cur.push_back(nums[i]);
            dfs(nums, cur, target, cursum+nums[i], i);
            cur.pop_back();
        }
    }
        
};
