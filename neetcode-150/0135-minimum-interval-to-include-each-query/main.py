class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        # import heapq, min heap by default 
        # enumerate adds index 
        intervals.sort()
        n = len(queries)
        m = len(intervals)
        sorted_queries = sorted((q,i) for i,q in enumerate(queries)) # assigns it index, but (q,i) flips and creates a new tuple with order flipped
        # now it'll be (2,0),(100,1)
        heap = []
        output = [0] * n
        interval_idx = 0

        for query_val, original_idx in sorted_queries:
            # index all applicable heaps
            while interval_idx<m and intervals[interval_idx][0] <= query_val:
                left,right=intervals[interval_idx]
                heapq.heappush(heap,(right-left+1,right))
                interval_idx+=1
            
            #invalidate values we don't need anymore (minheap, it'll be the smallest )
            while heap and heap[0][1] < query_val:
                heapq.heappop(heap)

            output[original_idx] = heap[0][0] if heap else -1

        return output 

        
        
        