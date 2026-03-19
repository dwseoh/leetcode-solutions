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
  void reorderList(ListNode *head) {
    int n = 0;
    ListNode *ptr1 = head;
    ListNode *ptr2;

    // count length
    while (ptr1 != nullptr) {
      n++;
      ptr1 = ptr1->next;
    }

    // divide list
    n = (n + 1) / 2; // int div
    ptr1 = head;
    for (int i = 0; i < n - 1; i++) {
      ptr1 = ptr1->next;
    }

    ptr2 = ptr1->next;
    ptr1->next = nullptr;

    // reverse second list
    ListNode *prev = nullptr;
    ListNode *cur = ptr2;
    ListNode *next;

    while (cur != nullptr) {
      next = cur->next;
      cur->next = prev;
      prev = cur;
      cur = next;
    }

    ptr2 = prev;

    ptr1 = head;
    while (ptr1 && ptr2) {
      ListNode *ptr1next = ptr1->next;
      ListNode *ptr2next = ptr2->next;

      ptr1->next = ptr2;
      ptr2->next = ptr1next;

      ptr1 = ptr1next;
      ptr2 = ptr2next;
    }
  }
};
