# 001. Contains Duplicate

**Difficulty:** `Easy`  
**Acceptance Rate:** `64%`  
**Topics:** `array` `hash-map` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** YYYY-MM-DD  
**Status:** ✅ Solved / 🔁 Revisit / ❌ Unsolved  

🔗 [LeetCode Link](https://leetcode.com/problems/contains-duplicate/)

---

## Problem

> Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: true
Explanation:
The element 1 occurs at the indices 0 and 3.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: false
Explanation:
All elements are distinct.
```

**Example 3:**
```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

**Constraints:**
- `1 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

I could brute force with nested loops, but that would be O(n^2).
Then I thought of sorting the array, which would make it O(n log n).
Finally I thought of using a hash set, which would make it O(n).

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Make a dictionary (hash map)
2. Iterate through the array
3. If the element is already in the dictionary, return true
4. Otherwise, add the element to the dictionary
5. If the loop finishes without returning true, return false

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        cnt_mapping = {}

        for num in nums:
            if num not in cnt_mapping:
                cnt_mapping[num] = 0
            
            cnt_mapping[num] += 1
        
        for val in cnt_mapping.values():
            if val > 1:
                return True
        
        return False
```

---

## Alternative Approaches


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
| [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) | Easy |
| [Contains Duplicate III](https://leetcode.com/problems/contains-duplicate-iii/) | Hard |
| [Make Array Zero by Subtracting Equal Amounts](https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/) | Easy |
| [Find Valid Pair of Adjacent Digits in String](https://leetcode.com/problems/find-valid-pair-of-adjacent-digits-in-string/) | Easy |
