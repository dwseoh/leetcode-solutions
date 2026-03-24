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
