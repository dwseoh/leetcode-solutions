# 130. Insert Interval

**Difficulty:** `Medium`  
**Acceptance Rate:** `45.8%`  
**Topics:** `array`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-12  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/insert-interval/)

---

## Problem

> You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
Two intervals are considered overlapping if they share at least one point.
Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
Return intervals after the insertion.
Note that you don't need to modify intervals in-place. You can make a new array and return it.

**Example 1:**
```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

**Example 2:**
```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

**Constraints:**
- `0 <= intervals.length <= 104`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 105`
- `intervals is sorted by starti in ascending order.`
- `newInterval.length == 2`
- `0 <= start <= end <= 105`

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

```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        n = len(intervals)
        res = []
        a, b = newInterval[0], newInterval[1]
        i = 0

        # phase 1: before, no overlap yet
        while i < n and intervals[i][1] < a:
            res.append(intervals[i])
            i += 1

        # phase 2: merge all overlapping intervals
        while i < n and intervals[i][0] <= b:
            a = min(a, intervals[i][0])
            b = max(b, intervals[i][1])
            i += 1
        res.append([a, b])

        # phase 3: after, no overlap possible
        while i < n:
            res.append(intervals[i])
            i += 1

        return res
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
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Medium |
| [Range Module](https://leetcode.com/problems/range-module/) | Hard |
| [Count Integers in Intervals](https://leetcode.com/problems/count-integers-in-intervals/) | Hard |
