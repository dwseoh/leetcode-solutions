class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();
        sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            return a[1] < b[1]; // Compare the 2nd element (index 1)
        });
        // to maximize how many intervals you can keep, we sort by the end range. 

        int res = 0;
        int hi = intervals[0][1];

        for (int i=1;i<intervals.size();i++) {
            if (intervals[i][0] < hi) res++;
            else hi = intervals[i][1];
        }

        return res;
    }
};