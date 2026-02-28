# 013. Container With Most Water

**Difficulty:** `Medium`  
**Acceptance Rate:** `59.6%`  
**Topics:** `array` `two-pointers` `greedy`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-28  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/container-with-most-water/)

---

## Problem

> You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.
Notice that you may not slant the container.

**Example 1:**
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

**Example 2:**
```
Input: height = [1,1]
Output: 1
```

**Constraints:**
- `n == height.length`
- `2 <= n <= 105`
- `0 <= height[i] <= 104`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a two pointer problem. However, I was unsure what pointers to move. 
I looked into greedy approach and found that we should move the pointer with the smaller height.

> If you move the taller bar inward, width shrinks by 1, and height is still capped by the shorter bar. So the result can only stay the same or get worse.
If you move the shorter bar inward, width still shrinks by 1, but now there's a chance the new bar is taller, which could increase the min height enough to compensate.  


---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initialize `ptr1` to 0 and `ptr2` to `heights.size()-1`
2. Initialize `max` to 0
3. While `ptr1` is less than `ptr2`:
    a. Calculate the area: `(ptr2-ptr1)*(min(heights[ptr2],heights[ptr1]))`
    b. If `max` is less than the current area, update `max`
    c. If `heights[ptr1]` is less than `heights[ptr2]`, increment `ptr1`
    d. Else, decrement `ptr2`
4. Return `max`

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int maxArea(vector<int>& heights) {
        int max = 0;
        int cur;
        int ptr1=0;
        int ptr2=heights.size()-1;

        while (ptr1<ptr2) {
            cur = (ptr2-ptr1)*(min(heights[ptr2],heights[ptr1]));
            if (max < cur) max = cur;

            if (heights[ptr1]<heights[ptr2]) ptr1++;
            else ptr2--;

        }

        return max;


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
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Hard |
| [Maximum Tastiness of Candy Basket](https://leetcode.com/problems/maximum-tastiness-of-candy-basket/) | Medium |
| [House Robber IV](https://leetcode.com/problems/house-robber-iv/) | Medium |
