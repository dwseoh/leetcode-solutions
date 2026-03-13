# Solution 3 (better memoization)

class Solution:

    def rob(self, nums: List[int]) -> int:
        dp = {}

        def helper(idx):
            if idx in dp:
                return dp[idx]

            if idx >= len(nums):
                return 0

            dp[idx] = max(nums[idx] + helper(idx + 2), helper(idx + 1))
            return dp[idx]

        return max(helper(0), helper(1))
    

# Solution 2 (caching implemented)
        
'''
class Solution:

    def rob(self, nums: List[int]) -> int:
        
        def helper(lis, idx, dp):
            if idx >= len(lis):
                return 0
            if idx+2 in dp:
                res1 = dp[idx+2]
            else:
                res1 = helper(lis,idx+2,dp)
                dp[idx+2] = res1

            if idx+1 in dp:
                res2 = dp[idx+1]
            else:
                res2 = helper(lis,idx+1,dp)
                dp[idx+1] = res2

            return max(lis[idx] + res1, res2)

        return max(helper(nums, 0, {}), helper(nums, 1, {}))
        

'''

# Solution 1 (no caching - hit time limit)

'''
class Solution:

    def rob(self, nums: List[int]) -> int:
        def helper(lis, idx):
            if idx >= len(lis):
                return 0
            return max(lis[idx] + helper(lis, idx + 2), helper(lis, idx + 1))

        return max(helper(nums, 0), helper(nums, 1))
        
'''