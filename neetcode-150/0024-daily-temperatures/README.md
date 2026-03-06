# 024. Daily Temperatures

**Difficulty:** `Medium`  
**Acceptance Rate:** `68.4%`  
**Topics:** `array` `stack` `monotonic-stack`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-06  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/daily-temperatures/)

---

## Problem

> Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

**Example 1:**
```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

**Example 2:**
```
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

**Example 3:**
```
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

**Constraints:**
- `1 <= temperatures.length <= 105`
- `30 <= temperatures[i] <= 100`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I knew it was a stack problem, but I wasn't sure how to approach it. Then I accidentally cheated because I searched up what a monotonic stack is.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Use a stack to store the indices of the temperatures
2. Iterate through the temperatures
3. If the current temperature is greater than the temperature at the index stored at the top of the stack, pop the index from the stack and calculate the difference between the current index and the index stored at the top of the stack
4. Push the current index onto the stack

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // Monotonic Increasing Stack (finds next greater element)
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st; // stores indices

        for (int i = 0; i < n; i++) {
            // while stack is not empy and it doesnt break the property
            while (!st.empty() && temperatures[st.top()] < temperatures[i]) {
                res[st.top()] = i;  // the greatest number index in front of the cur element 
                st.pop();
            }
            st.push(i); //queue index 
        }

        for (int i=0;i<n;i++) {
            if (res[i]!=0)
            res[i] = res[i]-i;
        } 

        return res;
    
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
| [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) | Easy |
| [Online Stock Span](https://leetcode.com/problems/online-stock-span/) | Medium |
