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