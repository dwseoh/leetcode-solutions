# 032. Time Based Key-Value Store

**Difficulty:** `Medium`  
**Acceptance Rate:** `49.8%`  
**Topics:** `hash-map` `string` `binary-search` `design`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-18  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/time-based-key-value-store/)

---

## Problem

> Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.
Implement the TimeMap class:
TimeMap() Initializes the object of the data structure.
	void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
	String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".

**Example 1:**
```
Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
```

**Constraints:**
- `1 <= key.length, value.length <= 100`
- `key and value consist of lowercase English letters and digits.`
- `1 <= timestamp <= 107`
- `All the timestamps timestamp of set are strictly increasing.`
- `At most 2 * 105 calls will be made to set and get.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Use a dictionary with a 2d array that contains tuples of entries to store the information

Perform binary search on the specific key (the corresponding 2d array) with the timestamp as the #

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. If key not in dict, return ""
2. Binary search on the list of (timestamp, value) pairs for that key
3. If mid_ts == timestamp, return that value immediately (exact match)
4. If mid_ts < timestamp, save current value as best candidate, search right half
5. If mid_ts > timestamp, search left half
6. When loop ends, return best candidate ("" if none was ever saved)


**Time Complexity:** `O(log n)` for get(), `O(1)` for set() 
**Space Complexity:** `O(n^2)`

---

## Solution

```python
class TimeMap:

    # dictionary
    # imp1: nested dict -> o(n^2) timespace and o(1) lookup -> clarify nested dic
    # imp2: dict with an array inside -> binary serach O(log n) lookup
    def __init__(self):
        self._info = {}
        

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self._info:
            self._info[key] = []
        
        print(timestamp,key,value)
        self._info[key].append((timestamp,value))
        print(self._info)
        

    def get(self, key: str, timestamp: int) -> str:

        if key not in self._info:
            return ""

        # binary search
        l = 0
        r = len(self._info[key])-1
        mid = 0
        result = ""

        while l<=r:
            
            mid = (r-l)//2+l
            print(l,r,mid)
            mid_num = self._info[key][mid][0]

            if mid_num ==timestamp:
                return self._info[key][mid][1]

            elif mid_num < timestamp:

                #only update here (lower bound)
                result = self._info[key][mid][1]
                l = mid+1
                
            else:
                r = mid-1
                
        # 1 3 5 8 # want 11
        
        return result
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
| [Stock Price Fluctuation ](https://leetcode.com/problems/stock-price-fluctuation/) | Medium |
