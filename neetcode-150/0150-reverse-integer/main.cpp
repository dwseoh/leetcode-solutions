class Solution {
public:
    int reverse(int x) {
        int res = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;
            // overflow checks before res = res * 10 + digit
            if (res > INT_MAX / 10 || (res == INT_MAX / 10 && digit > 7)) return 0;
            if (res < INT_MIN / 10 || (res == INT_MIN / 10 && digit < -8)) return 0;
            res = res * 10 + digit;
        }
        return res;
    }
};

// INT_MAX =  2147483647   ← ends in 7
// INT_MIN = -2147483648   ← ends in 8
// overflow edge case