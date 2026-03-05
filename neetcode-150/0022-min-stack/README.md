# 022. Min Stack

**Difficulty:** `Medium`  
**Acceptance Rate:** `57.8%`  
**Topics:** `stack` `design`  
**Companies:** `company1` `company2`  
**Date Solved:** YYYY-MM-DD  
**Status:** ✅ Solved / 🔁 Revisit / ❌ Unsolved  

🔗 [LeetCode Link](https://leetcode.com/problems/min-stack/)

---

## Problem

> Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
Implement the MinStack class:
MinStack() initializes the stack object.
	void push(int val) pushes the element val onto the stack.
	void pop() removes the element on the top of the stack.
	int top() gets the top element of the stack.
	int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

**Example 1:**
```
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

**Constraints:**
- `-231 <= val <= 231 - 1`
- `Methods pop, top and getMin operations will always be called on non-empty stacks.`
- `At most 3 * 104 calls will be made to push, pop, top, and getMin.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a stack problem.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Use OOP to create a stack class

**Time Complexity:** `O()`  
**Space Complexity:** `O()`

---

## Solution

```cpp
// C++ solution


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
| [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | Hard |
| [Max Stack](https://leetcode.com/problems/max-stack/) | Hard |
