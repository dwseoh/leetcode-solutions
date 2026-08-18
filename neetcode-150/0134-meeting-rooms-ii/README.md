# 134. Meeting Rooms II

**Difficulty:** `Medium`  
**Acceptance Rate:** `52.8%`  
**Topics:** `array` `two-pointers` `greedy` `sorting` `heap` `prefix-sum`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-18  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/meeting-rooms-ii/)

---

## Problem

> Paste or summarize the problem statement here.

**Example:**
```
Input: 
Output: 
Explanation: 
```

**Constraints:**
- 

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        sort(intervals.begin(), intervals.end(), [](Interval a, Interval b) {
            return a.start < b.start;
        });

        priority_queue<int, vector<int>, greater<int>> pq;

        for (auto &iv : intervals) {
            if (!pq.empty() && pq.top() <= iv.start) {
                pq.pop(); // reuse
            }
            pq.push(iv.end);
        }

        return pq.size();
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
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Medium |
| [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/) | Easy |
| [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) | Medium |
| [Car Pooling](https://leetcode.com/problems/car-pooling/) | Medium |
| [Number of Flowers in Full Bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom/) | Hard |
| [Meeting Rooms III](https://leetcode.com/problems/meeting-rooms-iii/) | Hard |
| [Total Cost to Hire K Workers](https://leetcode.com/problems/total-cost-to-hire-k-workers/) | Medium |
| [Points That Intersect With Cars](https://leetcode.com/problems/points-that-intersect-with-cars/) | Easy |
