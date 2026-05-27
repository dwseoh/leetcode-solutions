# 074. Palindrome Partitioning

**Difficulty:** `Medium`  
**Acceptance Rate:** `74.1%`  
**Topics:** `string` `dynamic-programming` `backtracking`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-05-27  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/palindrome-partitioning/)

---

## Problem

> Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

**Example 1:**
```
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

**Example 2:**
```
Input: s = "a"
Output: [["a"]]
```

**Constraints:**
- `1 <= s.length <= 16`
- `s contains only lowercase English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res; 
        vector<string> cur;
        dfs(res, cur, 0, s);
        return res;
    }

    bool isPalindrome(const string &s) {
        for (int i = 0; i < s.size()/2; i++) {
            if (s[i] == s[s.size()-1-i]) continue;
            else return false;
        }
        return true;
    }

    void dfs(vector<vector<string>> &res, vector<string>& cur, int idx, string &s) {

        if (idx == s.size()) {
            res.push_back(cur);
            return;
        }

        for (int i = idx+1; i <= s.size(); i++) {
            string tmp = s.substr(idx, i - idx);
            if (isPalindrome(tmp)) {
                cur.push_back(tmp);
                dfs(res,cur,i,s);
                cur.pop_back();
            }
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
| [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/) | Hard |
| [Palindrome Partitioning IV](https://leetcode.com/problems/palindrome-partitioning-iv/) | Hard |
| [Maximum Number of Non-overlapping Palindrome Substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/) | Hard |
