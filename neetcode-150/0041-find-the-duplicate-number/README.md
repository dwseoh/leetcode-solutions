# 041. Find the Duplicate Number

**Difficulty:** `Medium`  
**Acceptance Rate:** `64.1%`  
**Topics:** `array` `two-pointers` `binary-search` `bit-manipulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-22  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/find-the-duplicate-number/)

---

## Problem

> Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.
You must solve the problem without modifying the array nums and using only constant extra space.

**Example 1:**
```
Input: nums = [1,3,4,2,2]
Output: 2
```

**Example 2:**
```
Input: nums = [3,1,3,4,2]
Output: 3
```

**Example 3:**
```
Input: nums = [3,3,3,3,3]
Output: 3
```

**Constraints:**
- `How can we prove that at least one duplicate number must exist in nums?`
- `Can you solve the problem in linear runtime complexity?`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Hashmap was first instinct, but the question wanted better space complexity. 
I did some research then realized I was supposed to use the slow/fast pointer approach

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. slow/fast both start at nums[0], slow moves 1 step, fast moves 2, until they meet
2. reset slow to nums[0], both move 1 step until they meet again — that's the duplicate


**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // easy soln: brute force
        // slightly harder soln: inplace array manipulation:
        /*
        For example, in the array [2, 1, 2, 3], where 2 is repeated, we mark the index corresponding to each element as negative. 
        If we encounter a number whose corresponding position is already negative, it means the number is a duplicate, and we return it.
        */
        // harder soln: slow and fast ptr 
        
        int slow = nums[0];
        int fast = nums[0];

        do {
            slow = nums[slow]; // one step
            fast = nums[nums[fast]]; // two steps
        } while (slow!=fast);

        // find the "cycle" in the linkedlist

        
        // apparently some mathematical thing, so idk
        
        slow = nums[0];
        while (slow!=fast) {
            slow=nums[slow];
            fast=nums[fast];
        }

        return slow;
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
| [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) | Hard |
| [Single Number](https://leetcode.com/problems/single-number/) | Easy |
| [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) | Medium |
| [Missing Number](https://leetcode.com/problems/missing-number/) | Easy |
| [Set Mismatch](https://leetcode.com/problems/set-mismatch/) | Easy |
