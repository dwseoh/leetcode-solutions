# 061. Last Stone Weight

**Difficulty:** `Easy`  
**Acceptance Rate:** `66.4%`  
**Topics:** `array` `heap`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-04  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/last-stone-weight/)

---

## Problem

> You are given an array of integers stones where stones[i] is the weight of the ith stone.
We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
If x == y, both stones are destroyed, and
	If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.
Return the weight of the last remaining stone. If there are no stones left, return 0.

**Example 1:**
```
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
```

**Example 2:**
```
Input: stones = [1]
Output: 1
```

**Constraints:**
- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n log k)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    priority_queue<int> pq;

    int lastStoneWeight(vector<int>& stones) {
        for (auto stone: stones) {
            pq.push(stone);
        }

        while (pq.size()>1) {
            int stone1 = pq.top(); pq.pop(); // bigger
            int stone2 = pq.top(); pq.pop();

            if (stone1>stone2) {
                pq.push(stone1-stone2);
            }
        }

        if (pq.empty()) return 0;
        else return pq.top();
 
    }

    /*
    priority_queue<int, vector<int>, greater<int>> pq;

    // vs max heap - priority_queue<int>

    KthLargest(int k, vector<int>& nums) {
        k_pos = k;
        for (auto num: nums) {
            add(num);
        }
    }
    
    int add(int val) {
        pq.push(val);
        if ((int)pq.size() > k_pos) pq.pop();
        return pq.top();  

    }


    */
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
