# 039. Copy List with Random Pointer

**Difficulty:** `Medium`  
**Acceptance Rate:** `62.5%`  
**Topics:** `hash-map` `linked-list`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/copy-list-with-random-pointer/)

---

## Problem

> A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.
Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.
For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.
Return the head of the copied linked list.
The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:
val: an integer representing Node.val
	random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.

**Example 1:**
```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**Example 2:**
```
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
```

**Example 3:**
```
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
```

**Constraints:**
- `0 <= n <= 1000`
- `-104 <= Node.val <= 104`
- `Node.random is null or is pointing to some node in the linked list.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I knew I had to traverse the list to make the nodes first and then establish the connections, but I was unsure how to map the connections. Then I realized I can use a hash map to map the old node to the new copied node.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Create a new head node and a pointer to the new head node.
2. Create a hash map to store the mapping between the old nodes and the new nodes.
3. Traverse the original list and create a new node for each node in the original list. Store the mapping between the old node and the new node in the hash map.
4. Traverse the original list again and set the next and random pointers of the new nodes.
5. Return the new head node.

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
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
  Node *copyRandomList(Node *head) {

    if (head == nullptr)
      return nullptr;

    Node *ptr = head;
    Node *newhead = new Node{ptr->val};
    Node *ptr_newlis = newhead;

    // move the original pointer 1 fwd
    ptr = ptr->next;

    unordered_map<Node *, Node *> new_old;
    new_old[head] = newhead;

    // create nodes first (if len isnt 1)
    while (ptr != nullptr) {

      Node *newnode = new Node{ptr->val};
      // establish connection w prev node
      ptr_newlis->next = newnode;
      ptr_newlis = newnode;

      new_old[ptr] = ptr_newlis;

      // move org ptr 1 fwd
      ptr = ptr->next;
    }

    // make random pointers next
    ptr_newlis = newhead;
    ptr = head;

    while (ptr != nullptr) {

      ptr_newlis->random = ptr->random ? new_old[ptr->random] : nullptr;

      // move org ptr 1 fwd
      ptr = ptr->next;

      // move new ptr 1 fwd
      ptr_newlis = ptr_newlis->next;
    }

    return newhead;
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
| [Clone Graph](https://leetcode.com/problems/clone-graph/) | Medium |
| [Clone Binary Tree With Random Pointer](https://leetcode.com/problems/clone-binary-tree-with-random-pointer/) | Medium |
| [Clone N-ary Tree](https://leetcode.com/problems/clone-n-ary-tree/) | Medium |
