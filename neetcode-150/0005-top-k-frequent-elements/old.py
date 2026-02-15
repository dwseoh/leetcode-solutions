def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
    
    # Sort by frequency descending, take first k keys
    return sorted(count, key=lambda x: count[x], reverse=True)[:k]

# count.get(n,0) just returns 0 if the key doesn't exist yet,
# sorted(count, ...) is just shorthand for sorted(count.keys(), ...)