class MinStack:

    def __init__(self):
        self._items = []

    def push(self, val: int) -> None:
        self._items.append(val)

    def pop(self) -> None:
        self._items.pop(-1)
        

    def top(self) -> int:
        return self._items[-1]

    def getMin(self) -> int:
        return min(self._items)
        
