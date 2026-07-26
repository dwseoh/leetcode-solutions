class Solution {
public:
    int networkBecomesIdle(vector<vector<int>>& edges, vector<int>& patience) {
        int n = patience.size();
        vector<vector<int>> adj(n);

        for (const auto& edge: edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        // bfs to complete path lengths 
        queue<int> q;
        vector<int> dist(n,-1);
        dist[0] = 0;
        q.push(0);

        // bfs; 
        while (!q.empty()) {
            int node = q.front();
            q.pop();

            for (int v: adj[node]) {
                if (dist[v] == -1) {
                    dist[v] = dist[node] + 1;
                    q.push(v);
                }
            }
        }

        int res = 0;
        for (int i = 1; i<n;i++) {
            int tta = ((2*dist[i]-1)/patience[i])*patience[i]+2*dist[i]+1;
            res = max(res,tta);
        }

        return res;

    }
};