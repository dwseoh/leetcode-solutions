# 127. Merge Triplets to Form Target Triplet

**Difficulty:** `Medium`  
**Acceptance Rate:** `69.3%`  
**Topics:** `array` `greedy`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-08  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/)

---

## Problem

> A triplet is an array of three integers. You are given a 2D integer array triplets, where triplets[i] = [ai, bi, ci] describes the ith triplet. You are also given an integer array target = [x, y, z] that describes the triplet you want to obtain.
To obtain target, you may apply the following operation on triplets any number of times (possibly zero):
Choose two indices (0-indexed) i and j (i != j) and update triplets[j] to become [max(ai, aj), max(bi, bj), max(ci, cj)].

	
		For example, if triplets[i] = [2, 5, 3] and triplets[j] = [1, 7, 5], triplets[j] will be updated to [max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5].
Return true if it is possible to obtain the target triplet [x, y, z] as an element of triplets, or false otherwise.

**Example 1:**
```
Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and last triplets [[2,5,3],[1,8,4],[1,7,5]]. Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. triplets = [[2,5,3],[1,8,4],[2,7,5]]
The target triplet [2,7,5] is now an element of triplets.
```

**Example 2:**
```
Input: triplets = [[3,4,5],[4,5,6]], target = [3,2,5]
Output: false
Explanation: It is impossible to have [3,2,5] as an element because there is no 2 in any of the triplets.
```

**Example 3:**
```
Input: triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and third triplets [[2,5,3],[2,3,4],[1,2,5],[5,2,3]]. Update the third triplet to be [max(2,1), max(5,2), max(3,5)] = [2,5,5]. triplets = [[2,5,3],[2,3,4],[2,5,5],[5,2,3]].
- Choose the third and fourth triplets [[2,5,3],[2,3,4],[2,5,5],[5,2,3]]. Update the fourth triplet to be [max(2,5), max(5,2), max(5,3)] = [5,5,5]. triplets = [[2,5,3],[2,3,4],[2,5,5],[5,5,5]].
The target triplet [5,5,5] is now an element of triplets.
```

**Constraints:**
- `1 <= triplets.length <= 105`
- `triplets[i].length == target.length == 3`
- `1 <= ai, bi, ci, x, y, z <= 1000`

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

```python
class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        # think of operating on i,j as make j the MAX element
        # in other words, replace elements if a more higher # is possible
        #  [[2,5,6],[1,4,4],[5,7,5]], target = [5,4,6]
        #  [[1,4,7],[2,5,6],[5,7,5]], target = [2,5,7]
        # A triplet is only useful if none of its values exceed the target's corresponding value (

        # we take the max of each position and match that with the target
        # but we make sure to filter all out of bound triplets (any thats above of target's value for any index)

        match = [0, 0, 0]

        for t in triplets:
            if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
                for i in range(3):
                    if t[i] == target[i]:
                        match[i] = 1
        # for my v1, i did a loop where for i in n, for j in 3 and checked if current verticie is valid (in range)
        # then i used break if it was out of bound. but the problem is that ALL 3 elements should be valid, so this doesn't work

        return match == [1, 1, 1]
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
