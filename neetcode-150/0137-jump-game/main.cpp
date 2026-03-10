class Solution {
public:
  bool canJump(vector<int> &nums) {
    int i = 0;
    int n = nums.size();

    while (i != n - 1) {
      if (nums[i] == 0)
        return false;

      int bestReach = i;
      int bestK = i;

      for (int k = i + 1; k <= i + nums[i] && k < n; k++) {
        if (k + nums[k] > bestReach) {
          bestReach = k + nums[k];
          bestK = k;
        }
      }

      if (bestK == i)
        return false; // couldn't advance
      if (bestReach >= n - 1)
        return true;
      i = bestK;
    }

    return true;
  }
};