# 077. Implement Trie (Prefix Tree)

**Difficulty:** `Medium`  
**Acceptance Rate:** `69.6%`  
**Topics:** `hash-map` `string` `design` `trie`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-01  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/implement-trie-prefix-tree/)

---

## Problem

> A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
Implement the Trie class:
Trie() Initializes the trie object.
	void insert(String word) Inserts the string word into the trie.
	boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
	boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

**Example 1:**
```
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
```

**Constraints:**
- `1 <= word.length, prefix.length <= 2000`
- `word and prefix consist only of lowercase English letters.`
- `At most 3 * 104 calls in total will be made to insert, search, and startsWith.`

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
class TrieNode {
public:
    TrieNode* children[26];
    bool is_leaf;

    TrieNode() : is_leaf(false), children{} {}
};

class PrefixTree {
public:
    TrieNode* root;

    PrefixTree() {
        root = new TrieNode{};
    }

    void insert(string word) {
       TrieNode* cur = root;

        for (char c: word) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) 
                cur->children[i] = new TrieNode{};
            
            cur = cur->children[i];
        }
        cur->is_leaf = true;
    }
    
    bool search(string word) {
        TrieNode* cur = root;

        for (char c: word) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) return false;
            cur = cur->children[i];
        }

        return cur->is_leaf;
    }
    
    bool startsWith(string prefix) {
        TrieNode* cur = root;

        for (char c: prefix) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) return false;
            cur = cur->children[i];
        }

        return true;
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
| [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Medium |
| [Design Search Autocomplete System](https://leetcode.com/problems/design-search-autocomplete-system/) | Hard |
| [Replace Words](https://leetcode.com/problems/replace-words/) | Medium |
| [Implement Magic Dictionary](https://leetcode.com/problems/implement-magic-dictionary/) | Medium |
| [Encrypt and Decrypt Strings](https://leetcode.com/problems/encrypt-and-decrypt-strings/) | Hard |
| [Implement Trie II (Prefix Tree)](https://leetcode.com/problems/implement-trie-ii-prefix-tree/) | Medium |
| [Count Prefix and Suffix Pairs II](https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/) | Hard |
| [Count Prefix and Suffix Pairs I](https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/) | Easy |
