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
    int n = 0;
    int result;

    void bfs(TreeNode* root,int k) {
        if (!root) return;

        bfs(root->left,k);
        n++;
        if (k==n) {
            result = root->val;
            return;
        }
        bfs(root->right,k);

    }


    int kthSmallest(TreeNode* root, int k) {
        bfs(root,k);
        return result;
    }
};
