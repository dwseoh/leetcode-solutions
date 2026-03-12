# LeetCode Patterns — Python Examples

---

## 1. Two Pointers

Use when array is sorted or you need pairs. Move pointers inward based on condition.

```python
# Example: Two Sum II (sorted array)
def two_sum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l + 1, r + 1]
        elif s < target:
            l += 1
        else:
            r -= 1

# Example: Fast/slow pointers — detect cycle in linked list
def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

---

## 2. Sliding Window

Use for subarray/substring problems with a constraint. Expand right, shrink left when violated.

```python
# Example: Longest substring without repeating characters
def length_of_longest_substring(s):
    seen = {}
    l = 0
    best = 0
    for r, ch in enumerate(s):
        if ch in seen and seen[ch] >= l:
            l = seen[ch] + 1
        seen[ch] = r
        best = max(best, r - l + 1)
    return best

# Example: Max sum subarray of size k
def max_sum_subarray(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best
```

---

## 3. Binary Search

Use when input is sorted or the answer space is monotonic. Always define lo, hi, mid clearly.

```python
# Example: Classic binary search
def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Example: Binary search on answer — minimum capacity to ship in D days
def ship_within_days(weights, days):
    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        days_needed, cur = 1, 0
        for w in weights:
            if cur + w > mid:
                days_needed += 1
                cur = 0
            cur += w
        if days_needed <= days:
            hi = mid
        else:
            lo = mid + 1
    return lo
```

---

## 4. Hash Map / Hash Set

Use for O(1) lookups, frequency counting, or "seen before" checks.

```python
# Example: Two Sum
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i

# Example: Group anagrams
from collections import defaultdict
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())
```

---

## 5. BFS

Use for shortest path, level-order traversal, or spreading problems. Queue + visited set.

```python
from collections import deque

# Example: Shortest path in unweighted grid
def bfs(grid, start, end):
    q = deque([(start, 0)])
    visited = {start}
    while q:
        (r, c), dist = q.popleft()
        if (r, c) == end:
            return dist
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if (nr, nc) not in visited and grid[nr][nc] != '#':
                visited.add((nr, nc))
                q.append(((nr, nc), dist + 1))
    return -1
```

---

## 6. DFS

Use for exhaustive search, path finding, connected components.

```python
# Example: Number of islands
def num_islands(grid):
    def dfs(r, c):
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
            return
        if grid[r][c] != '1':
            return
        grid[r][c] = '0'  # mark visited
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    count = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    return count
```

---

## 7. Backtracking

Use for permutations, combinations, subsets. DFS + undo after recursing.

```python
# Example: All subsets
def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # undo
    backtrack(0, [])
    return result

# Example: Permutations
def permutations(nums):
    result = []
    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return
        for n in nums:
            if n not in current:
                current.append(n)
                backtrack(current)
                current.pop()
    backtrack([])
    return result
```

---

## 8. Dynamic Programming

Define state → recurrence → base case → order of computation.

```python
# Example: 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]

# Example: Longest Common Subsequence
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
```

---

## 9. Greedy

Use when local optimal leads to global optimum.

```python
# Example: Jump Game — can you reach the end?
def can_jump(nums):
    max_reach = 0
    for i, n in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + n)
    return True

# Example: Meeting rooms — minimum rooms needed
import heapq
def min_meeting_rooms(intervals):
    intervals.sort()
    heap = []  # stores end times
    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heapreplace(heap, end)
        else:
            heapq.heappush(heap, end)
    return len(heap)
```

---

## 10. Heap / Priority Queue

Use for top K elements, streaming medians, interval scheduling.

```python
import heapq

# Example: K largest elements
def k_largest(nums, k):
    return heapq.nlargest(k, nums)

# Example: Merge K sorted lists
def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next
```

---

## 11. Union Find (Disjoint Set)

Use for connected components, cycle detection in undirected graphs.

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # already connected = cycle
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True
```

---

## 12. Topological Sort (Kahn's BFS)

Use for dependency ordering in a DAG.

```python
from collections import deque, defaultdict

def topo_sort(n, prerequisites):
    graph = defaultdict(list)
    in_degree = [0] * n
    for a, b in prerequisites:
        graph[b].append(a)
        in_degree[a] += 1

    q = deque([i for i in range(n) if in_degree[i] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)
    return order if len(order) == n else []  # empty = cycle exists
```

---

## 13. Trie

Use for prefix search, autocomplete, word existence.

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True
```