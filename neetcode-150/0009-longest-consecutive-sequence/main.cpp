class Solution {
public:

    // first intution: could force counting sort by making a list with the nums except
    // each element gets the nums[i] amount of entries and then forcing counting sort 

    // make hash set for O(1) lookup and then identify start of sequences
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> hash;
        vector<int> seqs;
        int n = nums.size();
        int max = 0;

        for (int i=0;i<n;i++) {
            hash.insert(nums[i]);
        }

        for (int i=0;i<n;i++) {
            if (!hash.count(nums[i]-1)) {
                seqs.push_back(nums[i]);
            }
        }

        for (int i=0;i<seqs.size();i++) {
            int tmp = seqs[i];
            while (hash.count(tmp+1)) {
                tmp++;
            }

            tmp = tmp - seqs[i] + 1;

            if (tmp>max) max = tmp;

        }

        return max;

    }
};
