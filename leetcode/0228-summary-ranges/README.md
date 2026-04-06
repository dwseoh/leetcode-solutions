# 228. Summary Ranges

**Difficulty:** `Easy`  
**Acceptance Rate:** `54.1%`  
**Topics:** `array`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-06  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/summary-ranges/)

---

## Problem

> You are given a sorted unique integer array nums.
A range [a,b] is the set of all integers from a to b (inclusive).
Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.
Each range [a,b] in the list should be output as:
"a->b" if a != b
	"a" if a == b

**Example 1:**
```
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

**Example 2:**
```
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

**Constraints:**
- `0 <= nums.length <= 20`
- `-231 <= nums[i] <= 231 - 1`
- `All the values of nums are unique.`
- `nums is sorted in ascending order.`

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
    vector<string> summaryRanges(vector<int>& nums) {
        if (!nums.size()) return {};

        int start = nums[0];
        int prev = nums[0];
        vector<string> output;

        for (int i = 1;i<nums.size();i++) {
            if (prev+1!=nums[i]) {// flush 
                if (start==prev) output.push_back(to_string(start));
                else output.push_back(to_string(start)+"->"+to_string(prev));
                start = nums[i];
            } prev = nums[i];
        }

        if (start==prev) output.push_back(to_string(start));
        else output.push_back(to_string(start)+"->"+to_string(nums[nums.size()-1]));
            
        return output;
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
| [Missing Ranges](https://leetcode.com/problems/missing-ranges/) | Easy |
| [Data Stream as Disjoint Intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals/) | Hard |
| [Find Maximal Uncovered Ranges](https://leetcode.com/problems/find-maximal-uncovered-ranges/) | Medium |
