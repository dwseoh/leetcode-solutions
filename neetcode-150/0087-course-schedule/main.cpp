class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> state(numCourses,0);
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites)
            adj[p[0]].push_back(p[1]);

        function<bool(int)> dfs = [&](int node) -> bool {
            if (state[node] == 1) return false;
            if (state[node] == 2) return true;

            state[node] = 1;

            for (int n: adj[node])
                if (!dfs(n)) return false; 

            state[node] = 2; //undoing: backtracking pattern
            return true;
        };

        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i)) return false;
        }

        return true;
    }
};
