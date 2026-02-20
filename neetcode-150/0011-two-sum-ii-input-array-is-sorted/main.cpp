class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int ptr1 = 0;
        int ptr2 = numbers.size()-1;
        int curr;

        while (ptr1<ptr2) {
            curr = numbers[ptr1] + numbers[ptr2];

            if (curr==target) return vector<int>{ptr1+1, ptr2+1};
            else if (curr < target) ptr1++;
            else if (curr > target) ptr2--;
        }

        return {};

    }
};

