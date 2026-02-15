# 005. Top K Frequent Elements

**Difficulty:** `Medium`  
**Acceptance Rate:** `65.8%`  
**Topics:** `array` `hash-map` `divide-and-conquer` `sorting` `heap` `bucket-sort` `counting` `quickselect`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-15  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/top-k-frequent-elements/)

---

## Problem

> Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

**Example 1:**
```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Example 2:**
```
Input: nums = [1], k = 1
Output: [1]
```

**Example 3:**
```
Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
Output: [1,2]
```

**Constraints:**
- `1 <= nums.length <= 105`
- `-104 <= nums[i] <= 104`
- `k is in the range [1, the number of unique elements in the array].`
- `It is guaranteed that the answer is unique.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
First I thought of making a frequency hash map and sorting it by frequency, but that would be O(n log n) time complexity.

Then I looked at the hint and learned about bucket sort. 

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Make a frequency hash map.
2. Make a bucket array of size n + 1.
3. Iterate through the frequency hash map and add the key to the bucket at the index of the value.
4. Iterate through the bucket array in reverse order and add the keys to the result list until the result list has k elements.

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freqs = {}
        for num in nums:
            if num not in freqs:
                freqs[num] = 0
            
            freqs[num] += 1
        
        
        buckets = [[] for _ in range(len(nums) + 1)]

        for key,val in freqs.items():
            buckets[val].append(key)

        res = []
        
        for i in range(len(buckets) - 1, 0, -1):
            for n in buckets[i]:
                res.append(n)
                if len(res) == k:
                    return res

        


# bucket sort
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
| [Word Frequency](https://leetcode.com/problems/word-frequency/) | Medium |
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium |
| [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) | Medium |
| [Split Array into Consecutive Subsequences](https://leetcode.com/problems/split-array-into-consecutive-subsequences/) | Medium |
| [Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/) | Medium |
| [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) | Medium |
| [Sort Features by Popularity](https://leetcode.com/problems/sort-features-by-popularity/) | Medium |
| [Sender With Largest Word Count](https://leetcode.com/problems/sender-with-largest-word-count/) | Medium |
| [Most Frequent Even Element](https://leetcode.com/problems/most-frequent-even-element/) | Easy |
| [Linked List Frequency](https://leetcode.com/problems/linked-list-frequency/) | Easy |
