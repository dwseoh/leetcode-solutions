class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        vector<int> visited(n,0);
        int res{};

        for (const auto& edge: edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }


        function<void(int)> dfs = [&](int node) {
            visited[node] = 1;
            for (const int nb : adj[node])
                if (!visited[nb]) dfs(nb);
        };


        for (int i = 0; i<n; i++) {
            if (!visited[i]) {
                dfs(i);
                res++;
            }
        }

        return res;
    }
};
