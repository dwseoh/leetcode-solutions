class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        iota(parent.begin(), parent.end(), 0);   // each node is its own root

        function<int(int)> find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];    // path compression
                x = parent[x];
            }
            return x;
        };

        for (const auto& e : edges) {
            int a = find(e[0]), b = find(e[1]);
            if (a == b) return e;                 // both ends already connected -> redundant
            parent[a] = b;                        // union
        }
        return {};
    }
};