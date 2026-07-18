# 142. Multiply Strings

**Difficulty:** `Medium`  
**Acceptance Rate:** `44.5%`  
**Topics:** `math` `string` `simulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-18  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/multiply-strings/)

---

## Problem

> Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.
Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

**Example 1:**
```
Input: num1 = "2", num2 = "3"
Output: "6"
```

**Example 2:**
```
Input: num1 = "123", num2 = "456"
Output: "56088"
```

**Constraints:**
- `1 <= num1.length, num2.length <= 200`
- `num1 and num2 consist of digits only.`
- `Both num1 and num2 do not contain any leading zero, except the number 0 itself.`

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
**Space Complexity:** `O(1)`

---

## Solution

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if "0" in [num1,num2]:
            return "0"

        res = [0] * (len(num1) + len(num2))
        num1, num2 = num1[::-1],num2[::-1]

        for i1 in range(len(num1)):
            for i2 in range(len(num2)):
                prod = int(num1[i1])*int(num2[i2])
                res[i1 + i2] += prod
                res[i1+i2+1] += res[i1+i2]//10 # carry
                res[i1+i2] %= 10

        res, beg = res[::-1],0
        while beg < len(res) and res[beg] == 0:
            beg += 1

        res = map(str,res[beg:])
        return "".join(res)
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
| [Plus One](https://leetcode.com/problems/plus-one/) | Easy |
| [Add Binary](https://leetcode.com/problems/add-binary/) | Easy |
| [Add Strings](https://leetcode.com/problems/add-strings/) | Easy |
| [Apply Discount to Prices](https://leetcode.com/problems/apply-discount-to-prices/) | Medium |
