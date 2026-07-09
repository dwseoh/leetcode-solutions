class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int maxEndingHere = nums[0], minEndingHere = nums[0], ans = nums[0];
        for (int i = 1; i < n; i++) {
            int x = nums[i];
            int a = maxEndingHere * x, b = minEndingHere * x;
            maxEndingHere = max({x, a, b});
            minEndingHere = min({x, a, b});
            ans = max(ans, maxEndingHere);
        }
        return ans;
    }
};
