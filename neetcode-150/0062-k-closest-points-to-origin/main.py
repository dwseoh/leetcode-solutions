class Solution:

    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        import heapq
        
        heap = []
        for x, y in points:
            dist = -(x**2 + y**2)  # negate for max-heap
            if len(heap) < k:
                heapq.heappush(heap, (dist, [x, y]))
            else:
                heapq.heappushpop(heap, (dist, [x, y]))
        
        return [h[1] for h in heap]