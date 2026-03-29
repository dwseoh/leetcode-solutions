# 052. Binary Tree Level Order Traversal

**Difficulty:** `Medium`  
**Acceptance Rate:** `72.4%`  
**Topics:** `tree` `bfs` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-29  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/binary-tree-level-order-traversal/)

---

## Problem

> Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

**Example 2:**
```
Input: root = [1]
Output: [[1]]
```

**Example 3:**
```
Input: root = []
Output: []
```

**Constraints:**
- `The number of nodes in the tree is in the range [0, 2000].`
- `-1000 <= Node.val <= 1000`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
DFS -> recursive search

BFS -> use queues and for loop instead of recursion

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

    vector<vector<int>> result;

    void dfs(TreeNode* root, int layer) {
        if (!root) return;

        if (layer == result.size())  // need a new row
        result.push_back({});
        
        result[layer].push_back(root->val);
        dfs(root->left,layer+1);
        dfs(root->right,layer+1);

        return;
    }

    vector<vector<int>> levelOrder(TreeNode* root) {

        dfs(root,0);
        return result;
    }
};
```
---

## Alternative Approaches

### Approach 2: [BFS]
<!-- Briefly describe trade-offs vs your main approach -->

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
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            vector<int> level;
            int size = q.size();

            for (int i = q.size(); i > 0; i--) {
                TreeNode* node = q.front();
                q.pop();
                if (node) {
                    level.push_back(node->val);
                    q.push(node->left);
                    q.push(node->right);
                }
            }
            if (!level.empty()) {
                res.push_back(level);
            }
        }
        return res;
    }
};

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
| [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) | Medium |
| [Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/) | Medium |
| [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | Easy |
| [Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/) | Medium |
| [Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/) | Easy |
| [N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/) | Medium |
| [Cousins in Binary Tree](https://leetcode.com/problems/cousins-in-binary-tree/) | Easy |
| [Minimum Number of Operations to Sort a Binary Tree by Level](https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/) | Medium |
| [Divide Nodes Into the Maximum Number of Groups](https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups/) | Hard |
