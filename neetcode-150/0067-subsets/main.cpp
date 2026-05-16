class Solution {
public:
    vector<vector<int>> res;

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> cur;
        dfs(nums, cur, 0);
        return res;
    }
    
    void dfs(vector<int>& nums, vector<int>& cur, int idx) {
        res.push_back(cur);
        for (int i = idx; i < nums.size(); i++) {
            cur.push_back(nums[i]);
            dfs(nums, cur, i + 1);
            cur.pop_back();
        }
    }
};

/*
dfs(idx=0, cur=[])           → record []
  i=0: cur=[1]
    dfs(idx=1, cur=[1])      → record [1]
      i=1: cur=[1,2]
        dfs(idx=2, cur=[1,2]) → record [1,2]
          i=2: cur=[1,2,3]
            dfs(idx=3)        → record [1,2,3]
          pop → [1,2]
      pop → [1]
      i=2: cur=[1,3]
        dfs(idx=3)            → record [1,3]
      pop → [1]
  pop → []
  i=1: cur=[2]
    ...

*/
