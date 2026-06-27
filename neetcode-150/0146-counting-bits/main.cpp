class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++)
            dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
};

// class Solution {
// public:
//     vector<int> countBits(int n) {
//         vector<int> dp(n + 1);   // dp[0] = 0
//         int offset = 1;          // largest power of 2 <= i
//         for (int i = 1; i <= n; i++) {
//             if (offset * 2 == i) offset *= 2;
//             dp[i] = dp[i - offset] + 1;
//         }
//         return dp;
//     }
// }; 