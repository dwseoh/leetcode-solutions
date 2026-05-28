# 075. Letter Combinations of a Phone Number

**Difficulty:** `Medium`  
**Acceptance Rate:** `66.1%`  
**Topics:** `hash-map` `string` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-28  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

---

## Problem

> Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

**Example 1:**
```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**Example 2:**
```
Input: digits = "2"
Output: ["a","b","c"]
```

**Constraints:**
- `1 <= digits.length <= 4`
- `digits[i] is a digit in the range ['2', '9'].`

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

```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        string cur;
        vector<string> res;
        dfs(res,digits,cur,0);
        return res;
    }

    void dfs(vector<string> &res, string &digits, string &cur, int idx) {
        static const vector<string> map = {
            "", "", "abc", "def", "ghi", "jkl",
            "mno", "pqrs", "tuv", "wxyz"
        };
        
        if (digits.size() == idx) {
            res.push_back(cur);
            return;
        }

        const string &letters = map[digits[idx] - '0'];
        for (char ch : letters) {
            cur.push_back(ch);
            dfs(res, digits, cur, idx + 1);
            cur.pop_back();
        }

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
| [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) | Medium |
| [Combination Sum](https://leetcode.com/problems/combination-sum/) | Medium |
| [Binary Watch](https://leetcode.com/problems/binary-watch/) | Easy |
| [Count Number of Texts](https://leetcode.com/problems/count-number-of-texts/) | Medium |
| [Minimum Number of Pushes to Type Word I](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i/) | Easy |
| [Minimum Number of Pushes to Type Word II](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/) | Medium |
