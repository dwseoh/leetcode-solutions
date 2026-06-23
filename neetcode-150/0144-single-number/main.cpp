class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res{};
        for (const auto& num: nums) {
            res = res^num;
        }
        return res;
    }
};
