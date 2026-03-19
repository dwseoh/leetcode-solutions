# 034. Reverse Linked List

**Difficulty:** `Easy`  
**Acceptance Rate:** `80.4%`  
**Topics:** `linked-list` `recursion`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/reverse-linked-list/)

---

## Problem

> Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**
```
Input: head = [1,2]
Output: [2,1]
```

**Example 3:**
```
Input: head = []
Output: []
```

**Constraints:**
- `The number of nodes in the list is the range [0, 5000].`
- `-5000 <= Node.val <= 5000`

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
  ListNode *reverseList(ListNode *head) {

    ListNode *prev = nullptr;
    ListNode *cur = head;
    ListNode *next;

    while (cur != nullptr) {
      next = cur->next;
      cur->next = prev;
      prev = cur;
      cur = next;
    }

    return prev;
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
| [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) | Medium |
| [Binary Tree Upside Down](https://leetcode.com/problems/binary-tree-upside-down/) | Medium |
| [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) | Easy |
| [Reverse Nodes in Even Length Groups](https://leetcode.com/problems/reverse-nodes-in-even-length-groups/) | Medium |
| [Maximum Twin Sum of a Linked List](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/) | Medium |
| [Remove Nodes From Linked List](https://leetcode.com/problems/remove-nodes-from-linked-list/) | Medium |
| [Insert Greatest Common Divisors in Linked List](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/) | Medium |
