# 056. Kth Smallest Element in a BST

**Difficulty:** `Medium`  
**Acceptance Rate:** `76.6%`  
**Topics:** `tree` `dfs` `binary-search-tree` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-01  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

---

## Problem

> Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

**Example 1:**
```
Input: root = [3,1,4,null,2], k = 1
Output: 1
```

**Example 2:**
```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

**Constraints:**
- `The number of nodes in the tree is n.`
- `1 <= k <= n <= 104`
- `0 <= Node.val <= 104`

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
    int n = 0;
    int result;

    void bfs(TreeNode* root,int k) {
        if (!root) return;

        bfs(root->left,k);
        n++;
        if (k==n) {
            result = root->val;
            return;
        }
        bfs(root->right,k);

    }


    int kthSmallest(TreeNode* root, int k) {
        bfs(root,k);
        return result;
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
| [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) | Easy |
| [Second Minimum Node In a Binary Tree](https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/) | Easy |
