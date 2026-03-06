class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // Monotonic Increasing Stack (finds next greater element)
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st; // stores indices

        for (int i = 0; i < n; i++) {
            // while stack is not empy and it doesnt break the property
            while (!st.empty() && temperatures[st.top()] < temperatures[i]) {
                res[st.top()] = i;  // the greatest number index in front of the cur element 
                st.pop();
            }
            st.push(i); //queue index 
        }

        for (int i=0;i<n;i++) {
            if (res[i]!=0)
            res[i] = res[i]-i;
        } 

        return res;
    
    }
};

