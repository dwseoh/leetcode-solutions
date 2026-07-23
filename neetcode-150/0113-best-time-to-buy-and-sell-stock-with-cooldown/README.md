# 113. Best Time to Buy and Sell Stock with Cooldown

**Difficulty:** `Medium`  
**Acceptance Rate:** `62.4%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-23  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

---

## Problem

> You are given an array prices where prices[i] is the price of a given stock on the ith day.
Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Example 1:**
```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
```

**Example 2:**
```
Input: prices = [1]
Output: 0
```

**Constraints:**
- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        // memo[i][holding]: best profit from day i onward, given holding state.
        // holding: 0 = not holding, 1 = holding a share.
        vector<vector<int>> memo(n, vector<int>(2, -1));
        // equivalent of having 3 memos for memo_sold, memo_unsold, memo_final

        function<int(int,int)> dfs = [&](int i, int holding) -> int {
            if (i >= n) return 0;                 // no days left, no more profit
            if (memo[i][holding] != -1) return memo[i][holding];

            int rest = dfs(i + 1, holding);       // do nothing today
            int action;
            if (holding) {
                // sell today: gain prices[i], then cooldown -> jump to i+2, not holding
                action = prices[i] + dfs(i + 2, 0);
            } else {
                // buy today: pay prices[i], now holding
                action = -prices[i] + dfs(i + 1, 1);
            }
            return memo[i][holding] = max(rest, action);
            // same as return max(rest[0], hold[0]);   
        };

        return dfs(0, 0);
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
| [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Easy |
| [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) | Medium |
