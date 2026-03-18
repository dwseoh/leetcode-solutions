class TimeMap:

    # dictionary
    # imp1: nested dict -> o(n^2) timespace and o(1) lookup -> clarify nested dic
    # imp2: dict with an array inside -> binary serach O(log n) lookup
    def __init__(self):
        self._info = {}
        

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self._info:
            self._info[key] = []
        
        print(timestamp,key,value)
        self._info[key].append((timestamp,value))
        print(self._info)
        

    def get(self, key: str, timestamp: int) -> str:

        if key not in self._info:
            return ""

        # binary search
        l = 0
        r = len(self._info[key])-1
        mid = 0
        result = ""

        while l<=r:
            
            mid = (r-l)//2+l
            print(l,r,mid)
            mid_num = self._info[key][mid][0]

            if mid_num ==timestamp:
                return self._info[key][mid][1]

            elif mid_num < timestamp:

                #only update here (lower bound)
                result = self._info[key][mid][1]
                l = mid+1
                
            else:
                r = mid-1
                
        # 1 3 5 8 # want 11
        
        return result

