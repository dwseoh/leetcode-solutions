# 147. Reverse Bits

**Difficulty:** `Easy`  
**Acceptance Rate:** `68.7%`  
**Topics:** `divide-and-conquer` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-27  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/reverse-bits/)

---

## Problem

> Reverse bits of a given 32 bits signed integer.

**Example 1:**
```
Input: n = 43261596
Output: 964176192
Explanation:
```

**Example 2:**
```
Input: n = 2147483644
Output: 1073741822
Explanation:
```

**Constraints:**
- `0 <= n <= 231 - 2`
- `n is even.`

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
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>= 1;
        }
        return res;
    }
};

// class Solution {
// public:
//     uint32_t reverseBits(uint32_t n) {
//         uint32_t res{};
//         for (int i = 0; i<32;i++) {
//             if ((n<<i)&(0x80000000)) {
//                 res +=  (1u << i);
//             }
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
| [Reverse Integer](https://leetcode.com/problems/reverse-integer/) | Medium |
| [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) | Easy |
| [A Number After a Double Reversal](https://leetcode.com/problems/a-number-after-a-double-reversal/) | Easy |
