// Approach:
// 1. Use two pointers, one starting from the beginning and the other from the end.
// 2. Skip all non-alphanumeric characters.
// 3. Compare the remaining characters after converting them to lowercase.
// 4. If any pair of characters does not match, return false.
// 5. If all valid characters match, return true.
//
// Flow:
// Initialize Two Pointers
//          ↓
// Skip Non-Alphanumeric Characters
//          ↓
// Compare Lowercase Characters
//          ↓
// Characters Different?
//     ↓ Yes        ↓ No
// Return False   Move Both Pointers
//                      ↓
//             Continue Until Pointers Meet
//                      ↓
//                 Return True
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public bool IsPalindrome(string s)
    {
        int left = 0;
        int right = s.Length - 1;

        while (left < right)
        {
            // Skip non-alphanumeric characters from the left
            while (left < right && !char.IsLetterOrDigit(s[left]))
            {
                left++;
            }

            // Skip non-alphanumeric characters from the right
            while (left < right && !char.IsLetterOrDigit(s[right]))
            {
                right--;
            }

            // Compare characters ignoring case
            if (char.ToLower(s[left]) != char.ToLower(s[right]))
            {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}