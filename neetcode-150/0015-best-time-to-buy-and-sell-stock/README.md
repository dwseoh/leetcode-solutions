# 015. Best Time to Buy and Sell Stock

**Difficulty:** `Easy`  
**Acceptance Rate:** `56.4%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-01  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

---

## Problem

> You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

**Constraints:**
- `1 <= prices.length <= 105`
- `0 <= prices[i] <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I first brute forced it by checking every possible pair of days to buy and sell, but that was too slow. Then I realized that I could use a sliding window approach.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initalize ptr1 to 0 and ptr2 to 1
2. While ptr2 is less than the length of the array
3. If the price at ptr1 is less than the price at ptr2, update the maximum profit
4. Else, update ptr1 to ptr2
5. Increment ptr2
6. Return the maximum profit

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:

    int maxProfit(vector<int>& prices) {
        int ptr1 = 0;
        int ptr2 = 1;
        int n = prices.size();
        int maxP = 0;

        while (ptr2<n) {
            if (prices[ptr1] < prices[ptr2]) {
                maxP = max(maxP,prices[ptr2]-prices[ptr1]);
            } else {
                ptr1=ptr2;
            }
            ptr2++;

        }

        return maxP;

    }

    // // brute force
    // int maxProfit(vector<int>& prices) {
    //     int res = 0; int n = prices.size();
    //     for (int i = 0;i<n;i++) {
    //         for (int j=i+1;j<n;j++) {
    //             res = max(res, prices[j]-prices[i]);
    //         }
    //     }

    //     return res;

    // }
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
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Medium |
| [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) | Medium |
| [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) | Hard |
| [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) | Hard |
| [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | Medium |
| [Sum of Beauty in the Array](https://leetcode.com/problems/sum-of-beauty-in-the-array/) | Medium |
| [Maximum Difference Between Increasing Elements](https://leetcode.com/problems/maximum-difference-between-increasing-elements/) | Easy |
| [Maximum Profit From Trading Stocks](https://leetcode.com/problems/maximum-profit-from-trading-stocks/) | Medium |
| [Best Time to Buy and Sell Stock V](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-v/) | Medium |
