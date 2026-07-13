class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> seen;

        while (n != 1 && !seen.count(n)) {
            seen.insert(n);
            
            int res = 0;
            int tmp = n;

            while (tmp != 0) {
                int digit = tmp % 10;
                res += digit * digit;
                tmp /= 10;
            }

            n = res;
        }

        return n == 1;
    }
};