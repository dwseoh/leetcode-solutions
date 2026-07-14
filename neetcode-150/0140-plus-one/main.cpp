class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        reverse(digits.begin(), digits.end());
        int n= digits.size();
        digits[0] += 1;
        int i = 0;
        while (digits[i] >= 10 && i<n-1) {
            digits[i] -= 10;
            digits[(i++)+1]+=1;
        }

        if (digits[n-1] >= 10) {
            digits[n-1] -= 10;
            digits.push_back(1);
        }

        reverse(digits.begin(), digits.end());

        return digits;
    }
};
