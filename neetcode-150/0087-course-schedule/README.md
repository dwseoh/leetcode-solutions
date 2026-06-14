# 087. Course Schedule

**Difficulty:** `Medium`  
**Acceptance Rate:** `51.6%`  
**Topics:** `dfs` `bfs` `graph` `topological-sort`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-14  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/course-schedule/)

---

## Problem

> There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
```

**Example 2:**
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```

**Constraints:**
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `All the pairs prerequisites[i] are unique.`

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
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> state(numCourses,0);
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites)
            adj[p[0]].push_back(p[1]);

        function<bool(int)> dfs = [&](int node) -> bool {
            if (state[node] == 1) return false;
            if (state[node] == 2) return true;

            state[node] = 1;

            for (int n: adj[node])
                if (!dfs(n)) return false; 

            state[node] = 2; //undoing: backtracking pattern
            return true;
        };

        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i)) return false;
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
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) | Medium |
| [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) | Medium |
| [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) | Medium |
| [Course Schedule III](https://leetcode.com/problems/course-schedule-iii/) | Hard |
| [Build a Matrix With Conditions](https://leetcode.com/problems/build-a-matrix-with-conditions/) | Hard |
