# 108. Word Break

**Difficulty:** `Medium`  
**Acceptance Rate:** `49.6%`  
**Topics:** `array` `hash-map` `string` `dynamic-programming` `trie` `memoization`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-10  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/word-break/)

---

## Problem

> Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Example 1:**
```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

**Example 2:**
```
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

**Example 3:**
```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

**Constraints:**
- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s and wordDict[i] consist of only lowercase English letters.`
- `All the strings of wordDict are unique.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        int n = s.size();
        vector<int> memo(n+1,-1); // -1 is uncomputed, 0 is false, 1 is true
        // "Can the substring s[i..n-1] — everything from index i to the end — be segmented entirely into words from the dictionary?"
        
        function<bool(int)> dfs = [&](int start) -> bool {
            if (start==n) return true;
            // with substring/index DP, "done" almost always means the pointer reached n
            if (memo[start] != -1) return memo[start]; 

            for (const string& word: wordDict) {
                int len = word.size();
                if (start+len>n) continue;

                bool matches = true;        
                for (int i = 0; i<len;i++) {
                    if (s[start+i] != word[i]) {
                        matches = false;
                        break;
                    }
                }

                if (matches && dfs(start+len)) return memo[start] = 1;
            }

            // shorter version of this for loop
            // for (int end = start + 1; end <= n; end++) {
            //     if (dict.count(s.substr(start, end - start)) && dfs(end)) {
            //         return memo[start] = 1;
            //     }
            // }
            // requires defining:
            // unordered_set<string> dict(wordDict.begin(), wordDict.end()); 

            // return false and mark memo[start] false
            return memo[start] = 0;
        };

        return dfs(0);

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
| [Word Break II](https://leetcode.com/problems/word-break-ii/) | Hard |
| [Extra Characters in a String](https://leetcode.com/problems/extra-characters-in-a-string/) | Medium |
