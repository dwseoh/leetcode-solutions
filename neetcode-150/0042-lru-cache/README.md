# 042. LRU Cache

**Difficulty:** `Medium`  
**Acceptance Rate:** `47%`  
**Topics:** `hash-map` `linked-list` `design` `doubly-linked-list`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-22  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/lru-cache/)

---

## Problem

> Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
Implement the LRUCache class:
LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
	int get(int key) Return the value of the key if the key exists, otherwise return -1.
	void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

**Example 1:**
```
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

**Constraints:**
- `1 <= capacity <= 3000`
- `0 <= key <= 104`
- `0 <= value <= 105`
- `At most 2 * 105 calls will be made to get and put.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
My initial instinct was to use a list (doubly-linked list) and unordered_map to keep track of the keys (like a queue system) and the key:value pairs, but there was a bug where it didn't keep track of the latest accessed element through `.get()`. 

After some tinkering, I used:
```cpp
list<pair<int,int>> cache;
unordered_map<int, list<pair<int,int>>::iterator> mp;
```
where the cache served the purpose of storing the key:value pairs while the mp allowed for O(1) access to the direct cache element to specifically access/remove/modify that element

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->
1. Use a hashmap (key → iterator) for O(1) lookup
2. Use a doubly linked list to maintain usage order
3. Store (key, value) pairs in the list
4. Most recently used → front, least → back
5. On get(key) → move node to front
6. On put(key, val) → remove old node if exists
7. Insert new node at front
8. If over capacity → remove from back
9. Always update hashmap with new iterator
10. Result → all operations in O(1)

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class LRUCache {
public:
    int capacity;
    list<pair<int,int>> cache;
    unordered_map<int, list<pair<int,int>>::iterator> mp;

    // ctor
    LRUCache(int capacity) : capacity(capacity) {}    

    int get(int key) {

        // not found
        if (mp.find(key) == mp.end()) return -1;

         // move to front (most recently used)
        auto it = mp[key];
        int value = it->second;

        // update most recent element 
        cache.erase(it);
        cache.push_front({key,value});
        mp[key] = cache.begin();

        return value;
        
    }
    
    void put(int key, int value) {

        // if key already exists remove the old position
        if (mp.find(key) != mp.end()) {
            cache.erase(mp[key]);
        }
        
        cache.push_front({key,value});
        mp[key] = cache.begin();

        if (cache.size()>capacity) {
            auto last = cache.back();
            mp.erase(last.first);
            cache.pop_back();
            
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
| [LFU Cache](https://leetcode.com/problems/lfu-cache/) | Hard |
| [Design In-Memory File System](https://leetcode.com/problems/design-in-memory-file-system/) | Hard |
| [Design Compressed String Iterator](https://leetcode.com/problems/design-compressed-string-iterator/) | Easy |
| [Design Most Recently Used Queue](https://leetcode.com/problems/design-most-recently-used-queue/) | Medium |
