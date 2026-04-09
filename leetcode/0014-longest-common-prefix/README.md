# 014. Longest Common Prefix

**Difficulty:** `Easy`  
**Acceptance Rate:** `47.4%`  
**Topics:** `array` `string` `trie`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-09  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-common-prefix/)

---

## Problem

> Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

**Example 1:**
```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

**Example 2:**
```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

**Constraints:**
- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i] consists of only lowercase English letters if it is non-empty.`

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
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.size() == 0) return "";

        string prefix = strs[0];

        for (int i = 1; i<strs.size();i++) {
            while (strs[i].find(prefix)!=0 ) {
                prefix = prefix.substr(0,prefix.size()-1);
                if (prefix.empty()) return "";
            }
        }

        return prefix;
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
| [Smallest Missing Integer Greater Than Sequential Prefix Sum](https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum/) | Easy |
| [Find the Length of the Longest Common Prefix](https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/) | Medium |
| [Longest Common Suffix Queries](https://leetcode.com/problems/longest-common-suffix-queries/) | Hard |
| [Longest Common Prefix After at Most One Removal](https://leetcode.com/problems/longest-common-prefix-after-at-most-one-removal/) | Medium |
