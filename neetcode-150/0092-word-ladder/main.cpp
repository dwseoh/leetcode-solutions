class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;

        queue<string> q;
        q.push(beginWord);
        int steps = 1;

        // standard bfs 
        // skips the explicit adjacency list and generates neighbors 
        // by wildcarding each position, using the dictionary itself as the visited set
        while (!q.empty()) {
            int sz = q.size();
            while (sz--) {
                string cur = q.front(); q.pop();
                if (cur == endWord) return steps;

                for (int i = 0; i < (int)cur.size(); i++) {
                    char orig = cur[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        cur[i] = c;
                        // seeing if the candidate is real
                        // for the swapped wildcard letter
                        if (dict.count(cur)) {
                            dict.erase(cur);   // mark visited
                            q.push(cur);
                        }
                    }
                    cur[i] = orig; // restore 
                }
            }
            steps++;
        }
        return 0;
    }
};