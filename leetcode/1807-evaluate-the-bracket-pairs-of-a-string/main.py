class Solution:
    def evaluate(self, s: str, knowledge: list[list[str]]) -> str:
        mapping = dict(knowledge)
        result = []
        i = 0

        while i < len(s):
            if s[i] == "(":
                end = s.find(")", i)
                key = s[i + 1:end]
                result.append(mapping.get(key, "?"))
                i = end + 1
            else:
                result.append(s[i])
                i += 1

        return "".join(result)