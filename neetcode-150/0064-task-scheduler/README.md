# 064. Task Scheduler

**Difficulty:** `Medium`  
**Acceptance Rate:** `62.9%`  
**Topics:** `array` `hash-map` `greedy` `sorting` `heap` `counting`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-13  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/task-scheduler/)

---

## Problem

> You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.
Return the minimum number of CPU intervals required to complete all tasks.

**Example 1:**
```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.
```

**Example 2:**
```
Input: tasks = ["A","C","A","B","D","B"], n = 1
Output: 6
Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
With a cooling interval of 1, you can repeat a task after just one other task.
```

**Example 3:**
```
Input: tasks = ["A","A","A", "B","B","B"], n = 3
Output: 10
Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.
```

**Constraints:**
- `1 <= tasks.length <= 104`
- `tasks[i] is an uppercase English letter.`
- `0 <= n <= 100`

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


    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char,int> freq;
        int time = 0; 
        priority_queue<int> pq;
        queue<pair<int, int>> cooldown;

        for (char task: tasks) freq[task]++;
        
        for (auto& [key, value] : freq) pq.push(value);

        while (!pq.empty() || !cooldown.empty()) {

            // move tasks off cooldown if ready
            if (!cooldown.empty() && cooldown.front().second <= time) {
                pq.push(cooldown.front().first);
                cooldown.pop();
            }

            // pick most priority one
            if (!pq.empty()) {
                int cnt = pq.top()-1;
                pq.pop();
                if (cnt>0) cooldown.push({cnt, time + n + 1});
            }

            // else idle
            time++;

        }

        return time;

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
| [Rearrange String k Distance Apart](https://leetcode.com/problems/rearrange-string-k-distance-apart/) | Hard |
| [Reorganize String](https://leetcode.com/problems/reorganize-string/) | Medium |
| [Maximum Number of Weeks for Which You Can Work](https://leetcode.com/problems/maximum-number-of-weeks-for-which-you-can-work/) | Medium |
| [Find Minimum Time to Finish All Jobs II](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs-ii/) | Medium |
| [Task Scheduler II](https://leetcode.com/problems/task-scheduler-ii/) | Medium |
| [Generate Schedule](https://leetcode.com/problems/generate-schedule/) | Medium |
