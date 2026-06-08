/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    unordered_map<int,Node*> mapping{};

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (mapping.count(node->val)) return mapping[node->val];

        Node* head = new Node{node->val};
        mapping[node->val] = head;

        for (Node* n: node->neighbors) {
            head->neighbors.push_back(cloneGraph(n));
        }        
        
        return head;
    }
};
