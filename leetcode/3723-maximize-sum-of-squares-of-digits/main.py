class Solution:
    def maxSumOfSquares(self, num: int, sum: int) -> str:
        # greedy approach
        # always want to choose max

        if sum > 9 * num:
            return "" #impossible

        digits = []
        for _ in range(num):
            digit = min(9, sum)
            sum -= digit
            digits.append(str(digit))

        return "".join(digits)

# Hint: repeatedly append the largest digit
# you can afford, then subtract it from sum.