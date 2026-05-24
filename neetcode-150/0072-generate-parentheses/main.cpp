class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string cur;
        dfs(res,n,0,cur);
        return res;
    }

    void dfs(vector<string> &res, int remaining, int open, string& cur) {
        if (remaining<0 || open <0) return;
        
        if (remaining==0 && !open) {
            res.push_back(cur);
            return;
        }
        
        cur += "(";
        dfs(res,remaining-1,open+1,cur);
        cur.pop_back();

        cur += ")";
        dfs(res,remaining,open-1,cur);
        cur.pop_back();

    }
};
