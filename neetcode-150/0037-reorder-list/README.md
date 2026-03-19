# 037. Reorder List

**Difficulty:** `Medium`  
**Acceptance Rate:** `64.8%`  
**Topics:** `linked-list` `two-pointers` `stack` `recursion`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/reorder-list/)

---

## Problem

> You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

**Example 1:**
```
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

**Example 2:**
```
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

**Constraints:**
- `The number of nodes in the list is in the range [1, 5 * 104].`
- `1 <= Node.val <= 1000`

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
| [Delete the Middle Node of a Linked List](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/) | Medium |
| [Take K of Each Character From Left and Right](https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/) | Medium |
