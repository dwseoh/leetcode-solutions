class TrieNode {
public:
    TrieNode* children[26];
    bool is_leaf;

    TrieNode() : is_leaf(false), children{} {}
};

class WordDictionary {
public:
    
    TrieNode* root;

    WordDictionary() {
        root = new TrieNode{};    
    }
    
    void addWord(string word) {
        TrieNode* cur = root;

        for (const char& c: word){
            int i = c - 'a';

            if (cur->children[i] == nullptr) 
                cur->children[i] = new TrieNode{};
            
            cur = cur->children[i];
        }

        cur->is_leaf = true;        
    }
    
    // could optimize by passing as ref and record idx to check
    bool dfs(const string& word, TrieNode* cur) {
        if (word.empty()) return cur->is_leaf;

        if (word[0] == '.') {
            for (int i = 0; i<26; i++) {
                if (cur->children[i] != nullptr) {
                    if (dfs(word.substr(1),cur->children[i])) return true;
                }
            }
            return false;
        } else {
            return (cur->children[word[0]-'a'] != nullptr) && dfs(word.substr(1),cur->children[word[0]-'a']);
        }
    }

    bool search(string word) {
        return dfs(word,root);
    }
};
