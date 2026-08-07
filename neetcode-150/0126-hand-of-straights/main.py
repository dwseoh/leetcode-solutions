class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand) # dict built for counting things

        for key in sorted(count.keys()):
            c = count[key]
            if c > 0:
                for i in range(groupSize):
                    if count[key + i] < c:
                        return False
                    count[key + i] -= c

        return True

        