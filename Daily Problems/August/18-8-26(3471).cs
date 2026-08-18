// LeetCode: Largest Integer to Achieve K Comparisons
//
// Approach:
// 1. If k == n, there is only one subarray, which is the entire array.
//    So the answer is the maximum element in the array.
// 2. If k == 1, every element forms its own subarray.
//    Therefore, the answer is the largest element that occurs exactly once.
// 3. If 1 < k < n, only the first and last elements can appear in exactly
//    one subarray of size k.
// 4. Check whether the first and last elements occur only once.
//    Return the larger valid element.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int LargestInteger(int[] nums, int k)
    {
        int n = nums.Length;

        // Case 1: k == n
        if (k == n)
        {
            return nums.Max();
        }

        // Count frequency of every number.
        int[] count = new int[51];

        foreach (int num in nums)
        {
            count[num]++;
        }

        // Case 2: k == 1
        if (k == 1)
        {
            int answer = -1;

            foreach (int num in nums)
            {
                if (count[num] == 1)
                {
                    answer = Math.Max(answer, num);
                }
            }

            return answer;
        }

        // Case 3: 1 < k < n
        int left = count[nums[0]] == 1 ? nums[0] : -1;
        int right = count[nums[n - 1]] == 1 ? nums[n - 1] : -1;

        return Math.Max(left, right);
    }
}