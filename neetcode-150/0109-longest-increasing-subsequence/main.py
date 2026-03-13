class Solution:

    def lengthOfLIS(self, nums: List[int]) -> int:

        def helper(prev_num,idx):

            if (idx, prev_num) in cache:
                return cache[(idx, prev_num)]

            #print(prev_num,idx)

            if (idx > len(nums)-1):
                return 0

            prev_unchanged_num = prev_num

            to_add = 0
            if prev_num < nums[idx]:
                prev_num = nums[idx]
                to_add = 1

            to_return = max(to_add+helper(prev_num,idx+1),helper(prev_unchanged_num,idx+1))
            #print(to_return)
            cache[(idx,prev_unchanged_num)] = to_return

            return to_return

        cache = {}
        return max(1+helper(nums[0],1),helper(-1001,1))
        

# nums = [9,1,4,2,3,3,7] 

'''
dfs -> whether to inc elemenet vs not -> return length -> max fcn
iterate through the list -> dp to cache 
'''