// Approach:
// 1. Use two pointers, one for string s and one for string t.
// 2. Traverse string t from left to right.
// 3. Whenever the characters match, move the pointer of s forward.
// 4. Continue until the end of either string.
// 5. If all characters of s are matched, return true; otherwise, return false.
//
// Flow:
// Initialize Two Pointers
//          ↓
// Traverse String t
//          ↓
// Characters Match?
//     ↓ Yes        ↓ No
// Move s Pointer   Continue
//          ↓
// Move t Pointer
//          ↓
// End of Traversal
//          ↓
// All Characters Matched?
//     ↓ Yes        ↓ No
// Return True   Return False
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//
// Where:
// n = Length of string t

public class Solution
{
    public bool IsSubsequence(string s, string t)
    {
        int i = 0;
        int j = 0;

        // Traverse both strings
        while (i < s.Length && j < t.Length)
        {
            // Move the pointer of s when characters match
            if (s[i] == t[j])
            {
                i++;
            }

            // Always move the pointer of t
            j++;
        }

        // Check if all characters of s were matched
        return i == s.Length;
    }
}