class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        string cur;
        vector<string> res;
        dfs(res,digits,cur,0);
        return res;
    }

    void dfs(vector<string> &res, string &digits, string &cur, int idx) {
        static const vector<string> map = {
            "", "", "abc", "def", "ghi", "jkl",
            "mno", "pqrs", "tuv", "wxyz"
        };
        
        if (digits.size() == idx) {
            res.push_back(cur);
            return;
        }

        const string &letters = map[digits[idx] - '0'];
        for (char ch : letters) {
            cur.push_back(ch);
            dfs(res, digits, cur, idx + 1);
            cur.pop_back();
        }

    }
};
