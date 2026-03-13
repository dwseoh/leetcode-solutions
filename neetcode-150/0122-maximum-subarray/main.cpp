class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size();
        int cursum = nums[0];
        int maxsum = nums[0];

        for (int i = 1; i < n; i++) {
            if (nums[i] > cursum + nums[i]) {
                cursum = nums[i];
            } else {
                cursum += nums[i];
            }

            if (cursum>maxsum) maxsum = cursum;
        }

        return maxsum;
    }
};
