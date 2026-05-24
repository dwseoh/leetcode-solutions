# 072. Generate Parentheses

**Difficulty:** `Medium`  
**Acceptance Rate:** `78.7%`  
**Topics:** `string` `dynamic-programming` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/generate-parentheses/)

---

## Problem

> Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example 1:**
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

**Example 2:**
```
Input: n = 1
Output: ["()"]
```

**Constraints:**
- `1 <= n <= 8`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(2^n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string cur;
        dfs(res,n,0,cur);
        return res;
    }

    void dfs(vector<string> &res, int remaining, int open, string& cur) {
        if (remaining<0 || open <0) return;
        
        if (remaining==0 && !open) {
            res.push_back(cur);
            return;
        }
        
        cur += "(";
        dfs(res,remaining-1,open+1,cur);
        cur.pop_back();

        cur += ")";
        dfs(res,remaining,open-1,cur);
        cur.pop_back();

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
| [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Medium |
| [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | Easy |
| [Check if a Parentheses String Can Be Valid](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/) | Medium |
