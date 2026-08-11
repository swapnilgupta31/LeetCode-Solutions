// Approach:
// 1. Find the longest consecutive prefix starting from nums[0].
// 2. Calculate the sum of this prefix.
// 3. Check whether the current sum exists anywhere in the array.
// 4. If it exists, increment the sum and check again.
// 5. Return the first missing integer.
//
// Time Complexity: O(n²)
// Space Complexity: O(1)

public class Solution
{
    public int MissingInteger(int[] nums)
    {
        int n = nums.Length;
        int sum = nums[0];

        // Calculate sum of the longest consecutive prefix
        for (int i = 1; i < n; i++)
        {
            if (nums[i] == nums[i - 1] + 1)
            {
                sum += nums[i];
            }
            else
            {
                break;
            }
        }

        // Find the smallest missing integer >= sum
        while (true)
        {
            bool found = false;

            for (int i = 0; i < n; i++)
            {
                if (nums[i] == sum)
                {
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                return sum;
            }

            sum++;
        }
    }
}