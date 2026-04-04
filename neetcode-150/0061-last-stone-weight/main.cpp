class Solution {
public:
    priority_queue<int> pq;

    int lastStoneWeight(vector<int>& stones) {
        for (auto stone: stones) {
            pq.push(stone);
        }

        while (pq.size()>1) {
            int stone1 = pq.top(); pq.pop(); // bigger
            int stone2 = pq.top(); pq.pop();

            if (stone1>stone2) {
                pq.push(stone1-stone2);
            }
        }

        if (pq.empty()) return 0;
        else return pq.top();
 
    }

    /*
    priority_queue<int, vector<int>, greater<int>> pq;

    // vs max heap - priority_queue<int>

    KthLargest(int k, vector<int>& nums) {
        k_pos = k;
        for (auto num: nums) {
            add(num);
        }
    }
    
    int add(int val) {
        pq.push(val);
        if ((int)pq.size() > k_pos) pq.pop();
        return pq.top();  

    }


    */
};
