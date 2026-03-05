# 023. Evaluate Reverse Polish Notation

**Difficulty:** `Medium`  
**Acceptance Rate:** `57.1%`  
**Topics:** `array` `math` `stack`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-03-05  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

---

## Problem

> You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.
Evaluate the expression. Return an integer that represents the value of the expression.
Note that:
The valid operators are '+', '-', '*', and '/'.
	Each operand may be an integer or another expression.
	The division between two integers always truncates toward zero.
	There will not be any division by zero.
	The input represents a valid arithmetic expression in a reverse polish notation.
	The answer and all the intermediate calculations can be represented in a 32-bit integer.

**Example 1:**
```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

**Example 2:**
```
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

**Example 3:**
```
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

**Constraints:**
- `1 <= tokens.length <= 104`
- `tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
I recognized it was a stack problem.

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Use a stack to store the numbers
2. Iterate through the tokens
3. If the token is a number, push it onto the stack
4. If the token is an operator, pop the top two numbers from the stack, perform the operation, and push the result back onto the stack
5. The final result will be the top element of the stack

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
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
```
---

## Alternative Approaches

### Approach 2: [Name]
<!-- Briefly describe trade-offs vs your main approach -->

```cpp


```

**Time:** `O()` | **Space:** `O()`

---

## Edge Cases

- [ ] Empty input
- [ ] Single element
- [ ] All duplicates
- [ ] Negative numbers
- [ ] Max constraints

---

## Notes & Mistakes

<!-- What tripped you up? What would you do differently next time? -->


---

## Related Problems

| Title | Difficulty |
|-------|------------|
| [Basic Calculator](https://leetcode.com/problems/basic-calculator/) | Hard |
| [Expression Add Operators](https://leetcode.com/problems/expression-add-operators/) | Hard |
