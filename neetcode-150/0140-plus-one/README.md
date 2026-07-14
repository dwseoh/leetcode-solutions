# 140. Plus One

**Difficulty:** `Easy`  
**Acceptance Rate:** `50.2%`  
**Topics:** `array` `math`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-14  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/plus-one/)

---

## Problem

> You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
Increment the large integer by one and return the resulting array of digits.

**Example 1:**
```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
```

**Example 2:**
```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
```

**Example 3:**
```
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
```

**Constraints:**
- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`
- `digits does not contain any leading 0's.`

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
    vector<int> plusOne(vector<int>& digits) {
        reverse(digits.begin(), digits.end());
        int n= digits.size();
        digits[0] += 1;
        int i = 0;
        while (digits[i] >= 10 && i<n-1) {
            digits[i] -= 10;
            digits[(i++)+1]+=1;
        }

        if (digits[n-1] >= 10) {
            digits[n-1] -= 10;
            digits.push_back(1);
        }

        reverse(digits.begin(), digits.end());

        return digits;
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
| [Multiply Strings](https://leetcode.com/problems/multiply-strings/) | Medium |
| [Add Binary](https://leetcode.com/problems/add-binary/) | Easy |
| [Plus One Linked List](https://leetcode.com/problems/plus-one-linked-list/) | Medium |
| [Add to Array-Form of Integer](https://leetcode.com/problems/add-to-array-form-of-integer/) | Easy |
| [Minimum Operations to Reduce an Integer to 0](https://leetcode.com/problems/minimum-operations-to-reduce-an-integer-to-0/) | Medium |
