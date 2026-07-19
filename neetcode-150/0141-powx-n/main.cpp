class Solution {
public:
    double myPow(double x, int n) {
        if (!x) return 0;
        if (!n) return 1;

        if (n<0) {
            x = 1/x;
            n *= -1;
        }

        double res = 1;
        long exp = abs((long)n);

        while (exp){
            if (exp&1) res*=x;
            x*=x;
            exp>>=1;
        }

        return res;
    }
};
