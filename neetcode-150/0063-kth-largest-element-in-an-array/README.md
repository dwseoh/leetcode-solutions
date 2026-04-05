# 063. Kth Largest Element in an Array

**Difficulty:** `Medium`  
**Acceptance Rate:** `68.8%`  
**Topics:** `array` `divide-and-conquer` `sorting` `heap` `quickselect`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-05  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/kth-largest-element-in-an-array/)

---

## Problem

> Given an integer array nums and an integer k, return the kth largest element in the array.
Note that it is the kth largest element in the sorted order, not the kth distinct element.
Can you solve it without sorting?

**Example 1:**
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

**Example 2:**
```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

**Constraints:**
- `1 <= k <= nums.length <= 105`
- `-104 <= nums[i] <= 104`

---

## Intuition

Note: worth investigating quicksort more. 
<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
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
```
---

## Alternative Approaches

### Approach 2: [Name]
<!-- Briefly describe trade-offs vs your main approach -->

```cpp


```

**Time:** `O()` | **Space:** `O()`

---

## Edge Cases

- [ ] Empty input
- [ ] Single element
- [ ] All duplicates
- [ ] Negative numbers
- [ ] Max constraints

---

## Notes & Mistakes

<!-- What tripped you up? What would you do differently next time? -->


---

## Related Problems

| Title | Difficulty |
|-------|------------|
| [Wiggle Sort II](https://leetcode.com/problems/wiggle-sort-ii/) | Medium |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium |
| [Third Maximum Number](https://leetcode.com/problems/third-maximum-number/) | Easy |
| [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Easy |
| [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) | Medium |
| [Find the Kth Largest Integer in the Array](https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/) | Medium |
| [Find Subsequence of Length K With the Largest Sum](https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/) | Easy |
| [K Highest Ranked Items Within a Price Range](https://leetcode.com/problems/k-highest-ranked-items-within-a-price-range/) | Medium |
