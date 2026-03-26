# 049. Same Tree

**Difficulty:** `Easy`  
**Acceptance Rate:** `66.8%`  
**Topics:** `tree` `dfs` `bfs` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-26  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/same-tree/)

---

## Problem

> Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1:**
```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Example 2:**
```
Input: p = [1,2], q = [1,null,2]
Output: false
```

**Example 3:**
```
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

**Constraints:**
- `The number of nodes in both trees is in the range [0, 100].`
- `-104 <= Node.val <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Recursive DFS to search the tree and detect if it is wrong structure or value.

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
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Solution {
public:
    bool helper(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        if (p->val!=q->val) return false;


        return helper(p->left,q->left) && helper(p->right,q->right);
    }
    

    bool isSameTree(TreeNode* p, TreeNode* q) {
        return helper(p,q);
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
