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
