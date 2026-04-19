# 065. Design Twitter

**Difficulty:** `Medium`  
**Acceptance Rate:** `44.5%`  
**Topics:** `hash-map` `linked-list` `design` `heap`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-19  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/design-twitter/)

---

## Problem

> Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.
Implement the Twitter class:
Twitter() Initializes your twitter object.
	void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.
	List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
	void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
	void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.

**Example 1:**
```
Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]

Explanation
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
```

**Constraints:**
- `1 <= userId, followerId, followeeId <= 500`
- `0 <= tweetId <= 104`
- `All the tweets have unique IDs.`
- `At most 3 * 104 calls will be made to postTweet, getNewsFeed, follow, and unfollow.`
- `A user cannot follow himself.`

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
class Twitter {
private:
    unordered_map<int,unordered_set<int>> followed;
    unordered_map<int,vector<pair<int,int>>> tweets;
    int count;


public:
    Twitter() {
        count = 0;
    }
    
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({count, tweetId});
        count++;
    }
    
    vector<int> getNewsFeed(int userId) {
        priority_queue<pair<int,int>> feed; // max heap

        for (const auto& tweet: tweets[userId]) {
            feed.push(tweet);
        }

        for (auto following: followed[userId]) {
            if (following == userId) continue;  
            for (auto tweet: tweets[following]) {
                feed.push(tweet);
            }
        }

        vector<int> res;

        while (!feed.empty() && res.size() < 10) {
            res.push_back(feed.top().second);
            feed.pop();
        }

        return res;
        
    }
    
    void follow(int followerId, int followeeId) {
        followed[followerId].insert(followeeId);   
    }
    
    void unfollow(int followerId, int followeeId) {
        followed[followerId].erase(followeeId);   
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
| [Design a File Sharing System](https://leetcode.com/problems/design-a-file-sharing-system/) | Medium |
