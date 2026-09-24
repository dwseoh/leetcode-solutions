class Solution:
    def smallestIndex(self, nums: List[int]) -> int:
        for idx, num in enumerate(nums):
            dig_sum =  sum(int(dig) for dig in str(num))
            if dig_sum == idx: 
                return idx
        return -1