# 093. Network Delay Time

**Difficulty:** `Medium`  
**Acceptance Rate:** `60.7%`  
**Topics:** `dfs` `bfs` `graph` `heap` `shortest-path`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-22  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/network-delay-time/)

---

## Problem

> You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.
We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

**Example 1:**
```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

**Example 2:**
```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

**Example 3:**
```
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
```

**Constraints:**
- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `times[i].length == 3`
- `1 <= ui, vi <= n`
- `ui != vi`
- `0 <= wi <= 100`
- `All the pairs (ui, vi) are unique. (i.e., no multiple edges.)`

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
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    // need bfs 
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {

        struct Edge {
            int to; // where
            int weight; // distance 
        };

        struct State {
            int dist;
            int node;

            // makes priority_queue a min-heap
            bool operator>(const State& other) const {
                return dist > other.dist;
            }
        };

        vector<vector<Edge>> adj(n + 1);
        vector<int> dist(n+1, INT_MAX);

        for (const auto& time : times) {
            adj[time[0]].push_back({time[1], time[2]});
        }

        priority_queue<State, vector<State>, greater<State>> pq;

        // starting node
        dist[k] = 0;
        pq.push({0,k});

        while (!pq.empty()) {
            State cur = pq.top();
            pq.pop();

            if (cur.dist > dist[cur.node]) continue; 

            for (const auto& n: adj[cur.node]) {
                if (dist[cur.node] + n.weight < dist[n.to]) {
                    dist[n.to] = dist[cur.node] + n.weight;
                    pq.push({dist[n.to],n.to});
                }

            }
            
        }

        int res = 0;

        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            res = max(res, dist[i]);
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
| [The Time When the Network Becomes Idle](https://leetcode.com/problems/the-time-when-the-network-becomes-idle/) | Medium |
| [Second Minimum Time to Reach Destination](https://leetcode.com/problems/second-minimum-time-to-reach-destination/) | Hard |
