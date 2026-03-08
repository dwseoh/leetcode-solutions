# 027. Binary Search

**Difficulty:** `Easy`  
**Acceptance Rate:** `60.6%`  
**Topics:** `array` `binary-search`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/binary-search/)

---

## Problem

> Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.
You must write an algorithm with O(log n) runtime complexity.

**Example 1:**
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

**Example 2:**
```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

**Constraints:**
- `1 <= nums.length <= 104`
- `-104 < nums[i], target < 104`
- `All the integers in nums are unique.`
- `nums is sorted in ascending order.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Classic binary search

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size()-1;

        while (left<=right) {
            int mid = left + (right - left) / 2;

            if (nums[mid]==target) return mid;
            else if (nums[mid]>target) {
                right = mid-1;
            } else {
                left = mid+1;
            }

        }

        return -1;
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
| [Search in a Sorted Array of Unknown Size](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/) | Medium |
| [Maximum Count of Positive Integer and Negative Integer](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/) | Easy |
