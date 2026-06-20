# 092. Word Ladder

**Difficulty:** `Hard`  
**Acceptance Rate:** `45.8%`  
**Topics:** `hash-map` `string` `bfs`  
**Companies:** `company1` `company2`  
**Date Solved:** YYYY-MM-DD  
**Status:** ✅ Solved / 🔁 Revisit / ❌ Unsolved  

🔗 [LeetCode Link](https://leetcode.com/problems/word-ladder/)

---

## Problem

> A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
Every adjacent pair of words differs by a single letter.
	Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
	sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

**Example 2:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

**Constraints:**
- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord, endWord, and wordList[i] consist of lowercase English letters.`
- `beginWord != endWord`
- `All the words in wordList are unique.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O()`  
**Space Complexity:** `O()`

---

## Solution

```cpp
// C++ solution


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
| [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/) | Hard |
| [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/) | Medium |
| [Words Within Two Edits of Dictionary](https://leetcode.com/problems/words-within-two-edits-of-dictionary/) | Medium |
