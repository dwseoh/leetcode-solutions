class Solution {
public:
    int dfs(const string& s, vector<int>& memo, int i, int n) {
        if (i == n) return 1; // out of bounds lol 
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i]; // cached

        int total = dfs(s, memo, i+1,n);
        if (i+1<n) {
            int two = (s[i]-'0')*10+(s[i+1]-'0');
            if (10<=two && two<=26) {
                total += dfs(s, memo, i+2, n); // skipping over one 
            }
        }

        return memo[i] = total;
    }


    int numDecodings(string s) {
        int n = s.size();
        vector<int> memo(n, -1);
        return dfs(s,memo,0,n);
    }
};
