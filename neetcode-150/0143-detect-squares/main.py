class CountSquares:

    def __init__(self):
        self._points = {} # {(2,5):1}
        
        

    def add(self, point: List[int]) -> None:
        key = (point[0],point[1])
        if key not in self._points:
            self._points[key] = 0
        self._points[key] += 1

    def count(self, point: List[int]) -> int:
        p_x,p_y = point
        res = 0
        for x,y in self._points:
            if x != p_x and abs(p_x - x) == abs(p_y-y):
                if (p_x,y) in self._points and (x,p_y) in self._points:
                    res += self._points[(x,y)]*self._points[(x,p_y)]*self._points[(p_x,y)]
        
        return res

        
