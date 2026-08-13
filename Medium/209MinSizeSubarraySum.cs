// Approach:
// 1. Use a sliding window with two pointers: left and right.
// 2. Expand the window by moving right and adding nums[right] to sum.
// 3. When sum >= target, the current window is valid.
// 4. Update the minimum window length.
// 5. Shrink the window from the left while sum >= target
//    to find the smallest possible valid window.
// 6. Return 0 if no valid subarray exists.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int MinSubArrayLen(int target, int[] nums)
    {
        int left = 0;
        int sum = 0;
        int minWindow = int.MaxValue;

        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];

            // Shrink the window while the sum is valid
            while (sum >= target)
            {
                minWindow = Math.Min(
                    minWindow,
                    right - left + 1
                );

                sum -= nums[left];
                left++;
            }
        }

        return minWindow == int.MaxValue ? 0 : minWindow;
    }
}