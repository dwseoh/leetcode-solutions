# 143. Detect Squares

**Difficulty:** `Medium`  
**Acceptance Rate:** `53%`  
**Topics:** `array` `hash-map` `design` `counting` `data-stream`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-11  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/detect-squares/)

---

## Problem

> You are given a stream of points on the X-Y plane. Design an algorithm that:
Adds new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.
	Given a query point, counts the number of ways to choose three points from the data structure such that the three points and the query point form an axis-aligned square with positive area.
An axis-aligned square is a square whose edges are all the same length and are either parallel or perpendicular to the x-axis and y-axis.
Implement the DetectSquares class:
DetectSquares() Initializes the object with an empty data structure.
	void add(int[] point) Adds a new point point = [x, y] to the data structure.
	int count(int[] point) Counts the number of ways to form axis-aligned squares with point point = [x, y] as described above.

**Example 1:**
```
Input
["DetectSquares", "add", "add", "add", "count", "count", "add", "count"]
[[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]]
Output
[null, null, null, null, 1, 0, null, 2]

Explanation
DetectSquares detectSquares = new DetectSquares();
detectSquares.add([3, 10]);
detectSquares.add([11, 2]);
detectSquares.add([3, 2]);
detectSquares.count([11, 10]); // return 1. You can choose:
                               //   - The first, second, and third points
detectSquares.count([14, 8]);  // return 0. The query point cannot form a square with any points in the data structure.
detectSquares.add([11, 2]);    // Adding duplicate points is allowed.
detectSquares.count([11, 10]); // return 2. You can choose:
                               //   - The first, second, and third points
                               //   - The first, third, and fourth points
```

**Constraints:**
- `point.length == 2`
- `0 <= x, y <= 1000`
- `At most 3000 calls in total will be made to add and count.`

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
class CountSquares:

    def __init__(self):
        self._points = {} # {(2,5):1}
        
        

    def add(self, point: List[int]) -> None:
        key = (point[0],point[1])
        if key not in self._points:
            self._points[key] = 0
        self._points[key] += 1

    def count(self, point: List[int]) -> int:
        p_x,p_y = point
        res = 0
        for x,y in self._points:
            if x != p_x and abs(p_x - x) == abs(p_y-y):
                if (p_x,y) in self._points and (x,p_y) in self._points:
                    res += self._points[(x,y)]*self._points[(x,p_y)]*self._points[(p_x,y)]
        
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
