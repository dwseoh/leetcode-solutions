# 145. Number of 1 Bits

**Difficulty:** `Easy`  
**Acceptance Rate:** `77%`  
**Topics:** `divide-and-conquer` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/number-of-1-bits/)

---

## Problem

> Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).

**Example 1:**
```
Input: n = 11
Output: 3
Explanation:
The input binary string 1011 has a total of three set bits.
```

**Example 2:**
```
Input: n = 128
Output: 1
Explanation:
The input binary string 10000000 has a total of one set bit.
```

**Example 3:**
```
Input: n = 2147483645
Output: 30
Explanation:
The input binary string 1111111111111111111111111111101 has a total of thirty set bits.
```

**Constraints:**
- `1 <= n <= 231 - 1`

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
    int hammingWeight(uint32_t n) {
        int res{};
        for (int i=0;i<32;i++) {
            if ((1<<i) & n) res++;
        }

        return res;
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
| [Reverse Bits](https://leetcode.com/problems/reverse-bits/) | Easy |
| [Power of Two](https://leetcode.com/problems/power-of-two/) | Easy |
| [Counting Bits](https://leetcode.com/problems/counting-bits/) | Easy |
| [Binary Watch](https://leetcode.com/problems/binary-watch/) | Easy |
| [Hamming Distance](https://leetcode.com/problems/hamming-distance/) | Easy |
| [Binary Number with Alternating Bits](https://leetcode.com/problems/binary-number-with-alternating-bits/) | Easy |
| [Prime Number of Set Bits in Binary Representation](https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/) | Easy |
| [Convert Date to Binary](https://leetcode.com/problems/convert-date-to-binary/) | Easy |
