// LeetCode: Uniform Array
//
// Approach:
// 1. Find the smallest odd number in the array.
// 2. If there are no odd numbers, all elements are already even,
//    so the array is uniform.
// 3. Traverse the array again and check every even number.
// 4. If any even number is smaller than the smallest odd number,
//    the array cannot be made uniform.
// 5. Otherwise, return true.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public bool UniformArray(int[] nums1)
    {
        int minOdd = int.MaxValue;

        // Find the smallest odd number in the array
        foreach (int num in nums1)
        {
            if (num % 2 != 0)
            {
                minOdd = Math.Min(minOdd, num);
            }
        }

        // If there are no odd numbers, all elements are already even
        if (minOdd == int.MaxValue)
        {
            return true;
        }

        // Check if any even number is smaller than the minimum odd number
        foreach (int num in nums1)
        {
            if (num % 2 == 0 && num < minOdd)
            {
                return false;
            }
        }

        return true;
    }
}
