class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        vector<int> stck;
        for (string token: tokens) {

            if (token == "+" || token == "-" || token == "/" || token == "*") {
                int a = stck.back(); stck.pop_back();
                int b = stck.back(); stck.pop_back();

                if (token == "+") {
                    int result = a+b;
                    stck.push_back(result);
                } else if (token == "-") {
                    int result = b-a;
                    stck.push_back(result);
                } else if (token == "*") {
                    int result = a*b;
                    stck.push_back(result);
                } else if (token == "/") {
                    int result = b/a;
                    stck.push_back(result);
                } 
                
            } else {
                stck.push_back(stoi(token));
            }
           
        }

        return stck.back();
    }
};
