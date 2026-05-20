class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;

        dfs({},nums,res,nums.size());
        return res;
    }

    void dfs(vector<int> used, vector<int> unused,
         vector<vector<int>>& res, int size) {
        if (used.size() == size) {
            res.push_back(used);
            return;
        }
        for (int i = 0; i < unused.size(); i++) {
            int tmp = unused[i];
            unused.erase(unused.begin() + i);
            used.push_back(tmp);
            dfs(used, unused, res, size);
            used.pop_back();
            unused.insert(unused.begin() + i, tmp);
        }
    }
};
