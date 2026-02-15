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

