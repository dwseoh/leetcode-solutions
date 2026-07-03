# 102. House Robber III

**Difficulty:** `Medium`  
**Acceptance Rate:** `56.1%`  
**Topics:** `dynamic-programming` `tree` `dfs` `tree`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-07-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/house-robber-iii/)

---

## Problem

> The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.
Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.
Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

**Example 1:**
```
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
```

**Example 2:**
```
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
```

**Constraints:**
- `The number of nodes in the tree is in the range [1, 104].`
- `0 <= Node.val <= 104`

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
    int rob(vector<int>& nums) {
        
        int n = nums.size();
        int ans1 = 0, ans2 = 0;

        auto robLinear = [&](int lo, int hi)->int {
            int rob1 = 0, rob2 = 0;
            for (int i = lo; i<hi;i++) {
                int num = nums[i];
                int temp = max(num + rob1, rob2); // include cur vs exclude cur 
                // i do num+rob1 bcuz thats the best for i-2 (adj skip)
                rob1 = rob2; // best total for until index i-2
                rob2 = temp; // best total for until index i-1
            }
            return rob2;
        };
        
        return max(robLinear(0,n-1),robLinear(1,n));
        // max bw excluding last house vs first house 
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
| [House Robber](https://leetcode.com/problems/house-robber/) | Medium |
| [House Robber II](https://leetcode.com/problems/house-robber-ii/) | Medium |
