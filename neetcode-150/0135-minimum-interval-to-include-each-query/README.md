# 135. Minimum Interval to Include Each Query

**Difficulty:** `Hard`  
**Acceptance Rate:** `55.1%`  
**Topics:** `array` `binary-search` `sweep-line` `sorting` `heap`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/minimum-interval-to-include-each-query/)

---

## Problem

> You are given a 2D integer array intervals, where intervals[i] = [lefti, righti] describes the ith interval starting at lefti and ending at righti (inclusive). The size of an interval is defined as the number of integers it contains, or more formally righti - lefti + 1.
You are also given an integer array queries. The answer to the jth query is the size of the smallest interval i such that lefti <= queries[j] <= righti. If no such interval exists, the answer is -1.
Return an array containing the answers to the queries.

**Example 1:**
```
Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
Output: [3,3,1,4]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.
- Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.
- Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.
- Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.
```

**Example 2:**
```
Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
Output: [2,-1,4,6]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.
- Query = 19: None of the intervals contain 19. The answer is -1.
- Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4.
- Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6.
```

**Constraints:**
- `1 <= intervals.length <= 105`
- `1 <= queries.length <= 105`
- `intervals[i].length == 2`
- `1 <= lefti <= righti <= 107`
- `1 <= queries[j] <= 107`

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
class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        # import heapq, min heap by default 
        # enumerate adds index 
        intervals.sort()
        n = len(queries)
        m = len(intervals)
        sorted_queries = sorted((q,i) for i,q in enumerate(queries)) # assigns it index, but (q,i) flips and creates a new tuple with order flipped
        # now it'll be (2,0),(100,1)
        heap = []
        output = [0] * n
        interval_idx = 0

        for query_val, original_idx in sorted_queries:
            # index all applicable heaps
            while interval_idx<m and intervals[interval_idx][0] <= query_val:
                left,right=intervals[interval_idx]
                heapq.heappush(heap,(right-left+1,right))
                interval_idx+=1
            
            #invalidate values we don't need anymore (minheap, it'll be the smallest )
            while heap and heap[0][1] < query_val:
                heapq.heappop(heap)

            output[original_idx] = heap[0][0] if heap else -1

        return output
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
| [Number of Flowers in Full Bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom/) | Hard |
