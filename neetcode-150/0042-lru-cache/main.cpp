class LRUCache {
public:
    int capacity;
    list<pair<int,int>> cache;
    unordered_map<int, list<pair<int,int>>::iterator> mp;

    // ctor
    LRUCache(int capacity) : capacity(capacity) {}    

    int get(int key) {

        // not found
        if (mp.find(key) == mp.end()) return -1;

         // move to front (most recently used)
        auto it = mp[key];
        int value = it->second;

        // update most recent element 
        cache.erase(it);
        cache.push_front({key,value});
        mp[key] = cache.begin();

        return value;
        
    }
    
    void put(int key, int value) {

        // if key already exists remove the old position
        if (mp.find(key) != mp.end()) {
            cache.erase(mp[key]);
        }
        
        cache.push_front({key,value});
        mp[key] = cache.begin();

        if (cache.size()>capacity) {
            auto last = cache.back();
            mp.erase(last.first);
            cache.pop_back();
            
        }

    }
   

};
