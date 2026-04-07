# 2069. Walking Robot Simulation II

**Difficulty:** `Medium`  
**Acceptance Rate:** `37.7%`  
**Topics:** `design` `simulation`  
**Companies:** `company1` `company2`  
**Date Solved:** 2026-04-07  
**Status:** ✅ Solved  

🔗 [LeetCode Link](https://leetcode.com/problems/walking-robot-simulation-ii/)

---

## Problem

> A width x height grid is on an XY-plane with the bottom-left cell at (0, 0) and the top-right cell at (width - 1, height - 1). The grid is aligned with the four cardinal directions ("North", "East", "South", and "West"). A robot is initially at cell (0, 0) facing direction "East".
The robot can be instructed to move for a specific number of steps. For each step, it does the following.
Attempts to move forward one cell in the direction it is facing.
	If the cell the robot is moving to is out of bounds, the robot instead turns 90 degrees counterclockwise and retries the step.
After the robot finishes moving the number of steps required, it stops and awaits the next instruction.
Implement the Robot class:
Robot(int width, int height) Initializes the width x height grid with the robot at (0, 0) facing "East".
	void step(int num) Instructs the robot to move forward num steps.
	int[] getPos() Returns the current cell the robot is at, as an array of length 2, [x, y].
	String getDir() Returns the current direction of the robot, "North", "East", "South", or "West".

**Example 1:**
```
Input
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
Output
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

Explanation
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces North (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"
```

**Constraints:**
- `2 <= width, height <= 100`
- `1 <= num <= 105`
- `At most 104 calls in total will be made to step, getPos, and getDir.`

---

## Intuition

<!-- What was your first instinct? What pattern did you recognize? -->

---

## Approach

<!-- Walk through your approach step by step before jumping to code. -->

1. 
2. 
3. 

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

## Solution

```cpp
class Robot {
public:
    pair<int, int> dir;
    pair<int, int> pos;
    int width, height, perimeter;

    Robot(int width, int height): dir{1,0}, pos{0,0}, width{width}, height{height} {
        perimeter = 2 * (width - 1) + 2 * (height - 1);
    }

    bool checkinbound() {a
        int nx = pos.first + dir.first;
        int ny = pos.second + dir.second;
        return nx >= 0 && nx < width && ny >= 0 && ny < height;
    }

    void step(int num) {
        if (num == 0) return;
        int rem = num % perimeter;
        if (rem == 0) rem = perimeter;
        for (int i = 0; i < rem; i++) {
            while (!checkinbound()) {
                if (dir.first == 1 && dir.second == 0) {
                    dir = {0, 1};
                } else if (dir.first == 0 && dir.second == 1) {
                    dir = {-1, 0};
                } else if (dir.first == -1 && dir.second == 0) {
                    dir = {0, -1};
                } else {
                    dir = {1, 0};
                }
            }
            pos.first += dir.first;
            pos.second += dir.second;
        }
    }

    vector<int> getPos() {
        return {pos.first, pos.second};
    }

    string getDir() {
        if (dir.first == 1 && dir.second == 0) return "East";
        else if (dir.first == 0 && dir.second == 1) return "North";
        else if (dir.first == -1 && dir.second == 0) return "West";
        else return "South";
    }
};

/* leetcode soln:

class Robot {
private:
    bool moved = false;
    int idx = 0;
    vector<pair<int, int>> pos;
    vector<int> dir;
    unordered_map<int, string> to_dir = {
        {0, "East"}, {1, "North"}, {2, "West"}, {3, "South"}};

public:
    Robot(int width, int height) {
        for (int i = 0; i < width; ++i) {
            pos.emplace_back(i, 0);
            dir.emplace_back(0);
        }
        for (int i = 1; i < height; ++i) {
            pos.emplace_back(width - 1, i);
            dir.emplace_back(1);
        }
        for (int i = width - 2; i >= 0; --i) {
            pos.emplace_back(i, height - 1);
            dir.emplace_back(2);
        }
        for (int i = height - 2; i > 0; --i) {
            pos.emplace_back(0, i);
            dir.emplace_back(3);
        }
        dir[0] = 3;
    }

    void step(int num) {
        moved = true;
        idx = (idx + num) % pos.size();
    }

    vector<int> getPos() { return {pos[idx].first, pos[idx].second}; }

    string getDir() {
        if (!moved) {
            return "East";
        }
        return to_dir[dir[idx]];
    }
};

*/
```
---

## Alternative Approaches

### Approach 2: [Name]
<!-- Briefly describe trade-offs vs your main approach -->

```cpp


```

**Time:** `O()` | **Space:** `O()`

---

## Edge Cases

- [ ] Empty input
- [ ] Single element
- [ ] All duplicates
- [ ] Negative numbers
- [ ] Max constraints

---

## Notes & Mistakes

<!-- What tripped you up? What would you do differently next time? -->


---

## Related Problems

| Title | Difficulty |
|-------|------------|
| [Walking Robot Simulation](https://leetcode.com/problems/walking-robot-simulation/) | Medium |
