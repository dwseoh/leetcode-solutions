# 089. Graph Valid Tree

**Difficulty:** `Medium`  
**Acceptance Rate:** `50%`  
**Topics:** `dfs` `bfs` `union-find` `graph`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-17  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/graph-valid-tree/)

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

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() != n - 1) return false; 
        vector<int> state(n,0);
        vector<vector<int>> adj(n);

        for (const auto& edge: edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        function<bool(int,int)> dfs = [&](int node, int parent) -> bool {
            state[node] = 1;
            for (const auto nb: adj[node]) {
                if (nb == parent) continue;      // skip the edge we came in on
                if (state[nb] == 1 || !dfs(nb,node)) return false; // back edge = real cycle
            }
            return true;
        };

        if (!dfs(0, -1)) return false;
        for (int s : state) if (s == 0) return false;  // disconnected
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
| [Course Schedule](https://leetcode.com/problems/course-schedule/) | Medium |
| [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Medium |
| [Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/) | Medium |
