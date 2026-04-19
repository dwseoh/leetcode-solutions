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


/* optimized version

vector<int> getNewsFeed(int userId) {
    // (timestamp, tweetId, ownerUserId, indexInOwnerTweets)
    priority_queue<tuple<int, int, int, int>> feed;

    auto pushLatest = [&](int uid) {
        auto& t = tweets[uid];
        if (!t.empty()) {
            int idx = t.size() - 1;  // last = most recent
            feed.push({t[idx].first, t[idx].second, uid, idx});
        }
    };

    pushLatest(userId);
    for (int f : followed[userId]) {
        if (f != userId) pushLatest(f);
    }

    vector<int> res;
    while (!feed.empty() && res.size() < 10) {
        auto [ts, tid, uid, idx] = feed.top();
        feed.pop();
        res.push_back(tid);

        // Push the next-older tweet from the same user
        if (idx > 0) {
            auto& t = tweets[uid];
            feed.push({t[idx-1].first, t[idx-1].second, uid, idx-1});
        }
    }

    return res;
}
    
Walking through it
Say user 1 follows A, B, C. Each user has tons of tweets. Start with one tweet per user in the heap (the latest one each):
heap: [A's t=15, B's t=11, C's t=18]
Pop max → C's t=18. Result: [18]. Now push C's next-latest (t=12):
heap: [A's t=15, B's t=11, C's t=12]
Pop max → A's t=15. Result: [18, 15]. Push A's next-latest (t=9):
heap: [A's t=9, B's t=11, C's t=12]
Pop max → C's t=12. Result: [18, 15, 12]. Push C's next (t=8):
heap: [A's t=9, B's t=11, C's t=8]


*/