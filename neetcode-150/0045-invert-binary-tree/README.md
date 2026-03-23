# 045. Invert Binary Tree

**Difficulty:** `Easy`  
**Acceptance Rate:** `79.9%`  
**Topics:** `tree` `dfs` `bfs` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-23  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/invert-binary-tree/)

---

## Problem

> Given the root of a binary tree, invert the tree, and return its root.

**Example 1:**
```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

**Example 2:**
```
Input: root = [2,1,3]
Output: [2,3,1]
```

**Example 3:**
```
Input: root = []
Output: []
```

**Constraints:**
- `The number of nodes in the tree is in the range [0, 100].`
- `-100 <= Node.val <= 100`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Recursive call (dfs) to swap left & right nodes

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Base case: if root is null, return.
2. Otherwise, recursive calls to explore left & right nodes. 
3. When those finish, swap left & right nodes, and then return the root. 

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
    TreeNode* invertTree(TreeNode* root) {
        if (root==nullptr) return nullptr;
        if (root->left == nullptr && root->right == nullptr) return root;

        invertTree(root->left);
        invertTree(root->right);
        TreeNode* tmp = root->right;
        root->right=root->left;
        root->left=tmp;

        return root;
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
| [Reverse Odd Levels of Binary Tree](https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/) | Medium |
