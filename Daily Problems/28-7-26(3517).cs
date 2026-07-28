// Approach:
// 1. Since the given string is already a palindrome, only the left half determines the entire palindrome.
// 2. Count the frequency of each character in the left half of the string.
// 3. Traverse the characters from 'a' to 'z' and place them in lexicographical order at both ends of the result.
// 4. If the string length is odd, keep the original middle character unchanged.
// 5. Return the constructed lexicographically smallest palindrome.
//
// Flow:
// Count Characters in Left Half
//            ↓
// Initialize Result Array
//            ↓
// Traverse Characters ('a' to 'z')
//            ↓
// Place Character at Left & Right Ends
//            ↓
// String Length is Odd?
//      ↓ Yes          ↓ No
// Place Middle      Skip
//            ↓
// Return Result
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public string SmallestPalindrome(string s)
    {
        int n = s.Length;
        int[] bucket = new int[26];

        // Count the characters in the left half
        for (int i = 0; i < n / 2; i++)
        {
            bucket[s[i] - 'a']++;
        }

        char[] result = new char[n];
        int left = 0;
        int right = n - 1;

        // Construct the smallest palindrome
        for (int i = 0; i < 26; i++)
        {
            while (bucket[i] > 0)
            {
                char current = (char)('a' + i);

                result[left++] = current;
                result[right--] = current;

                bucket[i]--;
            }
        }

        // Place the middle character for odd-length strings
        if ((n & 1) == 1)
        {
            result[left] = s[n / 2];
        }

        return new string(result);
    }
}