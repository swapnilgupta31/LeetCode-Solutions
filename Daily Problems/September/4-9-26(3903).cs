// LeetCode: First Stable Index
//
// Approach:
// 1. Calculate the suffix minimum for every index, where suffixMin[i]
//    represents the minimum element from index i to n - 1.
// 2. Traverse the array from left to right while maintaining the maximum
//    element seen so far.
// 3. At every index, calculate the instability as the difference between
//    the prefix maximum and the suffix minimum.
// 4. If the instability is less than or equal to k, return the current index
//    because it is the first stable index.
// 5. If no stable index satisfies the condition, return -1.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public int FirstStableIndex(int[] nums, int k)
    {
        int n = nums.Length;

        // suffixMin[i] = minimum from i to n - 1
        int[] suffixMin = new int[n];

        suffixMin[n - 1] = nums[n - 1];

        for (int i = n - 2; i >= 0; i--)
        {
            suffixMin[i] = Math.Min(nums[i], suffixMin[i + 1]);
        }

        // Prefix maximum
        int prefixMax = 0;

        for (int i = 0; i < n; i++)
        {
            prefixMax = Math.Max(prefixMax, nums[i]);

            int instability = prefixMax - suffixMin[i];

            if (instability <= k)
            {
                return i;
            }
        }

        return -1;
    }
}