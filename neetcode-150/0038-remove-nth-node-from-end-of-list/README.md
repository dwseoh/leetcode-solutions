# 038. Remove Nth Node From End of List

**Difficulty:** `Medium`  
**Acceptance Rate:** `51.2%`  
**Topics:** `linked-list` `two-pointers`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

---

## Problem

> Given the head of a linked list, remove the nth node from the end of the list and return its head.

**Example 1:**
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

**Example 2:**
```
Input: head = [1], n = 1
Output: []
```

**Example 3:**
```
Input: head = [1,2], n = 1
Output: [1]
```

**Constraints:**
- `The number of nodes in the list is sz.`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
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
```
---

## Alternative Approaches

### Approach 2: [Name]
<!-- Briefly describe trade-offs vs your main approach -->

```cpp


```

**Time:** `O()` | **Space:** `O()`

---

## Edge Cases

- [ ] Empty input
- [ ] Single element
- [ ] All duplicates
- [ ] Negative numbers
- [ ] Max constraints

---

## Notes & Mistakes

<!-- What tripped you up? What would you do differently next time? -->


---

## Related Problems

| Title | Difficulty |
|-------|------------|
| [Swapping Nodes in a Linked List](https://leetcode.com/problems/swapping-nodes-in-a-linked-list/) | Medium |
| [Delete N Nodes After M Nodes of a Linked List](https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list/) | Easy |
| [Delete the Middle Node of a Linked List](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/) | Medium |
