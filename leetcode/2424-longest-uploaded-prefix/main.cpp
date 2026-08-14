class LUPrefix {
private:
    vector<int> server_data;
    int server_size = 0;
    int memo = 0;
    int last_idx = 0;


public:
    LUPrefix(int n) : server_data(n, -1), server_size(n) {}

    void upload(int video) {
        server_data[video-1] = 1;
    }
    
    int longest() {
        int res = memo;
        int i = last_idx;

        for (; i<server_size; i++) {
            if (server_data[i] != -1) res ++;
            else break;
        }
        last_idx = i;

        return memo = res;
    }
};

/**
 * Your LUPrefix object will be instantiated and called as such:
 * LUPrefix* obj = new LUPrefix(n);
 * obj->upload(video);
 * int param_2 = obj->longest();
 */