#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        enum State{UNVISITED=0,VISITING=1,VISITED=2};
        vector<int> visited(numCourses, UNVISITED); // state 0 (not visited),1 (visiting),2(visited)
        vector<vector<int>> adj(numCourses);

        // build graph (directed)
        for (const auto& p: prerequisites) {
            int course = p[0], prereq = p[1];
            adj[course].push_back(prereq);
        }

        // use dfs to do cycle detection 
        // return false if cycle is detected
        function<bool(int)> dfs = [&](int cur) -> bool {
            if (visited[cur] == VISITED) return true;
            if (visited[cur] == VISITING) return false;
            visited[cur] = VISITING;

            for (auto v: adj[cur]) {
                if(!dfs(v)) return false;
            }

            visited[cur] = VISITED;
            return true;
        };

        for (int i = 0; i < numCourses; i++) {
            if (!dfs(i)) return false;
        }

        return true;
    }
};

/*

[0,1],[2,3]

1,2->0
3->2

1->0
0<1

*/