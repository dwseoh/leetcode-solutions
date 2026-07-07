# 149. Sum of Two Integers

**Difficulty:** `Medium`  
**Acceptance Rate:** `55.7%`  
**Topics:** `math` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-07  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/sum-of-two-integers/)

---

## Problem

> Given two integers a and b, return the sum of the two integers without using the operators + and -.

**Example 1:**
```
Input: a = 1, b = 2
Output: 3
```

**Example 2:**
```
Input: a = 2, b = 3
Output: 5
```

**Constraints:**
- `-1000 <= a, b <= 1000`

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
    int getSum(int a, int b) {
        while (b != 0) {
            unsigned carry = (unsigned)(a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};

// class Solution {
// public:
//     int getSum(int a, int b) {
//         int c = 0;
//         int res = 0;
//         for (int i = 0; i<32; i++) {
//             int bit = (a&1)+(b&1)+c;
//             res |= ((bit&1)<<i);
//             a>>=1; b>>=1;
//             c = (bit>>1)&1;
//         }
//         return res;
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
| [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) | Medium |
