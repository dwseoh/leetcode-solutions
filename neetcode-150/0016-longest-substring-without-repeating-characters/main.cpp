class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int ptr1 = 0;
        int ptr2 = 0;
        int n = s.length();
        int maxL = 0;

        unordered_set<int> used;

        while (ptr2<n) {
            
            if (used.count(s[ptr2]) > 0) {
                used.erase(s[ptr1]);
                ptr1+=1;
        

            } else {
                used.insert(s[ptr2]);
                ptr2++;
            }

            maxL = max(maxL,ptr2-ptr1);
            
        }

  

        return maxL;

    }
};

