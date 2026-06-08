# 082. Clone Graph

**Difficulty:** `Medium`  
**Acceptance Rate:** `65.4%`  
**Topics:** `hash-map` `dfs` `bfs` `graph`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/clone-graph/)

---

## Problem

> Given a reference of a node in a connected undirected graph.
Return a deep copy (clone) of the graph.
Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
class Node {
    public int val;
    public List<Node> neighbors;
}
Test case format:
For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

**Example 1:**
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
```

**Example 2:**
```
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
```

**Example 3:**
```
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
```

**Constraints:**
- `The number of nodes in the graph is in the range [0, 100].`
- `1 <= Node.val <= 100`
- `Node.val is unique for each node.`
- `There are no repeated edges and no self-loops in the graph.`
- `The Graph is connected and all nodes can be visited starting from the given node.`

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

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    unordered_map<int,Node*> mapping{};

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (mapping.count(node->val)) return mapping[node->val];

        Node* head = new Node{node->val};
        mapping[node->val] = head;

        for (Node* n: node->neighbors) {
            head->neighbors.push_back(cloneGraph(n));
        }        
        
        return head;
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
| [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) | Medium |
| [Clone Binary Tree With Random Pointer](https://leetcode.com/problems/clone-binary-tree-with-random-pointer/) | Medium |
| [Clone N-ary Tree](https://leetcode.com/problems/clone-n-ary-tree/) | Medium |
