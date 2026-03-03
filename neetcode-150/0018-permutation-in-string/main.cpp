class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int freq[26] = {0};
        int cur[26] = {0};

        int window_len = s1.length();
        int n = s2.length();

        if (window_len>n) {
            return false;
        }

        for (char c: s1) {
            freq[c-'a'] ++;
        }

        for (int j=0;j<window_len;j++) {
            cur[s2[j]-'a'] ++;
        }
        
        int match = 0;
        for (int j=0;j<26;j++) {
            if (freq[j]==cur[j]) {
                match++;
            } 
        }

        if (match==26) return true;
        
        for (int i=window_len;i<n;i++) {
            
            // incoming char:
            int idx = s2[i] - 'a';
            if (cur[idx] == freq[idx]) match--;  
            cur[idx]++;
            if (cur[idx] == freq[idx]) match++; 

            // outgoing char:
            idx = s2[i - window_len] - 'a';
            if (cur[idx] == freq[idx]) match--;  
            cur[idx]--;
            if (cur[idx] == freq[idx]) match++;  

            if (match==26) return true;

        }

        return false;


    }
};
