class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() != n - 1) return false; 
        vector<int> state(n,0);
        vector<vector<int>> adj(n);

        for (const auto& edge: edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        function<bool(int,int)> dfs = [&](int node, int parent) -> bool {
            state[node] = 1;
            for (const auto nb: adj[node]) {
                if (nb == parent) continue;      // skip the edge we came in on
                if (state[nb] == 1 || !dfs(nb,node)) return false; // back edge = real cycle
            }
            return true;
        };

        if (!dfs(0, -1)) return false;
        for (int s : state) if (s == 0) return false;  // disconnected
        return true;
    }
};
