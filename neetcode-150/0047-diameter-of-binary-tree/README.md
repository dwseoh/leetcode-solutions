# 047. Diameter of Binary Tree

**Difficulty:** `Easy`  
**Acceptance Rate:** `65.2%`  
**Topics:** `tree` `dfs` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-24  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/diameter-of-binary-tree/)

---

## Problem

> Given the root of a binary tree, return the length of the diameter of the tree.
The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
The length of a path between two nodes is represented by the number of edges between them.

**Example 1:**
```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
```

**Example 2:**
```
Input: root = [1,2]
Output: 1
```

**Constraints:**
- `The number of nodes in the tree is in the range [1, 104].`
- `-100 <= Node.val <= 100`

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
    int helper(TreeNode* root, int &result) {

        if (root==nullptr) {
            return 0;
        }

        int left = helper(root->left,result);
        int right = helper(root->right,result);
        result = max(result,left+right);

        // height of the current subtree, which the parent node needs to compute its own left + right
        return 1+max(left,right); 

    }

    int diameterOfBinaryTree(TreeNode* root) {
        int result = 0;
        helper(root,result);
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
| [Diameter of N-Ary Tree](https://leetcode.com/problems/diameter-of-n-ary-tree/) | Medium |
| [Longest Path With Different Adjacent Characters](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/) | Hard |
