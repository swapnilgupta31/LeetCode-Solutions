// LeetCode: Shortest Beautiful Substring
//
// Approach:
// 1. Use a sliding window with two pointers, left and right.
// 2. Maintain the number of 1s in the current window.
// 3. Expand the window by moving right and increment the count when
//    s[right] == '1'.
// 4. If the window contains more than k ones, move left forward until
//    the window contains at most k ones.
// 5. When the window contains exactly k ones, remove leading zeros
//    because they do not contribute to the required count.
// 6. Compare the current substring with the answer:
//    - Prefer the shorter substring.
//    - If lengths are equal, prefer the lexicographically smaller one.
// 7. Return the best substring found. If no valid substring exists,
//    return an empty string.
//
// Time Complexity: O(n^2)
// Space Complexity: O(n)

public class Solution
{
    public string ShortestBeautifulSubstring(string s, int k)
    {
        int left = 0;
        int ones = 0;

        string ans = "";

        for (int right = 0; right < s.Length; right++)
        {
            if (s[right] == '1')
            {
                ones++;
            }

            while (ones > k)
            {
                if (s[left] == '1')
                {
                    ones--;
                }

                left++;
            }

            if (ones == k)
            {
                // Remove leading zeros
                while (s[left] == '0')
                {
                    left++;
                }

                string curr = s.Substring(left, right - left + 1);

                if (ans == "" ||
                    curr.Length < ans.Length ||
                    (curr.Length == ans.Length &&
                     string.CompareOrdinal(curr, ans) < 0))
                {
                    ans = curr;
                }
            }
        }

        return ans;
    }
}