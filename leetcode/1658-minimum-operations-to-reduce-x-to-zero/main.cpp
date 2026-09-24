class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int target = accumulate(nums.begin(), nums.end(), 0) - x;
        if (target < 0) return -1;

        int l = 0, sum = 0, max_len = target == 0 ? 0 : -1;

        for (int r = 0; r<nums.size(); r++) {
            sum += nums[r];

            while (sum>target) {
                sum -= nums[l++];
            }            

            if (sum==target) {
                max_len = max(max_len, r-l+1);
            }
        }
        
        return max_len==-1 ? -1 : nums.size()-max_len;
        
    }
};