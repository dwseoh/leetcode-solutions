class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        record = {}

        for i in range(len(nums)):
            diff = target - nums[i]

            if diff in record:
                return [record[diff],i]
            
            record[nums[i]] = i