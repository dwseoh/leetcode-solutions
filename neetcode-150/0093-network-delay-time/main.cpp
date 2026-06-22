class Solution {
public:
    // need bfs 
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {

        struct Edge {
            int to; // where
            int weight; // distance 
        };

        struct State {
            int dist;
            int node;

            // makes priority_queue a min-heap
            bool operator>(const State& other) const {
                return dist > other.dist;
            }
        };

        vector<vector<Edge>> adj(n + 1);
        vector<int> dist(n+1, INT_MAX);

        for (const auto& time : times) {
            adj[time[0]].push_back({time[1], time[2]});
        }

        priority_queue<State, vector<State>, greater<State>> pq;

        // starting node
        dist[k] = 0;
        pq.push({0,k});

        while (!pq.empty()) {
            State cur = pq.top();
            pq.pop();

            if (cur.dist > dist[cur.node]) continue; 

            for (const auto& n: adj[cur.node]) {
                if (dist[cur.node] + n.weight < dist[n.to]) {
                    dist[n.to] = dist[cur.node] + n.weight;
                    pq.push({dist[n.to],n.to});
                }

            }
            
        }

        int res = 0;

        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            res = max(res, dist[i]);
        }

        return res;

    }
};
