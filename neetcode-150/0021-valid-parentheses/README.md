# 021. Valid Parentheses

**Difficulty:** `Easy`  
**Acceptance Rate:** `43.8%`  
**Topics:** `string` `stack`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-05  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/valid-parentheses/)

---

## Problem

> Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
	Open brackets must be closed in the correct order.
	Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```

**Example 3:**
```
Input: s = "(]"
Output: false
```

**Example 4:**
```
Input: s = "([])"
Output: true
```

**Example 5:**
```
Input: s = "([)]"
Output: false
```

**Constraints:**
- `1 <= s.length <= 104`
- `s consists of parentheses only '()[]{}'.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a stack problem.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Iterate through the string
2. If the character is an opening bracket, push it onto the stack
3. If the character is a closing bracket, check if the stack is empty or if the top of the stack is the corresponding opening bracket. If not, return False. If it is, pop the stack.
4. After iterating through the string, check if the stack is empty. If it is, return True. If it's not, return False.

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:
    def isValid(self, s: str) -> bool:
        exchange = {']':'[','}':'{',')':'('}
        stack = []

        for c in s:
            if c in exchange:
                if stack and stack[-1] == exchange[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)

        return True if not stack else False
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
| [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) | Medium |
| [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) | Hard |
| [Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/) | Hard |
| [Check If Word Is Valid After Substitutions](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/) | Medium |
| [Check if a Parentheses String Can Be Valid](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/) | Medium |
| [Move Pieces to Obtain a String](https://leetcode.com/problems/move-pieces-to-obtain-a-string/) | Medium |
