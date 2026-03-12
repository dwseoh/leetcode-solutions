# 125. House Robber

**Difficulty:** `Medium`  
**Acceptance Rate:** `53%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/house-robber/)

---

## Problem

> You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 2:**
```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I understood it was a recursion question, but then realized I needed to implement dynamic programming / memoization.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Recursively track all possible choices and return max
2. Have one dictionary to cache already called functions
3. Return max

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
# Solution 3 (better memoization)

class Solution:

    def rob(self, nums: List[int]) -> int:
        dp = {}

        def helper(idx):
            if idx in dp:
                return dp[idx]

            if idx >= len(nums):
                return 0

            dp[idx] = max(nums[idx] + helper(idx + 2), helper(idx + 1))
            return dp[idx]

        return max(helper(0), helper(1))
    

# Solution 2 (caching implemented)
        
'''
class Solution:

    def rob(self, nums: List[int]) -> int:
        
        def helper(lis, idx, dp):
            if idx >= len(lis):
                return 0
            if idx+2 in dp:
                res1 = dp[idx+2]
            else:
                res1 = helper(lis,idx+2,dp)
                dp[idx+2] = res1

            if idx+1 in dp:
                res2 = dp[idx+1]
            else:
                res2 = helper(lis,idx+1,dp)
                dp[idx+1] = res2

            return max(lis[idx] + res1, res2)

        return max(helper(nums, 0, {}), helper(nums, 1, {}))
        

'''

# Solution 1 (no caching - hit time limit)

'''
class Solution:

    def rob(self, nums: List[int]) -> int:
        def helper(lis, idx):
            if idx >= len(lis):
                return 0
            return max(lis[idx] + helper(lis, idx + 2), helper(lis, idx + 1))

        return max(helper(nums, 0), helper(nums, 1))
        
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
| [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | Medium |
| [House Robber II](https://leetcode.com/problems/house-robber-ii/) | Medium |
| [Paint House](https://leetcode.com/problems/paint-house/) | Medium |
| [Paint Fence](https://leetcode.com/problems/paint-fence/) | Medium |
| [House Robber III](https://leetcode.com/problems/house-robber-iii/) | Medium |
| [Non-negative Integers without Consecutive Ones](https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/) | Hard |
| [Coin Path](https://leetcode.com/problems/coin-path/) | Hard |
| [Delete and Earn](https://leetcode.com/problems/delete-and-earn/) | Medium |
| [Solving Questions With Brainpower](https://leetcode.com/problems/solving-questions-with-brainpower/) | Medium |
| [Count Number of Ways to Place Houses](https://leetcode.com/problems/count-number-of-ways-to-place-houses/) | Medium |
| [House Robber IV](https://leetcode.com/problems/house-robber-iv/) | Medium |
| [Mice and Cheese](https://leetcode.com/problems/mice-and-cheese/) | Medium |
| [Largest Element in an Array after Merge Operations](https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations/) | Medium |
| [House Robber V](https://leetcode.com/problems/house-robber-v/) | Medium |
