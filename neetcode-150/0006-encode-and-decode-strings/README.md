# 006. Encode and Decode Strings

**Difficulty:** `Medium`  
**Acceptance Rate:** `51.2%`  
**Topics:** `array` `string` `design`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-02-15  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/encode-and-decode-strings/)

---

## Problem

Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:

```cpp
string encode(vector<string> strs) {
    // ... your code
    return encoded_string;
}
```
Machine 2 (receiver) has the function:

```cpp
vector<string> decode(string s) {
    //... your code
    return strs;
}
```

So Machine 1 does:

`string encoded_string = encode(strs);`
and Machine 2 does:

`vector<string> strs2 = decode(encoded_string);`

strs2 in Machine 2 should be the same as strs in Machine 1.

Implement the encode and decode methods.

**Example:**
```
ample 1:

Input: dummy_input = ["Hello","World"]

Output: ["Hello","World"]

Explanation:
Machine 1:
Codec encoder = new Codec();
String msg = encoder.encode(strs);
Machine 1 ---msg---> Machine 2

Machine 2:
Codec decoder = new Codec();
String[] strs = decoder.decode(msg);
Example 2:

Input: dummy_input = [""]

Output: [""]
```

**Constraints:**
- 0 <= strs.length < 100
- 0 <= strs[i].length < 200
- strs[i] contains any possible characters out of 256 valid ASCII characters.

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->
Having done encoding before I was planning to make it [number][encoded string] but then I realized the number could be more than one digit so I went with [length][#][string] to encode.  

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. Encode using [length][#][string]
2. Decode by using indexes to find the length of the string and then slice the string
3. Return the decoded list of strings

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```python
class Solution:

    def encode(self, strs: List[str]) -> str:
        encoded = ""
        for word in strs:
            encoded += str(len(word))
            encoded += ('#'+word)
        
        return encoded

        # easier: return "".join(f"{len(w)}#{w}" for w in strs)


    def decode(self, s: str) -> List[str]:
        output = []
        i = 0

        # using indexs
        while i < len(s):
            j = s.index("#", i)
            length = int(s[i:j])
            output.append(s[j+1 : j+1+length])
            i = j + 1 + length

        return output
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
| [Count and Say](https://leetcode.com/problems/count-and-say/) | Medium |
| [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Hard |
| [String Compression](https://leetcode.com/problems/string-compression/) | Medium |
| [Count Binary Substrings](https://leetcode.com/problems/count-binary-substrings/) | Easy |
