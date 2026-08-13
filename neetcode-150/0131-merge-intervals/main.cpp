class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (auto& iv : intervals) {
            if (res.empty() || res.back()[1] < iv[0]) {
                res.push_back(iv);
            } else {
                res.back()[1] = max(res.back()[1], iv[1]);
            }
        }
        return res;
    }
};
