class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        last = {char: i for i, char in enumerate(s)}
        
        res = []
        start = end = 0
        
        for i, char in enumerate(s):
            end = max(end, last[char])
            if i == end:
                res.append(end - start + 1)
                start = i + 1
        
        return res
        