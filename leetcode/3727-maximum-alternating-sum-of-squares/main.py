class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        nums[:] = [x ** 2 for x in nums]
        nums.sort()
        n = len(nums)
        return -sum(nums[: n // 2]) + sum(nums[n // 2 :])
    