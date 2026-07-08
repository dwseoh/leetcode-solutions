# 106. Coin Change

**Difficulty:** `Medium`  
**Acceptance Rate:** `48.7%`  
**Topics:** `array` `dynamic-programming` `bfs`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/coin-change/)

---

## Problem

> You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.

**Example 1:**
```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

**Example 2:**
```
Input: coins = [2], amount = 3
Output: -1
```

**Example 3:**
```
Input: coins = [1], amount = 0
Output: 0
```

**Constraints:**
- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 231 - 1`
- `0 <= amount <= 104`

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
    int coinChange(vector<int>& coins, int amount) {
        // dp[i] = min coins to make amount i.
        // Seed every cell with amount+1, a value larger than any real answer
        // (you can never use more than `amount` coins, since the smallest coin is >= 1).
        // This lets us skip explicit "impossible" guards and avoids INT_MAX overflow.
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;  // zero coins to make amount 0

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
};

// class Solution {
// public:
//     int coinChange(vector<int>& coins, int amount) {

//         vector<int> ways(amount+1,-1);
//         ways[0] = 0; 

//         for (int i = 1; i<=amount; i++) {
//             int minima = INT_MAX;
//             for (const int &coin: coins) {
//                 if (i-coin>=0 && ways[i-coin] != -1) {
//                     minima = min(minima, ways[i-coin]+1);
//                 }
//             }
//             ways[i] = minima==INT_MAX? -1: minima;
//         }

//         return ways[amount];
//     }
// };
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
| [Minimum Cost For Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/) | Medium |
| [Maximum Value of K Coins From Piles](https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/) | Hard |
| [Minimum Number of Operations to Convert Time](https://leetcode.com/problems/minimum-number-of-operations-to-convert-time/) | Easy |
| [Minimum Cost to Split an Array](https://leetcode.com/problems/minimum-cost-to-split-an-array/) | Hard |
| [Count of Sub-Multisets With Bounded Sum](https://leetcode.com/problems/count-of-sub-multisets-with-bounded-sum/) | Hard |
| [Length of the Longest Subsequence That Sums to Target](https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target/) | Medium |
| [Minimum Number of Coins to be Added](https://leetcode.com/problems/minimum-number-of-coins-to-be-added/) | Medium |
| [Most Expensive Item That Can Not Be Bought](https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought/) | Medium |
| [Inverse Coin Change](https://leetcode.com/problems/inverse-coin-change/) | Medium |
