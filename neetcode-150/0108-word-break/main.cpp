class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        int n = s.size();
        vector<int> memo(n+1,-1); // -1 is uncomputed, 0 is false, 1 is true
        // "Can the substring s[i..n-1] — everything from index i to the end — be segmented entirely into words from the dictionary?"
        
        function<bool(int)> dfs = [&](int start) -> bool {
            if (start==n) return true;
            // with substring/index DP, "done" almost always means the pointer reached n
            if (memo[start] != -1) return memo[start]; 

            for (const string& word: wordDict) {
                int len = word.size();
                if (start+len>n) continue;

                bool matches = true;        
                for (int i = 0; i<len;i++) {
                    if (s[start+i] != word[i]) {
                        matches = false;
                        break;
                    }
                }

                if (matches && dfs(start+len)) return memo[start] = 1;
            }

            // shorter version of this for loop
            // for (int end = start + 1; end <= n; end++) {
            //     if (dict.count(s.substr(start, end - start)) && dfs(end)) {
            //         return memo[start] = 1;
            //     }
            // }
            // requires defining:
            // unordered_set<string> dict(wordDict.begin(), wordDict.end()); 

            // return false and mark memo[start] false
            return memo[start] = 0;
        };

        return dfs(0);

    }

};
