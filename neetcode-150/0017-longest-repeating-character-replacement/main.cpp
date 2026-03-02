class Solution {
public:
    int characterReplacement(string s, int k) {
        unordered_map<char,int> freq;
        int maxLen = 0;
        int maxFreq = 0;
        int left = 0;
        int n = s.length();

        for (int right = 0; right < n; right++ ) {
            freq[s[right]]++;
            maxFreq = max(maxFreq, freq[s[right]]);

            int windowSize = right-left+1;

            if (windowSize-maxFreq > k ) {
                freq[s[left]]--;
                left++;
            }

            maxLen = max(maxLen, right-left+1);
        }

        return maxLen;

    }
};
