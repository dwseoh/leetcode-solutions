class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int ptr1 = 0;
        int ptr2; int ptr3;
        int curr;

        sort(nums.begin(), nums.end());

        vector<vector<int>> output;

        while (ptr1 < nums.size()-2) {
            ptr2 = ptr1+1;
            ptr3 = nums.size()-1;
            curr = -1;

            while (ptr2<ptr3) {
                if (nums[ptr1] + nums[ptr2] + nums[ptr3] == 0) {
                    output.push_back({nums[ptr1],nums[ptr2],nums[ptr3]});
                    while (ptr2 < ptr3 && nums[ptr2] == nums[ptr2+1]) ptr2++;
                    while (ptr2 < ptr3 && nums[ptr3] == nums[ptr3-1]) ptr3--;
                    ptr2++; ptr3--;
                }
                else if (nums[ptr2] + nums[ptr3] < -nums[ptr1]) {
                    ptr2++;
                } else {
                    ptr3--;
                }
            }

            while (ptr1 < nums.size()-2 && nums[ptr1] == nums[ptr1+1]) ptr1++;
            ptr1++;
        }

        return output;

    }
};
