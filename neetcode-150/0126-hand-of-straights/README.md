# 126. Hand of Straights

**Difficulty:** `Medium`  
**Acceptance Rate:** `58.3%`  
**Topics:** `array` `hash-map` `greedy` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-07  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/hand-of-straights/)

---

## Problem

> Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.
Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

**Example 1:**
```
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
```

**Example 2:**
```
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.
```

**Constraints:**
- `1 <= hand.length <= 104`
- `0 <= hand[i] <= 109`
- `1 <= groupSize <= hand.length`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(1)`

---

## Solution

```python
class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand) # dict built for counting things

        for key in sorted(count.keys()):
            c = count[key]
            if c > 0:
                for i in range(groupSize):
                    if count[key + i] < c:
                        return False
                    count[key + i] -= c

        return True
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
