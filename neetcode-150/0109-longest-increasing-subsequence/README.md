# 109. Longest Increasing Subsequence

**Difficulty:** `Medium`  
**Acceptance Rate:** `59.1%`  
**Topics:** `array` `binary-search` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-increasing-subsequence/)

---

## Problem

> Given an integer array nums, return the length of the longest strictly increasing subsequence.

**Example 1:**
```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```

**Example 2:**
```
Input: nums = [0,1,0,3,2,3]
Output: 4
```

**Example 3:**
```
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

**Constraints:**
- `1 <= nums.length <= 2500`
- `-104 <= nums[i] <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Recursively explore all pathways and use memoization to optimize

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Call helper function with when an element is included or not
2. Repeat until end of list
3. Return max

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n^2)`

---

## Solution

```python
class Solution:

    def lengthOfLIS(self, nums: List[int]) -> int:

        def helper(prev_num,idx):

            if (idx, prev_num) in cache:
                return cache[(idx, prev_num)]

            #print(prev_num,idx)

            if (idx > len(nums)-1):
                return 0

            prev_unchanged_num = prev_num

            to_add = 0
            if prev_num < nums[idx]:
                prev_num = nums[idx]
                to_add = 1

            to_return = max(to_add+helper(prev_num,idx+1),helper(prev_unchanged_num,idx+1))
            #print(to_return)
            cache[(idx,prev_unchanged_num)] = to_return

            return to_return

        cache = {}
        return max(1+helper(nums[0],1),helper(-1001,1))
        

# nums = [9,1,4,2,3,3,7] 

'''
dfs -> whether to inc elemenet vs not -> return length -> max fcn
iterate through the list -> dp to cache 
'''
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
| [Increasing Triplet Subsequence](https://leetcode.com/problems/increasing-triplet-subsequence/) | Medium |
| [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) | Hard |
| [Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Medium |
| [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) | Medium |
| [Minimum ASCII Delete Sum for Two Strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) | Medium |
| [Minimum Number of Removals to Make Mountain Array](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/) | Hard |
| [Find the Longest Valid Obstacle Course at Each Position](https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/) | Hard |
| [Minimum Operations to Make the Array K-Increasing](https://leetcode.com/problems/minimum-operations-to-make-the-array-k-increasing/) | Hard |
| [Longest Ideal Subsequence](https://leetcode.com/problems/longest-ideal-subsequence/) | Medium |
| [Maximum Number of Books You Can Take](https://leetcode.com/problems/maximum-number-of-books-you-can-take/) | Hard |
| [Longest Increasing Subsequence II](https://leetcode.com/problems/longest-increasing-subsequence-ii/) | Hard |
| [Find the Maximum Length of a Good Subsequence II](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii/) | Hard |
| [Find the Maximum Length of a Good Subsequence I](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-i/) | Medium |
| [Find the Maximum Length of Valid Subsequence I](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i/) | Medium |
| [Find the Maximum Length of Valid Subsequence II](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii/) | Medium |
| [Longest Subsequence With Decreasing Adjacent Difference](https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference/) | Medium |
