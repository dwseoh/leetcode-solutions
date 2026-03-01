class Solution {
public:

    int maxProfit(vector<int>& prices) {
        int ptr1 = 0;
        int ptr2 = 1;
        int n = prices.size();
        int maxP = 0;

        while (ptr2<n) {
            if (prices[ptr1] < prices[ptr2]) {
                maxP = max(maxP,prices[ptr2]-prices[ptr1]);
            } else {
                ptr1=ptr2;
            }
            ptr2++;

        }

        return maxP;

    }

    // // brute force
    // int maxProfit(vector<int>& prices) {
    //     int res = 0; int n = prices.size();
    //     for (int i = 0;i<n;i++) {
    //         for (int j=i+1;j<n;j++) {
    //             res = max(res, prices[j]-prices[i]);
    //         }
    //     }

    //     return res;

    // }
};
