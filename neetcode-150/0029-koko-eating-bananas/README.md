# 029. Koko Eating Bananas

**Difficulty:** `Medium`  
**Acceptance Rate:** `49.8%`  
**Topics:** `array` `binary-search`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-15  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/koko-eating-bananas/)

---

## Problem

> Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.
Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
Return the minimum integer k such that she can eat all the bananas within h hours.

**Example 1:**
```
Input: piles = [3,6,7,11], h = 8
Output: 4
```

**Example 2:**
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

**Example 3:**
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

**Constraints:**
- `1 <= piles.length <= 104`
- `piles.length <= h <= 109`
- `1 <= piles[i] <= 109`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Binary search but I was not sure how to set the bounds.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Search space is k (eating speed), not the piles — left = 1, right = max(piles)
2. Compute midpoint current_k = left + (right - left) / 2
3. If compute(current_k) > h → too slow → left = current_k + 1
4. If compute(current_k) <= h → valid but maybe not minimum → right = current_k
5. Repeat until left == right
6. Return left (or right, as this is the most optimal)

**Time Complexity:** `O(n log m)`  
**Space Complexity:** `O(1)`

---

## Solution

```cpp
class Solution {
public:


    int compute(vector<int>& piles, int k) {
        int res = 0;
        for (auto pile: piles) {
            res += ceil((double)pile/k);
        }

        return res;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int max = piles[0];
        for (auto pile: piles) {
            if (pile>max) max = pile;
        }
        
        int left = 1;
        int right = max;
        int current_k;
        int computed_h;

        while (left<right) {
            current_k = left+(right-left)/2;
            computed_h = compute(piles,current_k); // the # of hrs

            if (computed_h > h) {
                left = current_k + 1;
            } else {
                right = current_k;
            }

        }

        return left;
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
| [Minimize Max Distance to Gas Station](https://leetcode.com/problems/minimize-max-distance-to-gas-station/) | Hard |
| [Maximum Candies Allocated to K Children](https://leetcode.com/problems/maximum-candies-allocated-to-k-children/) | Medium |
| [Minimized Maximum of Products Distributed to Any Store](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/) | Medium |
| [Frog Jump II](https://leetcode.com/problems/frog-jump-ii/) | Medium |
| [Minimum Time to Repair Cars](https://leetcode.com/problems/minimum-time-to-repair-cars/) | Medium |
