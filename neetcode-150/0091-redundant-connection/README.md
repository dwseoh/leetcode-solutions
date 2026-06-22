# 091. Redundant Connection

**Difficulty:** `Medium`  
**Acceptance Rate:** `67.8%`  
**Topics:** `dfs` `bfs` `union-find` `graph`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-22  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/redundant-connection/)

---

## Problem

> In this problem, a tree is an undirected graph that is connected and has no cycles.
You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.
Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

**Example 2:**
```
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

**Constraints:**
- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- `There are no repeated edges.`
- `The given graph is connected.`

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
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        iota(parent.begin(), parent.end(), 0);   // each node is its own root

        function<int(int)> find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];    // path compression
                x = parent[x];
            }
            return x;
        };

        for (const auto& e : edges) {
            int a = find(e[0]), b = find(e[1]);
            if (a == b) return e;                 // both ends already connected -> redundant
            parent[a] = b;                        // union
        }
        return {};
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
| [Redundant Connection II](https://leetcode.com/problems/redundant-connection-ii/) | Hard |
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) | Medium |
| [Maximum Employees to Be Invited to a Meeting](https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/) | Hard |
| [Shortest Cycle in a Graph](https://leetcode.com/problems/shortest-cycle-in-a-graph/) | Hard |
