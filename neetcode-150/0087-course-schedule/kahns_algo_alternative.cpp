class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses, 0);
        for (auto& p : prerequisites) {
            // edges pointing prereq → dependent
            // once prereqs are processed the actual dependent one can be processed
            adj[p[1]].push_back(p[0]); 
            // p[1] is prereq of p[0]
            indeg[p[0]]++;
        }

        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (indeg[i] == 0) q.push(i);

        int processed = 0;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            processed++;
            for (int nxt: adj[node])
                if (--indeg[nxt] == 0) q.push(nxt);
        }

        return processed == numCourses;
    }


};
