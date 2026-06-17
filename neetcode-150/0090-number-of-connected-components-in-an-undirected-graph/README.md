# 090. Number of Connected Components in an Undirected Graph

**Difficulty:** `Medium`  
**Acceptance Rate:** `65%`  
**Topics:** `dfs` `bfs` `union-find` `graph`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-17  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

---

## Problem

You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [aᵢ, bᵢ] indicates that there is an edge between aᵢ and bᵢ in the graph.

Return the number of connected components in the graph.

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

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        vector<int> visited(n,0);
        int res{};

        for (const auto& edge: edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }


        function<void(int)> dfs = [&](int node) {
            visited[node] = 1;
            for (const int nb : adj[node])
                if (!visited[nb]) dfs(nb);
        };


        for (int i = 0; i<n; i++) {
            if (!visited[i]) {
                dfs(i);
                res++;
            }
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
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Medium |
| [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) | Medium |
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) | Medium |
| [Paths in Maze That Lead to Same Room](https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room/) | Medium |
| [Count the Number of Complete Components](https://leetcode.com/problems/count-the-number-of-complete-components/) | Medium |
