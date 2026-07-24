# 114. Coin Change II

**Difficulty:** `Medium`  
**Acceptance Rate:** `59.5%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/coin-change-ii/)

---

## Problem

> You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.
You may assume that you have an infinite number of each kind of coin.
The final answer is guaranteed to fit into a signed 32-bit integer.

**Example 1:**
```
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

**Example 2:**
```
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
```

**Example 3:**
```
Input: amount = 10, coins = [10]
Output: 1
```

**Constraints:**
- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- `All the values of coins are unique.`
- `0 <= amount <= 5000`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<int> dp(amount+1,0); 
        dp[0] = 1;

        for (int i = 0; i<n; i++) {
            for (int j = coins[i]; j<=amount; j++) {
                dp[j] += (dp[j-coins[i]]);
            }
        }

        return dp[amount];
    }

    // brute force is dfs deciding whether to choose or not 
};

/*

Counting Permutations Instead of Combinations
Iterating over amounts in the outer loop and coins in the inner loop counts permutations (order matters), not combinations. This causes [1,2] and [2,1] to be counted as different ways.

# Wrong: Counts permutations
for a in range(1, amount + 1):
    for coin in coins:
        dp[a] += dp[a - coin]

# Correct: Counts combinations (coins in outer loop)
for coin in coins:
    for a in range(coin, amount + 1):
        dp[a] += dp[a - coin]

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
| [Maximum Value of K Coins From Piles](https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/) | Hard |
| [Number of Ways to Earn Points](https://leetcode.com/problems/number-of-ways-to-earn-points/) | Hard |
| [Count of Sub-Multisets With Bounded Sum](https://leetcode.com/problems/count-of-sub-multisets-with-bounded-sum/) | Hard |
| [Length of the Longest Subsequence That Sums to Target](https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target/) | Medium |
| [The Number of Ways to Make the Sum](https://leetcode.com/problems/the-number-of-ways-to-make-the-sum/) | Medium |
| [Inverse Coin Change](https://leetcode.com/problems/inverse-coin-change/) | Medium |
