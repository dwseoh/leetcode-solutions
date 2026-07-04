class Solution {
public:
    string longestPalindrome_dp(string s) {
        int n = s.size();
        // let dp[i][j] be true if the substring s[i..j] is a palindrome.
        // dp[i][j] = (s[i] == s[j]) && (j - i < 2 || dp[i+1][j-1])
        vector<vector<bool>> dp(n,vector<bool>(n,false));
        int start = 0, maxLen = 1;

        // 
        for (int i = 0; i<n; i++) dp[i][i] = true;

        // len is the substring length we're currently filling in
        for (int len = 2; len<=n; len++) {
            for (int i = 0; i+len-1 < n; i++) { // i = left bound
                int j = i+len-1; // j = right bound 
                if (s[i] == s[j] && (len==2 || dp[i+1][j-1])) {
                    // we're checking inward bound i+1,j-1 because those are prereq
                    // in order for the next outer one to be considered
                    dp[i][j] = true;
                    if (len > maxLen) {
                        maxLen = len;
                        start = i;
                    }
                }
            }
        }

        return s.substr(start,maxLen);
    }
    // dp[i][j] depends on dp[i+1][j-1]


    string longestPalindrome(string s) {
        // 2 pointer appraoch, o(n^2) time complex, o(1) space complex
        int maxLen = 0;
        int n = s.size();
        int start = 0;

        auto expand = [&](int l, int r) {
            while (r<n && l>=0 && s[l] == s[r]) {
                if (r-l+1>maxLen) {
                    maxLen = r-l+1;
                    start = l;
                }
                l--; r++;
            }
        }; // could refactor so move l,r pointers first then check if max
        // since useless to compute while moving l,r pointers 

        for (int i = 0; i<n; i++) {
            expand(i, i); // odd length
            expand(i,i+1);  // even length
        }

        return s.substr(start,maxLen);
    }
};

// also possible through Manacher's algorithm
