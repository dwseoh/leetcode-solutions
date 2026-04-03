class KthLargest {
public:
    int k_pos;

    // min heap
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
};
