class Allocator:
    def __init__(self, n: int):
        self._memory = [0] * n
        self._mapping = {}

    def allocate(self, size: int, mID: int) -> int:
        n = len(self._memory)
        run_start = 0
        run_len = 0

        for i in range(n):
            if self._memory[i] != 0:
                run_len = 0
                run_start = i + 1
                continue
            run_len += 1
            if run_len == size:
                for idx in range(run_start, run_start + size):
                    self._memory[idx] = mID
                self._mapping.setdefault(mID, []).extend(range(run_start, run_start + size))
                return run_start

        return -1

    def freeMemory(self, mID: int) -> int:
        indices = self._mapping.pop(mID, [])
        for idx in indices:
            self._memory[idx] = 0
        return len(indices)