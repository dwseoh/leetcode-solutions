class Solution {
public:

    vector<vector<int>> res;

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<int> cur;
        sort(nums.begin(), nums.end());
        dfs(nums, cur, 0);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& cur, int idx) {
        res.push_back(cur);
        for (int i = idx; i < nums.size(); i++) {
            if (i > idx && nums[i] == nums[i-1]) continue;
            cur.push_back(nums[i]);
            dfs(nums, cur, i + 1);
            cur.pop_back();
        }
    }
};