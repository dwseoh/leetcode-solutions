class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        if (!nums.size()) return {};

        int start = nums[0];
        int prev = nums[0];
        vector<string> output;

        for (int i = 1;i<nums.size();i++) {
            if (prev+1!=nums[i]) {// flush 
                if (start==prev) output.push_back(to_string(start));
                else output.push_back(to_string(start)+"->"+to_string(prev));
                start = nums[i];
            } prev = nums[i];
        }

        if (start==prev) output.push_back(to_string(start));
        else output.push_back(to_string(start)+"->"+to_string(nums[nums.size()-1]));
            
        return output;
    }
};