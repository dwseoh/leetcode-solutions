class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        // the first row + column of the matrix is going to 
        // store info about if that row/column needs to be zeroed out
        // that's why we check if first row, first column has zero
        // since at the end we're gonna have to zero-out if so.
        
        bool firstRowHasZero = false;
        bool firstColumnHasZero = false;
        for (int i = 0; i<n;i++) if (matrix[0][i] == 0) {firstRowHasZero = true; break;}
        for (int i = 0; i<m;i++) if (matrix[i][0] == 0) {firstColumnHasZero = true; break;}

        for (int i = 1; i<m; i++) {
            for (int j = 1; j<n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    matrix[i][0] = 0;
                }
            }
        }

        for (int i = 1; i<m; i++) {
            for (int j = 1; j<n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        if (firstRowHasZero) {
            for (int i = 0; i<n; i++) matrix[0][i] = 0;
        }
        if (firstColumnHasZero) {
            for (int i = 0; i<m; i++) matrix[i][0] = 0;
        }

    }
};
