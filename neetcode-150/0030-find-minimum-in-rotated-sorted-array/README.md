# 030. Find Minimum in Rotated Sorted Array

**Difficulty:** `Medium`  
**Acceptance Rate:** `53.9%`  
**Topics:** `array` `binary-search`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-16  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

---

## Problem

> Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
[4,5,6,7,0,1,2] if it was rotated 4 times.
	[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
Given the sorted rotated array nums of unique elements, return the minimum element of this array.
You must write an algorithm that runs in O(log n) time.

**Example 1:**
```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

**Example 3:**
```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `All the integers of nums are unique.`
- `nums is sorted and rotated between 1 and n times.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I thought of the brute force solution first.

Then I realized I can implement it with binary search. Initially, I was just comparing if the differences in indexes of l&middle is the same as nums[l]&nums[middle] (and same with right & middle) with the end goal to find the splitting index to compute the minimum. But the problem is that the array isn't guaranteed to have consecutive integers.

Therefore another approach was used. Since for l,middle,r , at least two of them are in the same subarray at a time, I can compare where mid is part of (first half or second half) and then advance the pointer accordingly. Eventually, l==r; it converges, and that is the index of the minimum element.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initalize binary search (l,r,middle)
2. Define middle based on (r-l)/2+l each loop while left<right (didn't converge yet)
3. If the middle belongs to the second half, advance left to middle + 1. Otherwise advance right to middle
4. Repeat until convergence, then return mid[l] to get the answer. 

**Time Complexity:** `O(log n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
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
| [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Medium |
| [Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/) | Hard |
