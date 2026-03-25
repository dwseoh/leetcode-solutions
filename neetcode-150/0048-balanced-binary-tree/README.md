# 048. Balanced Binary Tree

**Difficulty:** `Easy`  
**Acceptance Rate:** `58%`  
**Topics:** `tree` `dfs` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-25  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/balanced-binary-tree/)

---

## Problem

> Given a binary tree, determine if it is height-balanced.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: true
```

**Example 2:**
```
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

**Example 3:**
```
Input: root = []
Output: true
```

**Constraints:**
- `The number of nodes in the tree is in the range [0, 5000].`
- `-104 <= Node.val <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Recursive DFS to explore left & right nodes and return false if the l, r is unbalanced. Otherwise, explore all depths and validate. 

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

    int isBalancedHelper(TreeNode* root, int & result) {
        if (root==nullptr || !balanced ) return 0;

        int l = isBalancedHelper(root->left,result);
        int r = isBalancedHelper(root->right,result);

        if (abs(l-r)>1) result = 0;

        return 1+max(l,r);
    }

    bool isBalanced(TreeNode* root) {

        int result = 1;
        isBalancedHelper(root,result);
        return result;

    }
};



// cleaner

/*

class Solution {
public:
    int height(TreeNode* root) {
        if (!root) return 0;

        int l = height(root->left);
        if (l == -1) return -1;

        int r = height(root->right);
        if (r == -1) return -1;

        if (abs(l - r) > 1) return -1;

        return 1 + max(l, r);
    }

    bool isBalanced(TreeNode* root) {
        return height(root) != -1;
    }
};

*/
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
| [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Easy |
| [K-th Largest Perfect Subtree Size in Binary Tree](https://leetcode.com/problems/k-th-largest-perfect-subtree-size-in-binary-tree/) | Medium |
| [Check Balanced String](https://leetcode.com/problems/check-balanced-string/) | Easy |
