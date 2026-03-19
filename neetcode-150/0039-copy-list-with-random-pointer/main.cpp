/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
  Node *copyRandomList(Node *head) {

    if (head == nullptr)
      return nullptr;

    Node *ptr = head;
    Node *newhead = new Node{ptr->val};
    Node *ptr_newlis = newhead;

    // move the original pointer 1 fwd
    ptr = ptr->next;

    unordered_map<Node *, Node *> new_old;
    new_old[head] = newhead;

    // create nodes first (if len isnt 1)
    while (ptr != nullptr) {

      Node *newnode = new Node{ptr->val};
      // establish connection w prev node
      ptr_newlis->next = newnode;
      ptr_newlis = newnode;

      new_old[ptr] = ptr_newlis;

      // move org ptr 1 fwd
      ptr = ptr->next;
    }

    // make random pointers next
    ptr_newlis = newhead;
    ptr = head;

    while (ptr != nullptr) {

      ptr_newlis->random = ptr->random ? new_old[ptr->random] : nullptr;

      // move org ptr 1 fwd
      ptr = ptr->next;

      // move new ptr 1 fwd
      ptr_newlis = ptr_newlis->next;
    }

    return newhead;
  }
};
