# 003. Two Sum

**Difficulty:** `Easy`  
**Acceptance Rate:** `57%`  
**Topics:** `array` `hash-map`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/two-sum/)

---

## Problem

> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**
- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- `Only one valid answer exists.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Use two pointers to iterate through the array and check if the sum of the two pointers equals the target. However, I realized the list has to be sorted first, which would take O(n log n) time. But then I would need to track the original indices of the elements, which would take O(n) space. So I thought of another approach.

I used hash table to store the elements of the array and their indices. Then I iterate through the array and check if the difference between the target and the current element is in the hash table. If it is, then I return the indices of the current element and the element in the hash table. Otherwise, I add the current element and its index to the hash table.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Create a hash table to store the elements of the array and their indices.
2. Iterate through the array and check if the difference between the target and the current element is in the hash table.
3. If it is, then return the indices of the current element and the element in the hash table.
4. Otherwise, add the current element and its index to the hash table.

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        record = {}

        for i in range(len(nums)):
            diff = target - nums[i]

            if diff in record:
                return [record[diff],i]
            
            record[nums[i]] = i
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
| [3Sum](https://leetcode.com/problems/3sum/) | Medium |
| [4Sum](https://leetcode.com/problems/4sum/) | Medium |
| [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Medium |
| [Two Sum III - Data structure design](https://leetcode.com/problems/two-sum-iii-data-structure-design/) | Easy |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium |
| [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/) | Easy |
| [Two Sum Less Than K](https://leetcode.com/problems/two-sum-less-than-k/) | Easy |
| [Max Number of K-Sum Pairs](https://leetcode.com/problems/max-number-of-k-sum-pairs/) | Medium |
| [Count Good Meals](https://leetcode.com/problems/count-good-meals/) | Medium |
| [Count Number of Pairs With Absolute Difference K](https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k/) | Easy |
| [Number of Pairs of Strings With Concatenation Equal to Target](https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target/) | Medium |
| [Find All K-Distant Indices in an Array](https://leetcode.com/problems/find-all-k-distant-indices-in-an-array/) | Easy |
| [First Letter to Appear Twice](https://leetcode.com/problems/first-letter-to-appear-twice/) | Easy |
| [Number of Excellent Pairs](https://leetcode.com/problems/number-of-excellent-pairs/) | Hard |
| [Number of Arithmetic Triplets](https://leetcode.com/problems/number-of-arithmetic-triplets/) | Easy |
| [Node With Highest Edge Score](https://leetcode.com/problems/node-with-highest-edge-score/) | Medium |
| [Check Distances Between Same Letters](https://leetcode.com/problems/check-distances-between-same-letters/) | Easy |
| [Find Subarrays With Equal Sum](https://leetcode.com/problems/find-subarrays-with-equal-sum/) | Easy |
| [Largest Positive Integer That Exists With Its Negative](https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/) | Easy |
| [Number of Distinct Averages](https://leetcode.com/problems/number-of-distinct-averages/) | Easy |
| [Count Pairs Whose Sum is Less than Target](https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/) | Easy |
