class Solution {
public:
    bool isPalindrome(int x) {
        string s = to_string(x);
        int ptr1 = 0;
        int ptr2 = s.size()-1;

        while (ptr1<ptr2) {
            if (s[ptr1] != s[ptr2]) return false;
            ptr1++;ptr2--;
        }
        return true;
    }
};