class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        cnt_mapping = {}

        for num in nums:
            if num not in cnt_mapping:
                cnt_mapping[num] = 0
            
            cnt_mapping[num] += 1
        
        for val in cnt_mapping.values():
            if val > 1:
                return True
        
        return False

# O(n) time, O(n) space
