# 070. Climbing Stairs

**Difficulty:** `Easy`  
**Acceptance Rate:** `54.1%`  
**Topics:** `math` `dynamic-programming` `memoization`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/climbing-stairs/)

---

## Problem

> You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

**Constraints:**
- `1 <= n <= 45`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int helper(int n, vector<int>& memo) {
        if (n == 0) return 1;
        if (n < 0) return 0;
        if (memo[n] != -1) return memo[n];
        return memo[n] = helper(n-1, memo) + helper(n-2, memo);
    }

    int climbStairs(int n) {
        vector<int> memo(n+1, -1);
        return helper(n, memo);
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
| [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/) | Easy |
| [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) | Easy |
| [N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number/) | Easy |
| [Minimum Rounds to Complete All Tasks](https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/) | Medium |
| [Count Number of Ways to Place Houses](https://leetcode.com/problems/count-number-of-ways-to-place-houses/) | Medium |
| [Number of Ways to Reach a Position After Exactly k Steps](https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/) | Medium |
| [Count Ways To Build Good Strings](https://leetcode.com/problems/count-ways-to-build-good-strings/) | Medium |
| [Frog Jump II](https://leetcode.com/problems/frog-jump-ii/) | Medium |
| [Find Number of Ways to Reach the K-th Stair](https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair/) | Hard |
| [The Number of Ways to Make the Sum](https://leetcode.com/problems/the-number-of-ways-to-make-the-sum/) | Medium |
