# 2502. Design Memory Allocator

**Difficulty:** `Medium`  
**Acceptance Rate:** `50.5%`  
**Topics:** `array` `hash-map` `design` `simulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-14  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/design-memory-allocator/)

---

## Problem

> You are given an integer n representing the size of a 0-indexed memory array. All memory units are initially free.
You have a memory allocator with the following functionalities:
Allocate a block of size consecutive free memory units and assign it the id mID.
	Free all memory units with the given id mID.
Note that:
Multiple blocks can be allocated to the same mID.
	You should free all the memory units with mID, even if they were allocated in different blocks.
Implement the Allocator class:
Allocator(int n) Initializes an Allocator object with a memory array of size n.
	int allocate(int size, int mID) Find the leftmost block of size consecutive free memory units and allocate it with the id mID. Return the block's first index. If such a block does not exist, return -1.
	int freeMemory(int mID) Free all memory units with the id mID. Return the number of memory units you have freed.

**Example 1:**
```
Input
["Allocator", "allocate", "allocate", "allocate", "freeMemory", "allocate", "allocate", "allocate", "freeMemory", "allocate", "freeMemory"]
[[10], [1, 1], [1, 2], [1, 3], [2], [3, 4], [1, 1], [1, 1], [1], [10, 2], [7]]
Output
[null, 0, 1, 2, 1, 3, 1, 6, 3, -1, 0]

Explanation
Allocator loc = new Allocator(10); // Initialize a memory array of size 10. All memory units are initially free.
loc.allocate(1, 1); // The leftmost block's first index is 0. The memory array becomes [1,_,_,_,_,_,_,_,_,_]. We return 0.
loc.allocate(1, 2); // The leftmost block's first index is 1. The memory array becomes [1,2,_,_,_,_,_,_,_,_]. We return 1.
loc.allocate(1, 3); // The leftmost block's first index is 2. The memory array becomes [1,2,3,_,_,_,_,_,_,_]. We return 2.
loc.freeMemory(2); // Free all memory units with mID 2. The memory array becomes [1,_, 3,_,_,_,_,_,_,_]. We return 1 since there is only 1 unit with mID 2.
loc.allocate(3, 4); // The leftmost block's first index is 3. The memory array becomes [1,_,3,4,4,4,_,_,_,_]. We return 3.
loc.allocate(1, 1); // The leftmost block's first index is 1. The memory array becomes [1,1,3,4,4,4,_,_,_,_]. We return 1.
loc.allocate(1, 1); // The leftmost block's first index is 6. The memory array becomes [1,1,3,4,4,4,1,_,_,_]. We return 6.
loc.freeMemory(1); // Free all memory units with mID 1. The memory array becomes [_,_,3,4,4,4,_,_,_,_]. We return 3 since there are 3 units with mID 1.
loc.allocate(10, 2); // We can not find any free block with 10 consecutive free memory units, so we return -1.
loc.freeMemory(7); // Free all memory units with mID 7. The memory array remains the same since there is no memory unit with mID 7. We return 0.
```

**Constraints:**
- `1 <= n, size, mID <= 1000`
- `At most 1000 calls will be made to allocate and freeMemory.`

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

```python
class Allocator:
    def __init__(self, n: int):
        self._memory = [0] * n
        self._mapping = {}

    def allocate(self, size: int, mID: int) -> int:
        n = len(self._memory)
        run_start = 0
        run_len = 0

        for i in range(n):
            if self._memory[i] != 0:
                run_len = 0
                run_start = i + 1
                continue
            run_len += 1
            if run_len == size:
                for idx in range(run_start, run_start + size):
                    self._memory[idx] = mID
                self._mapping.setdefault(mID, []).extend(range(run_start, run_start + size))
                return run_start

        return -1

    def freeMemory(self, mID: int) -> int:
        indices = self._mapping.pop(mID, [])
        for idx in indices:
            self._memory[idx] = 0
        return len(indices)
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
