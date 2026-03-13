# 133. Meeting Rooms

**Difficulty:** `Easy`  
**Acceptance Rate:** `59.4%`  
**Topics:** `array` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/meeting-rooms/)

---

## Problem

> Given an array of meeting time interval objects consisting of start and end times [[start_1,end_1],[start_2,end_2],...] (start_i < end_i), determine if a person could add all meetings to their schedule without any conflicts.

Note: (0,8),(8,10) is not considered a conflict at 8


**Example:**
```
Input: intervals = [(0,30),(5,10),(15,20)]
Output: false
Explanation: 
(0,30) and (5,10) will conflict
(0,30) and (15,20) will conflict
```

**Constraints:**
- 0 <= intervals.length <= 500
- 0 <= intervals[i].start < intervals[i].end <= 1,000,000


---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I knew I had to sort the list with the ending coordinate and iterate through the list once to check for any violations

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(1)`

---

## Solution

```python
"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def canAttendMeetings(self, intervals: List[Interval]) -> bool:
        intervals.sort(key=lambda x: x.start)

        for i in range(len(intervals)-1):
            if intervals[i].end <= intervals[i+1].start:
                continue
            else:
                return False

        
        return True
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
| [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) | Medium |
| [Meeting Rooms III](https://leetcode.com/problems/meeting-rooms-iii/) | Hard |
| [Points That Intersect With Cars](https://leetcode.com/problems/points-that-intersect-with-cars/) | Easy |
