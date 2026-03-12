# Python Tips for LeetCode

## Defaultdict — Avoids KeyError Hassle

```python
from collections import defaultdict
d = defaultdict(int)    # missing keys default to 0
d = defaultdict(list)   # missing keys default to []
d["x"] += 1             # no need to check if "x" exists
```

## Counter — Instant Frequency Map

```python
from collections import Counter
c = Counter([1, 2, 2, 3, 3, 3])
# c = {3: 3, 2: 2, 1: 1}
c.most_common(2)  # [(3, 3), (2, 2)]
```

## Deque — O(1) Pops from Both Ends (Useful for BFS)

```python
from collections import deque
q = deque([1, 2, 3])
q.appendleft(0)   # [0, 1, 2, 3]
q.popleft()        # 0 — O(1) vs list pop(0) which is O(n)
```

## Tuple Unpacking

```python
a, b = b, a          # swap without temp
a, b = [1, 2]        # unpack list
for i, val in enumerate(nums):  # index + value
for k, v in d.items():          # dict key + value
```

## Slicing Tricks

```python
nums[::-1]     # reverse
nums[1:]       # everything except first
nums[:-1]      # everything except last
s[:k] + s[k:]  # split and rejoin
```

## Sets — O(1) Lookup

```python
seen = set()
seen.add(5)
if 5 in seen:       # O(1) vs O(n) for lists
s1 & s2              # intersection
s1 | s2              # union
s1 - s2              # difference
```

## Infinity

```python
float('inf')    # positive infinity
float('-inf')   # negative infinity
# useful for min/max tracking
best = float('inf')
```

## Heap (Min-Heap by Default)

```python
import heapq
h = [3, 1, 2]
heapq.heapify(h)        # turns list into heap in-place
heapq.heappush(h, 0)
heapq.heappop(h)         # returns smallest
# for max-heap, negate values:
heapq.heappush(h, -val)
```

## List Comprehensions

```python
squares = [x**2 for x in range(10)]
evens = [x for x in nums if x % 2 == 0]
flat = [x for row in matrix for x in row]  # flatten 2D
```

## String Tricks

```python
"abc".isalpha()      # True
"123".isdigit()      # True
"abc".isalnum()      # True
ord('a')             # 97 — char to int
chr(97)              # 'a' — int to char
"hello"[::-1]        # "olleh"
```

## Sorting with Key

```python
nums.sort()                          # in-place
sorted(nums)                         # returns new list
intervals.sort(key=lambda x: x[0])   # sort by first element
nums.sort(key=lambda x: -x)          # descending
```

## Walrus Operator (Python 3.8+)

```python
# assign and check in one line
if (n := len(nums)) > 10:
    print(n)
```

## `//` and `%` Gotchas

```python
-7 // 2    # -4 in Python (floors toward negative inf)
           # in C++ this would be -3
int(-7/2)  # -3 — use this if you want C++ behavior
```