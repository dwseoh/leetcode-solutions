class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0;
        int r = height.size() - 1;
        int leftMax = height[l]; //
        int rightMax = height[r];
        int area = 0;

        while (l<r) {
            if (height[l] < height[r]) {  // area determined by leftMax 
                leftMax = max(leftMax,height[l]);
                area += leftMax-height[l]; // leftMax is already the dependent height because height[l] < height[r] assures that min(height[r],leftMax) = leftMax
                l++;
                
            } else {
                rightMax = max(rightMax,height[r]);
                area += rightMax-height[r]; 
                r--;
            }
        }

        return area;


    }
};
