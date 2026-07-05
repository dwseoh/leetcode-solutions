class Solution {
public:
    int countSubstrings(string s) {
        int res = 0;
        int n = s.size();

        auto expand = [&](int l, int r) -> int {
            int cnt = 0;
            while (l>=0 && r<n && s[l] == s[r]) {
                l--; r++; cnt++;
            }
            return cnt; 
        };

        for (int i=0;i<n;i++) {
            res += expand(i,i);
            res += expand(i,i+1);
        }

        return res;
    }
};
