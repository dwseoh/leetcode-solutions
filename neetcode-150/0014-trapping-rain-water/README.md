# 014. Trapping Rain Water

**Difficulty:** `Hard`  
**Acceptance Rate:** `68.2%`  
**Topics:** `array` `two-pointers` `dynamic-programming` `stack` `monotonic-stack`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-09-16  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/trapping-rain-water/)

---

## Problem

> Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example 1:**
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

**Example 2:**
```
Input: height = [4,2,0,3,2,5]
Output: 9
```

**Constraints:**
- `n == height.length`
- `1 <= n <= 2 * 104`
- `0 <= height[i] <= 105`

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
class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0;
        int r = height.size() - 1;
        int leftMax = height[l]; //
        int rightMax = height[r];
        int area = 0;

        while (l<r) {
            if (height[l] < height[r]) {  // area determined by leftMax 
                leftMax = max(leftMax,height[l]);
                area += leftMax-height[l]; // leftMax is already the dependent height because height[l] < height[r] assures that min(height[r],leftMax) = leftMax
                l++;
                
            } else {
                rightMax = max(rightMax,height[r]);
                area += rightMax-height[r]; 
                r--;
            }
        }

        return area;


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
| [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Medium |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Medium |
| [Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii/) | Hard |
| [Pour Water](https://leetcode.com/problems/pour-water/) | Medium |
| [Maximum Value of an Ordered Triplet II](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii/) | Medium |
