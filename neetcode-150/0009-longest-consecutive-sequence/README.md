# 009. Longest Consecutive Sequence

**Difficulty:** `Medium`  
**Acceptance Rate:** `47%`  
**Topics:** `array` `hash-map` `union-find`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-18  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-consecutive-sequence/)

---

## Problem

> Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.

**Example 1:**
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

**Example 2:**
```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

**Example 3:**
```
Input: nums = [1,0,1,2]
Output: 3
```

**Constraints:**
- `0 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Initially, I thought about implementing counting sort by making a list with the nums except each element gets the nums[i] amount of entries and then forcing counting sort.

But then I realized a better solution with a hash set to store the numbers and then identify the start of sequences. 

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Initalize a hash set with all the numbers
2. Iterate through the numbers and check if the number minus 1 is in the hash set. If not, it's the start of a sequence
3. For each sequence, iterate through the numbers and check if the number plus 1 is in the hash set. If not, it's the end of a sequence
4. Keep track of the longest sequence found so far, return the longest length


**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:

    // first intution: could force counting sort by making a list with the nums except
    // each element gets the nums[i] amount of entries and then forcing counting sort 

    // make hash set for O(1) lookup and then identify start of sequences
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> hash;
        vector<int> seqs;
        int n = nums.size();
        int max = 0;

        for (int i=0;i<n;i++) {
            hash.insert(nums[i]);
        }

        for (int i=0;i<n;i++) {
            if (!hash.count(nums[i]-1)) {
                seqs.push_back(nums[i]);
            }
        }

        for (int i=0;i<seqs.size();i++) {
            int tmp = seqs[i];
            while (hash.count(tmp+1)) {
                tmp++;
            }

            tmp = tmp - seqs[i] + 1;

            if (tmp>max) max = tmp;

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
| [Binary Tree Longest Consecutive Sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/) | Medium |
| [Find Three Consecutive Integers That Sum to a Given Number](https://leetcode.com/problems/find-three-consecutive-integers-that-sum-to-a-given-number/) | Medium |
| [Maximum Consecutive Floors Without Special Floors](https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors/) | Medium |
| [Length of the Longest Alphabetical Continuous Substring](https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring/) | Medium |
| [Find the Maximum Number of Elements in Subset](https://leetcode.com/problems/find-the-maximum-number-of-elements-in-subset/) | Medium |
