# 100. Min Cost Climbing Stairs

**Difficulty:** `Easy`  
**Acceptance Rate:** `68.4%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/min-cost-climbing-stairs/)

---

## Problem

> You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
You can either start from the step with index 0, or the step with index 1.
Return the minimum cost to reach the top of the floor.

**Example 1:**
```
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example 2:**
```
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

**Constraints:**
- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

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
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:

    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int prev2 = cost[0], prev1 = cost[1];
        for (int i = 2; i < n; i++) {
            int cur = cost[i] + min(prev1, prev2);
            prev2 = prev1;
            prev1 = cur;
        }
        return min(prev1, prev2);
    }

    // int minCostClimbingStairs(vector<int>& cost) {
    //     int n = cost.size();
    //     vector<int> memo(n);
    //     memo[0]=cost[0]; memo[1]=cost[1];

    //     for (int i = 2;i<n;i++) {
    //         memo[i] = min(memo[i-1]+cost[i],memo[i-2]+cost[i]);
    //     }

    //     return min(memo[n-1],memo[n-2]);
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
| [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | Easy |
| [Find Number of Ways to Reach the K-th Stair](https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair/) | Hard |
