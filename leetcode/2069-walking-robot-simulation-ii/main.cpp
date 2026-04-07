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