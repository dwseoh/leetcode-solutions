# 031. Search in Rotated Sorted Array

**Difficulty:** `Medium`  
**Acceptance Rate:** `44.2%`  
**Topics:** `array` `binary-search`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-17  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/search-in-rotated-sorted-array/)

---

## Problem

> There is an integer array nums sorted in ascending order (with distinct values).
Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].
Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
You must write an algorithm with O(log n) runtime complexity.

**Example 1:**
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**
```
Input: nums = [1], target = 0
Output: -1
```

**Constraints:**
- `1 <= nums.length <= 5000`
- `-104 <= nums[i] <= 104`
- `All values of nums are unique.`
- `nums is an ascending array that is possibly rotated.`
- `-104 <= target <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I noticed this was building off upon #30. My first intuition was to reuse #30 to find the start of the second-half of the array and to perform binary search to find the element with a transformed index. This yielded O(log n) but required two while loops that could have been done with one.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Start with full range
l=0, r=end. Standard binary search setup, but while (l <= r) so we don't miss the last element.
2. Check mid directly
If nums[mid] == target, return immediately.
3. Figure out which half is sorted

If nums[l] <= nums[mid] → left half is cleanly sorted
Otherwise → right half must be cleanly sorted

This is the key insight. The rotation means one side is always "clean."
4. Check if target falls in the sorted half

Left sorted: is nums[l] <= target < nums[mid]? If yes, go left (r = mid-1). Otherwise go right.
Right sorted: is nums[mid] < target <= nums[r]? If yes, go right (l = mid+1). Otherwise go left.

5. Converge or return -1


**Time Complexity:** `O(log n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
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
| [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) | Medium |
| [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Medium |
| [Pour Water Between Buckets to Make Water Levels Equal](https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal/) | Medium |
