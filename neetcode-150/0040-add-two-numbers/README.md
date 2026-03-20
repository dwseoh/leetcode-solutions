# 040. Add Two Numbers

**Difficulty:** `Medium`  
**Acceptance Rate:** `48.1%`  
**Topics:** `linked-list` `math` `recursion`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-20  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/add-two-numbers/)

---

## Problem

> You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

**Example 2:**
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

**Example 3:**
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

**Constraints:**
- `The number of nodes in each linked list is in the range [1, 100].`
- `0 <= Node.val <= 9`
- `It is guaranteed that the list represents a number that does not have leading zeros.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized I could just iterate through the two linked lists from left -> right while creating the result linked list on the way. Only had to worry about 1: carry, 2: handling having left over carry, 3: one linked list being smaller than the other

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Dummy head node eliminates the first-node special case
2. Single loop runs while either list or carry is non-zero
3. sum / 10 and sum % 10 replace the manual >= 10 checks

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy;
        ListNode* cur = &dummy;
        int carry = 0;

        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }

            carry = sum / 10;
            cur->next = new ListNode(sum % 10);
            cur = cur->next;
        }

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
| [Multiply Strings](https://leetcode.com/problems/multiply-strings/) | Medium |
| [Add Binary](https://leetcode.com/problems/add-binary/) | Easy |
| [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/) | Medium |
| [Add Strings](https://leetcode.com/problems/add-strings/) | Easy |
| [Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/) | Medium |
| [Add to Array-Form of Integer](https://leetcode.com/problems/add-to-array-form-of-integer/) | Easy |
| [Add Two Polynomials Represented as Linked Lists](https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists/) | Medium |
| [Double a Number Represented as a Linked List](https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/) | Medium |
