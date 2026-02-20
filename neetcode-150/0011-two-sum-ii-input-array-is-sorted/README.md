# 011. Two Sum II - Input Array Is Sorted

**Difficulty:** `Medium`  
**Acceptance Rate:** `64.6%`  
**Topics:** `array` `two-pointers` `binary-search`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-20  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

---

## Problem

> Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
The tests are generated such that there is exactly one solution. You may not use the same element twice.
Your solution must use only constant extra space.

**Example 1:**
```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

**Example 2:**
```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
```

**Example 3:**
```
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

**Constraints:**
- `2 <= numbers.length <= 3 * 104`
- `-1000 <= numbers[i] <= 1000`
- `numbers is sorted in non-decreasing order.`
- `-1000 <= target <= 1000`
- `The tests are generated such that there is exactly one solution.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I realized it was a two pointer problem.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initalize two pointers and traverse through the list from the left & right keeping track of the current sum.
2. If the current sum is smaller than the target, move the left pointer to the right (inc sum)
3. If the current sum is bigger than the target, move the right pointer to the left (dec sum)

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int ptr1 = 0;
        int ptr2 = numbers.size()-1;
        int curr;

        while (ptr1<ptr2) {
            curr = numbers[ptr1] + numbers[ptr2];

            if (curr==target) return vector<int>{ptr1+1, ptr2+1};
            else if (curr < target) ptr1++;
            else if (curr > target) ptr2--;
        }

        return {};

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
| [Two Sum](https://leetcode.com/problems/two-sum/) | Easy |
| [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/) | Easy |
| [Two Sum Less Than K](https://leetcode.com/problems/two-sum-less-than-k/) | Easy |
