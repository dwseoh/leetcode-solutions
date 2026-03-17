class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int mid = (r - l) / 2 + l;

            if (nums[mid] == target) return mid;

            // left half is sorted
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid])
                    r = mid - 1;
                else
                    l = mid + 1;
            }
            // right half is sorted
            else {
                if (nums[mid] < target && target <= nums[r])
                    l = mid + 1;
                else
                    r = mid - 1;
            }
        }

        return -1;
    }
};

/*

## The idea

In a rotated array, when you pick `mid`, **at least one of the two halves is guaranteed to be sorted**. You just figure out which one, check if target falls in that range, and binary search into it.
```
[4, 5, 6, 7, 0, 1, 2]
 l        m        r

nums[l]=4 <= nums[mid]=7 → left half [4..7] is sorted
Is target in [4,7)? If yes → go left. If no → go right.
*/