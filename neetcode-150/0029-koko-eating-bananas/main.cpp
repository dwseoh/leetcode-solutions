class Solution {
public:


    int compute(vector<int>& piles, int k) {
        int res = 0;
        for (auto pile: piles) {
            res += ceil((double)pile/k);
        }

        return res;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int max = piles[0];
        for (auto pile: piles) {
            if (pile>max) max = pile;
        }
        
        int left = 1;
        int right = max;
        int current_k;
        int computed_h;

        while (left<right) {
            current_k = left+(right-left)/2;
            computed_h = compute(piles,current_k); // the # of hrs

            if (computed_h > h) {
                left = current_k + 1;
            } else {
                right = current_k;
            }

        }

        return left;
    }
};
