class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // easy soln: brute force
        // slightly harder soln: inplace array manipulation:
        /*
        For example, in the array [2, 1, 2, 3], where 2 is repeated, we mark the index corresponding to each element as negative. 
        If we encounter a number whose corresponding position is already negative, it means the number is a duplicate, and we return it.
        */
        // harder soln: slow and fast ptr 
        
        int slow = nums[0];
        int fast = nums[0];

        do {
            slow = nums[slow]; // one step
            fast = nums[nums[fast]]; // two steps
        } while (slow!=fast);

        // find the "cycle" in the linkedlist

        
        // apparently some mathematical thing, so idk
        
        slow = nums[0];
        while (slow!=fast) {
            slow=nums[slow];
            fast=nums[fast];
        }

        return slow;
    }
};
