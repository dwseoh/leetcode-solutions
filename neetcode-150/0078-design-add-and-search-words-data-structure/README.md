# 078. Design Add and Search Words Data Structure

**Difficulty:** `Medium`  
**Acceptance Rate:** `48.5%`  
**Topics:** `string` `dfs` `design` `trie`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

---

## Problem

> Design a data structure that supports adding new words and finding if a string matches any previously added string.
Implement the WordDictionary class:
WordDictionary() Initializes the object.
	void addWord(word) Adds word to the data structure, it can be matched later.
	bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

**Example 1:**
```
Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
```

**Constraints:**
- `1 <= word.length <= 25`
- `word in addWord consists of lowercase English letters.`
- `word in search consist of '.' or lowercase English letters.`
- `There will be at most 2 dots in word for search queries.`
- `At most 104 calls will be made to addWord and search.`

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
class TrieNode {
public:
    TrieNode* children[26];
    bool is_leaf;

    TrieNode() : is_leaf(false), children{} {}
};

class WordDictionary {
public:
    
    TrieNode* root;

    WordDictionary() {
        root = new TrieNode{};    
    }
    
    void addWord(string word) {
        TrieNode* cur = root;

        for (const char& c: word){
            int i = c - 'a';

            if (cur->children[i] == nullptr) 
                cur->children[i] = new TrieNode{};
            
            cur = cur->children[i];
        }

        cur->is_leaf = true;        
    }
    
    // could optimize by passing as ref and record idx to check
    bool dfs(const string& word, TrieNode* cur) {
        if (word.empty()) return cur->is_leaf;

        if (word[0] == '.') {
            for (int i = 0; i<26; i++) {
                if (cur->children[i] != nullptr) {
                    if (dfs(word.substr(1),cur->children[i])) return true;
                }
            }
            return false;
        } else {
            return (cur->children[word[0]-'a'] != nullptr) && dfs(word.substr(1),cur->children[word[0]-'a']);
        }
    }

    bool search(string word) {
        return dfs(word,root);
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
| [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) | Medium |
| [Prefix and Suffix Search](https://leetcode.com/problems/prefix-and-suffix-search/) | Hard |
| [Match Substring After Replacement](https://leetcode.com/problems/match-substring-after-replacement/) | Hard |
| [Sum of Prefix Scores of Strings](https://leetcode.com/problems/sum-of-prefix-scores-of-strings/) | Hard |
| [Count Prefix and Suffix Pairs II](https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/) | Hard |
| [Count Prefix and Suffix Pairs I](https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/) | Easy |
