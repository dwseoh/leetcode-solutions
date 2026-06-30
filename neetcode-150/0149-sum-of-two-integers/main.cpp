class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            unsigned carry = (unsigned)(a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};

// class Solution {
// public:
//     int getSum(int a, int b) {
//         int c = 0;
//         int res = 0;
//         for (int i = 0; i<32; i++) {
//             int bit = (a&1)+(b&1)+c;
//             res |= ((bit&1)<<i);
//             a>>=1; b>>=1;
//             c = (bit>>1)&1;
//         }
//         return res;
//     }
// };
