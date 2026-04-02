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

