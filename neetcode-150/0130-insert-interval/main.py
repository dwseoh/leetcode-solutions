class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        n = len(intervals)
        res = []
        a, b = newInterval[0], newInterval[1]
        i = 0

        # phase 1: before, no overlap yet
        while i < n and intervals[i][1] < a:
            res.append(intervals[i])
            i += 1

        # phase 2: merge all overlapping intervals
        while i < n and intervals[i][0] <= b:
            a = min(a, intervals[i][0])
            b = max(b, intervals[i][1])
            i += 1
        res.append([a, b])

        # phase 3: after, no overlap possible
        while i < n:
            res.append(intervals[i])
            i += 1

        return res