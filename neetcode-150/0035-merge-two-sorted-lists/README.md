# 035. Merge Two Sorted Lists

**Difficulty:** `Easy`  
**Acceptance Rate:** `68%`  
**Topics:** `linked-list` `recursion`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/merge-two-sorted-lists/)

---

## Problem

> You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.

**Example 1:**
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**
```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**
```
Input: list1 = [], list2 = [0]
Output: [0]
```

**Constraints:**
- `The number of nodes in both lists is in the range [0, 50].`
- `-100 <= Node.val <= 100`
- `Both list1 and list2 are sorted in non-decreasing order.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n + m)`  
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
| [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) | Hard |
| [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) | Easy |
| [Sort List](https://leetcode.com/problems/sort-list/) | Medium |
| [Shortest Word Distance II](https://leetcode.com/problems/shortest-word-distance-ii/) | Medium |
| [Add Two Polynomials Represented as Linked Lists](https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists/) | Medium |
| [Longest Common Subsequence Between Sorted Arrays](https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays/) | Medium |
| [Merge Two 2D Arrays by Summing Values](https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values/) | Easy |
