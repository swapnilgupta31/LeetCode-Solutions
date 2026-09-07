// LeetCode: Missing Multiple
//
// Approach:
// 1. Sort the array to make the values easier to search.
// 2. Generate positive multiples of k starting from k.
// 3. For every multiple, scan the array to check whether it exists.
// 4. If the current multiple is not present in the array, return it.
// 5. Continue until the first missing multiple is found.
//
// Time Complexity: O(n log n + n * m)
// Space Complexity: O(1)
//    where n is the number of elements and m is the number of multiples checked.

public class Solution
{
    public int MissingMultiple(int[] nums, int k)
    {
        Array.Sort(nums);

        for (int j = 1; ; j++)
        {
            bool found = false;

            for (int i = 0; i < nums.Length; i++)
            {
                if (k * j == nums[i])
                {
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                return k * j;
            }
        }
    }
}