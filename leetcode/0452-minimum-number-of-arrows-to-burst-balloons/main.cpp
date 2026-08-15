class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(),points.end());
        int res = 1;
        int hi = points[0][1];

        for (int i = 1; i < points.size(); i++) {
            if (points[i][0] <= hi) {
                hi = min(hi,points[i][1]);
            } else {
                res++;
                hi = points[i][1];
            }
        }


        return res;

    }
};