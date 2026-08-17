// LeetCode: Longest Subsequence With Non-Zero Bitwise XOR
//
// Approach:
// 1. Calculate the XOR of all elements in the array.
// 2. If the total XOR is non-zero, the entire array is a valid subsequence.
// 3. If the total XOR is zero, check whether the array contains any non-zero element.
// 4. If all elements are zero, no valid subsequence exists, so return 0.
// 5. Otherwise, remove any one non-zero element.
//    This makes the XOR non-zero, so the answer becomes n - 1.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int LongestSubsequence(int[] nums)
    {
        int xor = 0;
        bool hasNonZero = false;

        foreach (int num in nums)
        {
            xor ^= num;

            if (num != 0)
            {
                hasNonZero = true;
            }
        }

        if (xor != 0)
        {
            return nums.Length;
        }

        return hasNonZero ? nums.Length - 1 : 0;
    }
}