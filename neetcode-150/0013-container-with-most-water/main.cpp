class Solution {
public:
    int maxArea(vector<int>& heights) {
        int max = 0;
        int cur;
        int ptr1=0;
        int ptr2=heights.size()-1;

        while (ptr1<ptr2) {
            cur = (ptr2-ptr1)*(min(heights[ptr2],heights[ptr1]));
            if (max < cur) max = cur;

            if (heights[ptr1]<heights[ptr2]) ptr1++;
            else ptr2--;

        }

        return max;


    }
};
