# 2424. Longest Uploaded Prefix

**Difficulty:** `Medium`  
**Acceptance Rate:** `55.4%`  
**Topics:** `hash-map` `binary-search` `union-find` `design` `binary-indexed-tree` `segment-tree` `heap` `ordered-set`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-08-14  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/longest-uploaded-prefix/)

---

## Problem

> You are given a stream of n videos, each represented by a distinct number from 1 to n that you need to "upload" to a server. You need to implement a data structure that calculates the length of the longest uploaded prefix at various points in the upload process.
We consider i to be an uploaded prefix if all videos in the range 1 to i (inclusive) have been uploaded to the server. The longest uploaded prefix is the maximum value of i that satisfies this definition.

Implement the LUPrefix class:
LUPrefix(int n) Initializes the object for a stream of n videos.
	void upload(int video) Uploads video to the server.
	int longest() Returns the length of the longest uploaded prefix defined above.

**Example 1:**
```
Input
["LUPrefix", "upload", "longest", "upload", "longest", "upload", "longest"]
[[4], [3], [], [1], [], [2], []]
Output
[null, null, 0, null, 1, null, 3]

Explanation
LUPrefix server = new LUPrefix(4);   // Initialize a stream of 4 videos.
server.upload(3);                    // Upload video 3.
server.longest();                    // Since video 1 has not been uploaded yet, there is no prefix.
                                     // So, we return 0.
server.upload(1);                    // Upload video 1.
server.longest();                    // The prefix [1] is the longest uploaded prefix, so we return 1.
server.upload(2);                    // Upload video 2.
server.longest();                    // The prefix [1,2,3] is the longest uploaded prefix, so we return 3.
```

**Constraints:**
- `1 <= n <= 105`
- `1 <= video <= n`
- `All values of video are distinct.`
- `At most 2 * 105 calls in total will be made to upload and longest.`
- `At least one call will be made to longest.`

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
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class LUPrefix {
private:
    vector<int> server_data;
    int server_size = 0;
    int memo = 0;
    int last_idx = 0;


public:
    LUPrefix(int n) : server_data(n, -1), server_size(n) {}

    void upload(int video) {
        server_data[video-1] = 1;
    }
    
    int longest() {
        int res = memo;
        int i = last_idx;

        for (; i<server_size; i++) {
            if (server_data[i] != -1) res ++;
            else break;
        }
        last_idx = i;

        return memo = res;
    }
};

/**
 * Your LUPrefix object will be instantiated and called as such:
 * LUPrefix* obj = new LUPrefix(n);
 * obj->upload(video);
 * int param_2 = obj->longest();
 */
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
| [Design an Ordered Stream](https://leetcode.com/problems/design-an-ordered-stream/) | Easy |
| [Find X Value of Array II](https://leetcode.com/problems/find-x-value-of-array-ii/) | Hard |
