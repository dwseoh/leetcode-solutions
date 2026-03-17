class Solution {
public:

    // int transform_fwd(vector<int>& nums, int start, int len, int rotated_coord) {
    //     if (rotated_coord>=start) {
    //         return rotated_coord-start;
    //     } else {
    //         return rotated_coord+len-start;
    //     }
    // }

    int transform_bwd(vector<int>& nums, int start, int len, int real_coord) {
        if (real_coord<(len-start)) {
            return real_coord+start;
        } else {
            return real_coord-(len-start);
        }
    }

    int search(vector<int>& nums, int target) {

        

        int len = nums.size();
        int l=0;
        int r=len-1;
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

        int start = l;

        l=0;
        r=len-1;
        int mid_realidx;

        while (l<r) {
            mid = (r-l)/2+l;
            mid_realidx = transform_bwd(nums, start, len, mid);


            if (nums[mid_realidx] == target)
                return mid_realidx;


            if (nums[mid_realidx] < target)
                l = mid + 1;

            else
                r = mid - 1;
        }

        // edge case - while is not ran
        if (nums[transform_bwd(nums, start, len, l)] == target)
        return transform_bwd(nums, start, len, l);

        return -1;
        

    }
};
