// min-heap
// class Solution {
// public:
//     int findKthLargest(vector<int>& nums, int k) {
//         priority_queue<int, vector<int>, greater<int>> minHeap;

//         for (auto &num: nums) {
//             minHeap.push(num);

//             if (minHeap.size()>k) minHeap.pop();

//         }

//         return minHeap.top();
//     }
// };


// quick select
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        k = nums.size() - k; // convert to kth smallest
        return quickselect(nums, 0, nums.size() - 1, k);
    }

private:
    int quickselect(vector<int>& nums, int lo, int hi, int k) {
        int pivot = nums[hi];
        int p = lo;
        for (int i = lo; i < hi; i++) {
            if (nums[i] <= pivot) {
                swap(nums[i], nums[p]);
                p++;
            }
        }
        swap(nums[p], nums[hi]);

        if (p == k) return nums[p];
        else if (p < k) return quickselect(nums, p + 1, hi, k);
        else return quickselect(nums, lo, p - 1, k);
    }
};