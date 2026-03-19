/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

// class Solution {
// public:
//     ListNode* removeNthFromEnd(ListNode* head, int n) {
//         int len = 0;
//         ListNode* ptr = head;

//         // count length
//         for (; ptr!=nullptr; ptr=ptr->next) {
//             len ++;
//         }

//         int idx = len-n;

//         if (idx==0) {
//             ListNode* temp = head->next;
//             delete head;
//             return temp;

//         } else {
//             ptr = head;

//             for (int i=0;i<idx-1;i++){
//                 ptr = ptr->next;
//             }

//             ListNode* temp = ptr->next;
//             ptr->next=ptr->next->next;
//             delete temp;

//             return head;
//         }

//     }
// };

class Solution {
public:
  ListNode *removeNthFromEnd(ListNode *head, int n) {
    ListNode dummy(0, head); // dummy node handles edge case of removing head
    ListNode *fast = &dummy;
    ListNode *slow = &dummy;

    // advance fast n+1 steps ahead
    for (int i = 0; i <= n; i++) {
      fast = fast->next;
    }

    // move both until fast hits end
    while (fast != nullptr) {
      fast = fast->next;
      slow = slow->next;
    }

    // slow->next is the node to remove
    ListNode *temp = slow->next;
    slow->next = slow->next->next;
    delete temp;

    return dummy.next;
  }
};