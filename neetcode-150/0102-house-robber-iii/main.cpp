class Solution {
public:
    int rob(vector<int>& nums) {
        
        int n = nums.size();
        int ans1 = 0, ans2 = 0;

        auto robLinear = [&](int lo, int hi)->int {
            int rob1 = 0, rob2 = 0;
            for (int i = lo; i<hi;i++) {
                int num = nums[i];
                int temp = max(num + rob1, rob2); // include cur vs exclude cur 
                // i do num+rob1 bcuz thats the best for i-2 (adj skip)
                rob1 = rob2; // best total for until index i-2
                rob2 = temp; // best total for until index i-1
            }
            return rob2;
        };
        
        return max(robLinear(0,n-1),robLinear(1,n));
        // max bw excluding last house vs first house 
    }
};