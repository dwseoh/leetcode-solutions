# 148. Missing Number

**Difficulty:** `Easy`  
**Acceptance Rate:** `72.2%`  
**Topics:** `array` `hash-map` `math` `binary-search` `bit-manipulation` `sorting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-06-28  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/missing-number/)

---

## Problem

> Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

**Example 1:**
```
Input: nums = [3,0,1]
Output: 2
Explanation:
n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
```

**Example 2:**
```
Input: nums = [0,1]
Output: 2
Explanation:
n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
```

**Example 3:**
```
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation:
n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
```

**Constraints:**
- `n == nums.length`
- `1 <= n <= 104`
- `0 <= nums[i] <= n`
- `All the numbers of nums are unique.`

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
    int missingNumber(vector<int>& nums) {
        int ans = nums.size();

        for (int i = 0; i < nums.size(); i++) {
            ans ^= i;
            ans ^= nums[i];
        }

        // one without a partner is the missing one, the answer

        return ans;
    }
};

// class Solution {
// public:
//     int missingNumber(vector<int>& nums) {
//         unordered_set<int> seen;
//         int maxN = -1;
//         for (const int num: nums) {
//             seen.insert(num);
//             maxN = max(maxN,num);
//         }

//         for (int i = 0; i < maxN+1; i++) {
//             if (seen.count(i) > 0) {
//                 continue;
//             } else return i;
//         }

//         return maxN+1;


//     }
// };
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
| [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) | Medium |
| [Couples Holding Hands](https://leetcode.com/problems/couples-holding-hands/) | Hard |
| [Find Unique Binary String](https://leetcode.com/problems/find-unique-binary-string/) | Medium |
| [Find the Largest Almost Missing Integer](https://leetcode.com/problems/find-the-largest-almost-missing-integer/) | Easy |
