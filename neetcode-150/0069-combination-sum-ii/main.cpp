class Solution {
public:

    vector<vector<int>> res;

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<int> cur;
        sort(candidates.begin(), candidates.end());
        dfs(candidates,cur,target,0,0);
        return res;   
    }

    void dfs(vector<int>& nums, vector<int>& cur, int target, int cursum, int idx) {
        if (cursum==target) {
            res.push_back(cur);
            return;
        }

        if (cursum>target) return;

        for (int i = idx; i < nums.size(); i++) {
            if (i > idx && nums[i] == nums[i-1]) continue;
            cur.push_back(nums[i]);
            dfs(nums, cur, target, cursum+nums[i], i+1);
            cur.pop_back();
        }
    }
};

