# 116. Interleaving String

**Difficulty:** `Medium`  
**Acceptance Rate:** `44.4%`  
**Topics:** `string` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-27  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/interleaving-string/)

---

## Problem

> Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.
An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that:
s = s1 + s2 + ... + sn
	t = t1 + t2 + ... + tm
	|n - m| <= 1
	The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

**Example 1:**
```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
```

**Example 2:**
```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
```

**Example 3:**
```
Input: s1 = "", s2 = "", s3 = ""
Output: true
```

**Constraints:**
- `0 <= s1.length, s2.length <= 100`
- `0 <= s3.length <= 200`
- `s1, s2, and s3 consist of lowercase English letters.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        // dp[i][j] represent if string s3 (up to index i+j+1) can be constructed
        // with ~i idx in s1, ~j idx in s2

        int l1 = s1.size(); int l2 = s2.size();
        if (l1 + l2 != (int)s3.size()) return false;
        vector<vector<int>> memo(l1+1,vector<int>(l2+1,-1));
        // do not define dfs[0][0] = 1 because dfs(0,0) will always return true

        // this approach is memoization; top-down
        // if i did tabulation - every cell's value depends on cells before it.

        function<bool(int,int)>dfs = [&](int i, int j) -> bool {
            if (memo[i][j] != -1) return memo[i][j];
            if (i==l1 && j==l2) return true;

            bool res = false;

            if (i<l1 && s3[i+j] == s1[i]) res += dfs(i+1,j);
            if (j<l2 && s3[i+j] == s2[j]) res += dfs(i,j+1);

            return memo[i][j] = res;
        };

        return dfs(0,0);
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
