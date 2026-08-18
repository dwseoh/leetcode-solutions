class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        sort(intervals.begin(), intervals.end(), [](Interval a, Interval b) {
            return a.start < b.start;
        });

        priority_queue<int, vector<int>, greater<int>> pq;

        for (auto &iv : intervals) {
            if (!pq.empty() && pq.top() <= iv.start) {
                pq.pop(); // reuse
            }
            pq.push(iv.end);
        }

        return pq.size();
    }
};