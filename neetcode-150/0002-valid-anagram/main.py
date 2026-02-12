""" class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        count_s = [0] * 26
        count_t = [0] * 26
        for c in s:
            count_s[ord(c) - ord('a')] += 1
        for c in t:
            count_t[ord(c) - ord('a')] += 1

        for i in range(26):
            if count_s[i] != count_t[i]:
                return False

        return True

        # hash table - O(n), O(1)
        # sorting 
"""

### OPTIMIZED:

class Solution:

    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        arr = [0] * 26

        for i in range(len(s)):
            arr[ord(s[i]) - ord('a')] += 1
            arr[ord(t[i]) - ord('a')] -= 1

        for check in arr:
            if check != 0:
                return False
        return True

        # hash table - O(n), O(1)
        # sorting 