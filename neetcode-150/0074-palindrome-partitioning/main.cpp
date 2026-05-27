class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res; 
        vector<string> cur;
        dfs(res, cur, 0, s);
        return res;
    }

    bool isPalindrome(const string &s) {
        for (int i = 0; i < s.size()/2; i++) {
            if (s[i] == s[s.size()-1-i]) continue;
            else return false;
        }
        return true;
    }

    void dfs(vector<vector<string>> &res, vector<string>& cur, int idx, string &s) {

        if (idx == s.size()) {
            res.push_back(cur);
            return;
        }

        for (int i = idx+1; i <= s.size(); i++) {
            string tmp = s.substr(idx, i - idx);
            if (isPalindrome(tmp)) {
                cur.push_back(tmp);
                dfs(res,cur,i,s);
                cur.pop_back();
            }
        }

    }   
};
ß