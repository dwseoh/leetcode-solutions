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

    int dfs(TreeNode* cur, int max) {
        if (!cur) return 0;

        int valid = 0;

        if (cur->val>=max) {
            valid = 1;
            max = cur->val;
        }

        return valid+dfs(cur->left,max)+dfs(cur->right,max);


    }

    int goodNodes(TreeNode* root) {
        if (!root) return 0;
        
        return 1+dfs(root->left,root->val)+dfs(root->right,root->val);
    }
};
