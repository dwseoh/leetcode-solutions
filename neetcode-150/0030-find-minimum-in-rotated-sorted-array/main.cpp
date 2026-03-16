class Solution {
public:
    int findMin(vector<int> &nums) {
        int l=0;
        int r=nums.size()-1;
        int mid;

        while (l<r) {
            mid = (r-l)/2+l;

            if (nums[mid]>nums[r]) {
                // mid is in right half
                l=mid+1;
            } else {
                r=mid;
            }

        }

        return nums[l]; // l==r, converged into same index
        // min is always in between [l,r]


    }
};
