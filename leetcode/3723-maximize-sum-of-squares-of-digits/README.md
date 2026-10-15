# 3723. Maximize Sum of Squares of Digits

**Difficulty:** `Medium`  
**Acceptance Rate:** `70.7%`  
**Topics:** `math` `greedy`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-10-14  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/maximize-sum-of-squares-of-digits/)

---

## Problem

> You are given two positive integers num and sum.
A positive integer n is good if it satisfies both of the following:
The number of digits in n is exactly num.
	The sum of digits in n is exactly sum.
The score of a good integer n is the sum of the squares of digits in n.
Return a string denoting the good integer n that achieves the maximum score. If there are multiple possible integers, return the maximum ​​​​​​​one. If no such integer exists, return an empty string.

**Example 1:**
```
Input: num = 2, sum = 3
Output: "30"
Explanation:
There are 3 good integers: 12, 21, and 30.
The maximum score is 9, which is achieved by the good integer 30. Therefore, the answer is "30".
```

**Example 2:**
```
Input: num = 2, sum = 17
Output: "98"
Explanation:
There are 2 good integers: 89 and 98.
The maximum score is 145. The maximum good integer that achieves this score is 98. Therefore, the answer is "98".
```

**Example 3:**
```
Input: num = 1, sum = 10
Output: ""
Explanation:
There are no integers that have exactly 1 digit and whose digits sum to 10. Therefore, the answer is "".
```

**Constraints:**
- `1 <= num <= 2 * 105`
- `1 <= sum <= 2 * 106`

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

```python
class Solution:
    def maxSumOfSquares(self, num: int, sum: int) -> str:
        # greedy approach
        # always want to choose max

        if sum > 9 * num:
            return "" #impossible

        digits = []
        for _ in range(num):
            digit = min(9, sum)
            sum -= digit
            digits.append(str(digit))

        return "".join(digits)

# Hint: repeatedly append the largest digit
# you can afford, then subtract it from sum.
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
