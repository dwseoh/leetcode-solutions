class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int ans = nums.size();

        for (int i = 0; i < nums.size(); i++) {
            ans ^= i;
            ans ^= nums[i];
        }

        // one without a partner is the missing one, the answer

        return ans;
    }
};

// class Solution {
// public:
//     int missingNumber(vector<int>& nums) {
//         unordered_set<int> seen;
//         int maxN = -1;
//         for (const int num: nums) {
//             seen.insert(num);
//             maxN = max(maxN,num);
//         }

//         for (int i = 0; i < maxN+1; i++) {
//             if (seen.count(i) > 0) {
//                 continue;
//             } else return i;
//         }

//         return maxN+1;


//     }
// };
