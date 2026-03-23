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

        // unnecessary, covered by base case
        if (root->left == nullptr && root->right == nullptr) return root;

        invertTree(root->left);
        invertTree(root->right);

        // swap -> can use swap(root->left, root->right); instead
        TreeNode* tmp = root->right;
        root->right=root->left;
        root->left=tmp;

        return root;
    }
};
