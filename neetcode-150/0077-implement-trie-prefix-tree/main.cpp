class TrieNode {
public:
    TrieNode* children[26];
    bool is_leaf;

    TrieNode() : is_leaf(false), children{} {}
};

class PrefixTree {
public:
    TrieNode* root;

    PrefixTree() {
        root = new TrieNode{};
    }

    void insert(string word) {
       TrieNode* cur = root;

        for (char c: word) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) 
                cur->children[i] = new TrieNode{};
            
            cur = cur->children[i];
        }
        cur->is_leaf = true;
    }
    
    bool search(string word) {
        TrieNode* cur = root;

        for (char c: word) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) return false;
            cur = cur->children[i];
        }

        return cur->is_leaf;
    }
    
    bool startsWith(string prefix) {
        TrieNode* cur = root;

        for (char c: prefix) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) return false;
            cur = cur->children[i];
        }

        return true;
    }
};
