class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> output;

        int top = 0;
        int bottom = matrix.size() - 1;
        int left = 0;
        int right = matrix[0].size() - 1;

        while (top <= bottom && left <= right) {

            // left -> right
            for (int col = left; col <= right; col++) {
                output.push_back(matrix[top][col]);
            }
            top++;

            // top -> bottom
            for (int row = top; row <= bottom; row++) {
                output.push_back(matrix[row][right]);
            }
            right--;

            // right -> left
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    output.push_back(matrix[bottom][col]);
                }
                bottom--;
            }

            // bottom -> top
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    output.push_back(matrix[row][left]);
                }
                left++;
            }
        }

        return output;
    }
};