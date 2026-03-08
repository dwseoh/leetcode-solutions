class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int left = 0;
        int right = matrix.size()-1;

        while (left<=right) {
            int mid = (right-left)/2+left;
            if (matrix[mid][0] == target) return true;
            else if (matrix[mid][0] > target) right = mid-1;
            else if (matrix[mid][0] < target) left = mid+1;
        }

        if (right < 0) return false; 

        int idx = right;
        left = 0;
        right = matrix[idx].size()-1;

        while (left<=right) {
            int mid = (right-left)/2+left;

            if (matrix[idx][mid] == target) return true;
            else if (matrix[idx][mid] > target) right = mid-1;
            else if (matrix[idx][mid] < target) left = mid+1;
        }

        return false;


    }
};
