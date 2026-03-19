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

class Solution {
public:
  ListNode *mergeTwoLists(ListNode *list1, ListNode *list2) {
    if (!list1)
      return list2;
    if (!list2)
      return list1;

    if (list1->val < list2->val) {
      list1->next = mergeTwoLists(list1->next, list2);
      return list1;
    } else {
      list2->next = mergeTwoLists(list1, list2->next);
      return list2;
    }
  }
};

// class Solution {
// public:
//     ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
//         ListNode *ptr1 = list1;
//         ListNode *ptr2 = list2;

//         if (ptr1==nullptr) return ptr2;
//         else if (ptr2==nullptr) return ptr1;

//         ListNode *head = (ptr1->val<ptr2->val) ? ptr1 : ptr2;

//         if (head == ptr1) ptr1 = ptr1->next;
//         else ptr2 = ptr2->next;

//         ListNode *curr = head;

//         while (ptr1!=nullptr && ptr2!=nullptr) {
//             if (ptr1->val<ptr2->val) {
//                 curr->next=ptr1;
//                 curr=ptr1;
//                 ptr1=ptr1->next;
//             } else {
//                 curr->next=ptr2;
//                 curr=ptr2;
//                 ptr2=ptr2->next;
//             }
//         }

//         if (ptr1==nullptr && ptr2!=nullptr) curr->next=ptr2;
//         else if (ptr2==nullptr && ptr1!=nullptr) curr->next=ptr1;
//         else curr->next=nullptr;

//         return head;
//     }
// };
