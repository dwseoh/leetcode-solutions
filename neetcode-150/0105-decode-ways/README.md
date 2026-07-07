# 105. Decode Ways

**Difficulty:** `Medium`  
**Acceptance Rate:** `38.2%`  
**Topics:** `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-07  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/decode-ways/)

---

## Problem

> You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:
"1" -> 'A'
"2" -> 'B'
...
"25" -> 'Y'
"26" -> 'Z'
However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs "25").
For example, "11106" can be decoded into:
"AAJF" with the grouping (1, 1, 10, 6)
	"KJF" with the grouping (11, 10, 6)
	The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
Note: there may be strings that are impossible to decode.

Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.
The test cases are generated so that the answer fits in a 32-bit integer.

**Example 1:**
```
Input: s = "12"
Output: 2
Explanation:
"12" could be decoded as "AB" (1 2) or "L" (12).
```

**Example 2:**
```
Input: s = "226"
Output: 3
Explanation:
"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

**Example 3:**
```
Input: s = "06"
Output: 0
Explanation:
"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.
```

**Constraints:**
- `1 <= s.length <= 100`
- `s contains only digits and may contain leading zero(s).`

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
    int dfs(const string& s, vector<int>& memo, int i, int n) {
        if (i == n) return 1; // out of bounds lol 
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i]; // cached

        int total = dfs(s, memo, i+1,n);
        if (i+1<n) {
            int two = (s[i]-'0')*10+(s[i+1]-'0');
            if (10<=two && two<=26) {
                total += dfs(s, memo, i+2, n); // skipping over one 
            }
        }

        return memo[i] = total;
    }


    int numDecodings(string s) {
        int n = s.size();
        vector<int> memo(n, -1);
        return dfs(s,memo,0,n);
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
| [Decode Ways II](https://leetcode.com/problems/decode-ways-ii/) | Hard |
| [Number of Ways to Separate Numbers](https://leetcode.com/problems/number-of-ways-to-separate-numbers/) | Hard |
| [Count Number of Texts](https://leetcode.com/problems/count-number-of-texts/) | Medium |
