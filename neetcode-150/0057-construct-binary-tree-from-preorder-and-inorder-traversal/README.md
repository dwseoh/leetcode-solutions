# 057. Construct Binary Tree from Preorder and Inorder Traversal

**Difficulty:** `Medium`  
**Acceptance Rate:** `68.6%`  
**Topics:** `array` `hash-map` `divide-and-conquer` `tree` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

---

## Problem

> Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

**Example 1:**
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

**Example 2:**
```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

**Constraints:**
- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder and inorder consist of unique values.`
- `Each value of inorder also appears in preorder.`
- `preorder is guaranteed to be the preorder traversal of the tree.`
- `inorder is guaranteed to be the inorder traversal of the tree.`

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

    unordered_map<int, int> inMap; // val -> index in inorder
    int preIdx = 0;

    TreeNode* build(vector<int>& preorder, int inLeft, int inRight) {
        if (inLeft > inRight) return nullptr;
        // inL & inR tracks valid range 

        int rootVal = preorder[preIdx++]; // find next element
        TreeNode* node = new TreeNode(rootVal);

        int inIdx = inMap[rootVal]; // find root position in inorder

        // similar to binary search
        /*
                [D, B, E]  A  [F, C]
               left side     right side
        */
        node->left = build(preorder, inLeft, inIdx - 1);
        node->right = build(preorder, inIdx + 1, inRight);

        return node;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        // preorder: print, left, right

        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }

        return build(preorder, 0, inorder.size() - 1);
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
| [Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | Medium |
