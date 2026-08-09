# 129. Valid Parenthesis String

**Difficulty:** `Medium`  
**Acceptance Rate:** `40.4%`  
**Topics:** `string` `dynamic-programming` `stack` `greedy` `bracket-sequences`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-09  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/valid-parenthesis-string/)

---

## Problem

> Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.
The following rules define a valid string:
Any left parenthesis '(' must have a corresponding right parenthesis ')'.
	Any right parenthesis ')' must have a corresponding left parenthesis '('.
	Left parenthesis '(' must go before the corresponding right parenthesis ')'.
	'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "(*)"
Output: true
```

**Example 3:**
```
Input: s = "(*))"
Output: true
```

**Constraints:**
- `1 <= s.length <= 100`
- `s[i] is '(', ')' or '*'.`

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

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        low = 0   # min possible open brackets
        high = 0  # max possible open brackets

        for c in s:
            if c == '(':
                low += 1
                high += 1
            elif c == ')':
                low -= 1
                high -= 1
            else:  # '*'
                low -= 1
                high += 1

            if high < 0:
                return False
            low = max(low, 0)

        return low == 0
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
| [Special Binary String](https://leetcode.com/problems/special-binary-string/) | Hard |
| [Check if a Parentheses String Can Be Valid](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/) | Medium |
