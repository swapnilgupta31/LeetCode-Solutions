// Approach:
// 1. Use a sliding window with two pointers: left and right.
// 2. Maintain the frequency of each character using a fixed-size array.
// 3. Expand the window by moving the right pointer.
// 4. If any character appears more than 2 times, shrink the window
//    from the left until the frequency constraint is satisfied.
// 5. Calculate the current window length and update the maximum length.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int MaximumLengthSubstring(string s)
    {
        int[] freq = new int[26];

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.Length; right++)
        {
            freq[s[right] - 'a']++;

            // Shrink the window if a character appears more than twice
            while (freq[s[right] - 'a'] > 2)
            {
                freq[s[left] - 'a']--;
                left++;
            }

            // Update maximum valid window length
            maxLength = Math.Max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}