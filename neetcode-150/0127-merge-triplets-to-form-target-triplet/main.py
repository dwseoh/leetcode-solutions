class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        # think of operating on i,j as make j the MAX element
        # in other words, replace elements if a more higher # is possible
        #  [[2,5,6],[1,4,4],[5,7,5]], target = [5,4,6]
        #  [[1,4,7],[2,5,6],[5,7,5]], target = [2,5,7]
        # A triplet is only useful if none of its values exceed the target's corresponding value (

        # we take the max of each position and match that with the target
        # but we make sure to filter all out of bound triplets (any thats above of target's value for any index)

        match = [0, 0, 0]

        for t in triplets:
            if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
                for i in range(3):
                    if t[i] == target[i]:
                        match[i] = 1
        # for my v1, i did a loop where for i in n, for j in 3 and checked if current verticie is valid (in range)
        # then i used break if it was out of bound. but the problem is that ALL 3 elements should be valid, so this doesn't work

        return match == [1, 1, 1]

                    
