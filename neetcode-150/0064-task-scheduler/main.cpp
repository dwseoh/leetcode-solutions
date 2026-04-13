class Solution {
public:


    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char,int> freq;
        int time = 0; 
        priority_queue<int> pq;
        queue<pair<int, int>> cooldown;

        for (char task: tasks) freq[task]++;
        
        for (auto& [key, value] : freq) pq.push(value);

        while (!pq.empty() || !cooldown.empty()) {

            // move tasks off cooldown if ready
            if (!cooldown.empty() && cooldown.front().second <= time) {
                pq.push(cooldown.front().first);
                cooldown.pop();
            }

            // pick most priority one
            if (!pq.empty()) {
                int cnt = pq.top()-1;
                pq.pop();
                if (cnt>0) cooldown.push({cnt, time + n + 1});
            }

            // else idle
            time++;

        }

        return time;

    }
};
