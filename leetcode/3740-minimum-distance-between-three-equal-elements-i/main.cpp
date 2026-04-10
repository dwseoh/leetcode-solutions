class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        unordered_map<int,vector<int>> freq;
        int min_val = INT_MAX;

        for (int i = 0; i < (int)nums.size(); i++) {
            freq[nums[i]].push_back(i);
        }

        for (const auto& [key, value] : freq) {
            for (int h = 0; h + 2 < (int)value.size(); h++) {
                min_val = min(min_val, 2 * (value[h+2] - value[h]));
            }
        }

        return min_val == INT_MAX ? -1 : min_val;
    }
};
