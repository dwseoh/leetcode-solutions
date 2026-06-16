# 088. Course Schedule II

**Difficulty:** `Medium`  
**Acceptance Rate:** `55.7%`  
**Topics:** `dfs` `bfs` `graph` `topological-sort`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-16  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/course-schedule-ii/)

---

## Problem

> There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
```

**Example 2:**
```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
```

**Example 3:**
```
Input: numCourses = 1, prerequisites = []
Output: [0]
```

**Constraints:**
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- `All the pairs [ai, bi] are distinct.`

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
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> state(numCourses,0);
        vector<int> res{};
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
            res.push_back(node);
            return true;
        };

        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i)) return {};
        }

        return res;
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
| [Course Schedule](https://leetcode.com/problems/course-schedule/) | Medium |
| [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) | Hard |
| [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) | Medium |
| [Sequence Reconstruction](https://leetcode.com/problems/sequence-reconstruction/) | Medium |
| [Course Schedule III](https://leetcode.com/problems/course-schedule-iii/) | Hard |
| [Parallel Courses](https://leetcode.com/problems/parallel-courses/) | Medium |
| [Find All Possible Recipes from Given Supplies](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/) | Medium |
| [Build a Matrix With Conditions](https://leetcode.com/problems/build-a-matrix-with-conditions/) | Hard |
| [Sort Array by Moving Items to Empty Space](https://leetcode.com/problems/sort-array-by-moving-items-to-empty-space/) | Hard |
