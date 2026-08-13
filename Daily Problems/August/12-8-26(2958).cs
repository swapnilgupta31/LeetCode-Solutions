// Approach:
// 1. Use a sliding window to maintain the longest valid subarray.
// 2. Store the frequency of each number inside the current window.
// 3. Expand the right pointer and increase the frequency.
// 4. If any number appears more than 2 times, move the left pointer
//    until the window becomes valid again.
// 5. Keep track of the maximum valid window length.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public int MaxSubarrayLength(int[] nums, int k)
    {
        Dictionary<int, int> frequency = new Dictionary<int, int>();

        int left = 0;
        int answer = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            if (!frequency.ContainsKey(nums[right]))
            {
                frequency[nums[right]] = 0;
            }

            frequency[nums[right]]++;

            // Shrink window if frequency exceeds k
            while (frequency[nums[right]] > k)
            {
                frequency[nums[left]]--;
                left++;
            }

            // Update maximum window length
            answer = Math.Max(answer, right - left + 1);
        }

        return answer;
    }
}