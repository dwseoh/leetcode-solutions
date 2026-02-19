class Solution {
public:
    bool isPalindrome(string s) {
        int ptr1 = 0;
        int ptr2 = s.size() - 1;

        while (ptr1 < ptr2) {
            // skip non-alphanumeric from left
            while (ptr1 < ptr2 && !((s[ptr1] >= 'a' && s[ptr1] <= 'z') || (s[ptr1] >= 'A' && s[ptr1] <= 'Z') || (s[ptr1] >= '0' && s[ptr1] <= '9'))) {
                ptr1++;
            }

            // skip non-alphanumeric from right
            while (ptr1 < ptr2 && !((s[ptr2] >= 'a' && s[ptr2] <= 'z') || (s[ptr2] >= 'A' && s[ptr2] <= 'Z') || (s[ptr2] >= '0' && s[ptr2] <= '9'))) {
                ptr2--;
            }

            // lowercase conversion
            char s1 = s[ptr1];
            char s2 = s[ptr2];
            if (s1 >= 'A' && s1 <= 'Z') s1 = s1 - 'A' + 'a';
            if (s2 >= 'A' && s2 <= 'Z') s2 = s2 - 'A' + 'a';

            if (s1 != s2) return false;
            ptr1++; ptr2--;
        }

        return true;
    }
};
