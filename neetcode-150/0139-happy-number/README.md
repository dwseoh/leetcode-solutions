# 139. Happy Number

**Difficulty:** `Easy`  
**Acceptance Rate:** `59.9%`  
**Topics:** `hash-map` `math` `two-pointers`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/happy-number/)

---

## Problem

> Write an algorithm to determine if a number n is happy.
A happy number is a number defined by the following process:
Starting with any positive integer, replace the number by the sum of the squares of its digits.
	Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
	Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

**Example 1:**
```
Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

**Example 2:**
```
Input: n = 2
Output: false
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

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> seen;

        while (n != 1 && !seen.count(n)) {
            seen.insert(n);
            
            int res = 0;
            int tmp = n;

            while (tmp != 0) {
                int digit = tmp % 10;
                res += digit * digit;
                tmp /= 10;
            }

            n = res;
        }

        return n == 1;
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
| [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) | Easy |
| [Add Digits](https://leetcode.com/problems/add-digits/) | Easy |
| [Ugly Number](https://leetcode.com/problems/ugly-number/) | Easy |
| [Sum of Digits of String After Convert](https://leetcode.com/problems/sum-of-digits-of-string-after-convert/) | Easy |
| [Minimum Addition to Make Integer Beautiful](https://leetcode.com/problems/minimum-addition-to-make-integer-beautiful/) | Medium |
| [Smallest Value After Replacing With Sum of Prime Factors](https://leetcode.com/problems/smallest-value-after-replacing-with-sum-of-prime-factors/) | Medium |
| [Count the Digits That Divide a Number](https://leetcode.com/problems/count-the-digits-that-divide-a-number/) | Easy |
