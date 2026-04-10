# 3740. Minimum Distance Between Three Equal Elements I

**Difficulty:** `Easy`  
**Acceptance Rate:** `70.8%`  
**Topics:** `array` `hash-map`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-10  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i/)

---

## Problem

> You are given an integer array nums.
A tuple (i, j, k) of 3 distinct indices is good if nums[i] == nums[j] == nums[k].
The distance of a good tuple is abs(i - j) + abs(j - k) + abs(k - i), where abs(x) denotes the absolute value of x.
Return an integer denoting the minimum possible distance of a good tuple. If no good tuples exist, return -1.

**Example 1:**
```
Input: nums = [1,2,1,1,3]
Output: 6
Explanation:
The minimum distance is achieved by the good tuple (0, 2, 3).
(0, 2, 3) is a good tuple because nums[0] == nums[2] == nums[3] == 1. Its distance is abs(0 - 2) + abs(2 - 3) + abs(3 - 0) = 2 + 1 + 3 = 6.
```

**Example 2:**
```
Input: nums = [1,1,2,3,2,1,2]
Output: 8
Explanation:
The minimum distance is achieved by the good tuple (2, 4, 6).
(2, 4, 6) is a good tuple because nums[2] == nums[4] == nums[6] == 2. Its distance is abs(2 - 4) + abs(4 - 6) + abs(6 - 2) = 2 + 2 + 4 = 8.
```

**Example 3:**
```
Input: nums = [1]
Output: -1
Explanation:
There are no good tuples. Therefore, the answer is -1.
```

**Constraints:**
- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= n`

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
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        unordered_map<int,vector<int>> freq;
        int min_val = INT_MAX;

        for (int i = 0; i < (int)nums.size(); i++) {
            freq[nums[i]].push_back(i);
        }

        for (const auto& [key, value] : freq) {
            for (int h = 0; h + 2 < (int)value.size(); h++) {
                min_val = min(min_val, 2 * (value[h+2] - value[h]));
            }
        }

        return min_val == INT_MAX ? -1 : min_val;
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


<!-- 
---

## Related Problems

| # | Title | Difficulty | Relation |
|---|-------|------------|----------|
|   |       |            |          | -->
