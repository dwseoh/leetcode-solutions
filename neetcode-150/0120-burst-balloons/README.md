# 120. Burst Balloons

**Difficulty:** `Hard`  
**Acceptance Rate:** `64.1%`  
**Topics:** `array` `dynamic-programming`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-02  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/burst-balloons/)

---

## Problem

> You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.
If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.
Return the maximum coins you can collect by bursting the balloons wisely.

**Example 1:**
```
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
```

**Example 2:**
```
Input: nums = [1,5]
Output: 10
```

**Constraints:**
- `n == nums.length`
- `1 <= n <= 300`
- `0 <= nums[i] <= 100`

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
**Space Complexity:** `O(n * m)`

---

## Solution

```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        nums.emplace(nums.begin(),1);
        nums.push_back(1);
        int n = nums.size();
        vector<vector<int>> dp(n,vector<int>(n,-1));

        // dp[i][j] = best possibility b/w left window i and right window j.
        // this expands to dp[i][k]+dp[k][j]+dp[i]*dp[k]*dp[j]
        // the trick is to think of k as the last element we're gonna remove where i & j are just boundaries
        // if that's the case then the remaining list is only [nums[i],nums[k],nums[j]]. then we go backwards
        // and insert elements in between i,k and k,j

        // dp[left][right] = max over all k in (left, right) of:
        // dp[left][k] + dp[k][right] + nums[left]*nums[k]*nums[right]

        function<int(int,int)> dfs = [&](int l, int r) -> int {
            if (dp[l][r] != -1) return dp[l][r];

            int res = 0;
            for (int i = l+1; i<r; i++) {
                res = max(res,dfs(l,i)+dfs(i,r)+nums[l]*nums[i]*nums[r]);
            }
            
            return dp[l][r] = res;
        };

        return dfs(0,n-1);

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
| [Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/) | Hard |
