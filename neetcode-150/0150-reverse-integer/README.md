# 150. Reverse Integer

**Difficulty:** `Medium`  
**Acceptance Rate:** `32.1%`  
**Topics:** `math`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-07  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/reverse-integer/)

---

## Problem

> Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

**Example 1:**
```
Input: x = 123
Output: 321
```

**Example 2:**
```
Input: x = -123
Output: -321
```

**Example 3:**
```
Input: x = 120
Output: 21
```

**Constraints:**
- `-231 <= x <= 231 - 1`

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
    int reverse(int x) {
        int res = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            // overflow checks before res = res * 10 + digit
            if (res > INT_MAX / 10 || (res == INT_MAX / 10 && digit > 7)) return 0;
            if (res < INT_MIN / 10 || (res == INT_MIN / 10 && digit < -8)) return 0;
            res = res * 10 + digit;
        }
        return res;
    }
};

// INT_MAX =  2147483647   ← ends in 7
// INT_MIN = -2147483648   ← ends in 8
// overflow edge case
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
| [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) | Medium |
| [Reverse Bits](https://leetcode.com/problems/reverse-bits/) | Easy |
| [A Number After a Double Reversal](https://leetcode.com/problems/a-number-after-a-double-reversal/) | Easy |
| [Count Number of Distinct Integers After Reverse Operations](https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations/) | Medium |
