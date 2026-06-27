# 146. Counting Bits

**Difficulty:** `Easy`  
**Acceptance Rate:** `80.7%`  
**Topics:** `dynamic-programming` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-27  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/counting-bits/)

---

## Problem

> Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

**Example 1:**
```
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
```

**Example 2:**
```
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

**Constraints:**
- `It is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n) and possibly in a single pass?`
- `Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?`

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
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++)
            dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
};

// class Solution {
// public:
//     vector<int> countBits(int n) {
//         vector<int> dp(n + 1);   // dp[0] = 0
//         int offset = 1;          // largest power of 2 <= i
//         for (int i = 1; i <= n; i++) {
//             if (offset * 2 == i) offset *= 2;
//             dp[i] = dp[i - offset] + 1;
//         }
//         return dp;
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
| [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) | Easy |
| [Sum of Values at Indices With K Set Bits](https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits/) | Easy |
| [Find the K-or of an Array](https://leetcode.com/problems/find-the-k-or-of-an-array/) | Easy |
