# 062. K Closest Points to Origin

**Difficulty:** `Medium`  
**Acceptance Rate:** `68.8%`  
**Topics:** `array` `math` `divide-and-conquer` `geometry` `sorting` `heap` `quickselect`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/k-closest-points-to-origin/)

---

## Problem

> Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

**Example 1:**
```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
```

**Example 2:**
```
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.
```

**Constraints:**
- `1 <= k <= points.length <= 104`
- `-104 <= xi, yi <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log k)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:

    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        import heapq
        
        heap = []
        for x, y in points:
            dist = -(x**2 + y**2)  # negate for max-heap
            if len(heap) < k:
                heapq.heappush(heap, (dist, [x, y]))
            else:
                heapq.heappushpop(heap, (dist, [x, y]))
        
        return [h[1] for h in heap]
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
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium |
| [Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/) | Medium |
| [Find Nearest Point That Has the Same X or Y Coordinate](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/) | Easy |
| [Minimum Rectangles to Cover Points](https://leetcode.com/problems/minimum-rectangles-to-cover-points/) | Medium |
| [K-th Nearest Obstacle Queries](https://leetcode.com/problems/k-th-nearest-obstacle-queries/) | Medium |
