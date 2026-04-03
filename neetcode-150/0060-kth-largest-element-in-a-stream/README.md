# 060. Kth Largest Element in a Stream

**Difficulty:** `Easy`  
**Acceptance Rate:** `60.8%`  
**Topics:** `tree` `design` `binary-search-tree` `heap` `tree` `data-stream`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-03  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

---

## Problem

> You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.
You are tasked to implement a class which, for a given integer k, maintains a stream of test scores and continuously returns the kth highest test score after a new score has been submitted. More specifically, we are looking for the kth highest score in the sorted list of all scores.
Implement the KthLargest class:
KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of test scores nums.
	int add(int val) Adds a new test score val to the stream and returns the element representing the kth largest element in the pool of test scores so far.

**Example 1:**
```
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation:
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3); // return 4
kthLargest.add(5); // return 5
kthLargest.add(10); // return 5
kthLargest.add(9); // return 8
kthLargest.add(4); // return 8
```

**Example 2:**
```
Input:
["KthLargest", "add", "add", "add", "add"]
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]
Output: [null, 7, 7, 7, 8]
Explanation:
```

**Constraints:**
- `0 <= nums.length <= 104`
- `1 <= k <= nums.length + 1`
- `-104 <= nums[i] <= 104`
- `-104 <= val <= 104`
- `At most 104 calls will be made to add.`

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
class KthLargest {
public:
    int k_pos;

    // min heap
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
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium |
| [Finding MK Average](https://leetcode.com/problems/finding-mk-average/) | Hard |
| [Sequentially Ordinal Rank Tracker](https://leetcode.com/problems/sequentially-ordinal-rank-tracker/) | Hard |
