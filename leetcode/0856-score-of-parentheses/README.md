# 856. Score of Parentheses

**Difficulty:** `Medium`  
**Acceptance Rate:** `64.9%`  
**Topics:** `string` `stack` `bracket-sequences`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-10-05  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/score-of-parentheses/)

---

## Problem

> Given a balanced parentheses string s, return the score of the string.
The score of a balanced parentheses string is based on the following rule:
"()" has score 1.
	AB has score A + B, where A and B are balanced parentheses strings.
	(A) has score 2 * A, where A is a balanced parentheses string.

**Example 1:**
```
Input: s = "()"
Output: 1
```

**Example 2:**
```
Input: s = "(())"
Output: 2
```

**Example 3:**
```
Input: s = "()()"
Output: 2
```

**Constraints:**
- `2 <= s.length <= 50`
- `s consists of only '(' and ')'.`
- `s is a balanced parentheses string.`

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
    int scoreOfParentheses(string s) {
        int score = 0, depth = 0;
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == '(') {
                ++depth;
            } else {
                --depth;
                if (s[i - 1] == '(') {
                    score += 1 << depth;
                }
            }
        }
        return score;
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
