// Approach:
// 1. The keyboard can assign at most 8 characters to each push count.
// 2. The first 8 characters require 1 push each.
// 3. The next 8 characters require 2 pushes each.
// 4. The following 8 characters require 3 pushes each.
// 5. Any remaining characters require 4 pushes each.
// 6. Compute the answer directly using the length of the word.
//
// Flow:
// Get Word Length
//        ↓
// Length ≤ 8 ?
//   ↓ Yes      ↓ No
// Return n     Length ≤ 16 ?
//               ↓ Yes      ↓ No
//          Return 2n-8    Length ≤ 24 ?
//                          ↓ Yes      ↓ No
//                     Return 3n-24   Return 4n-48
//
// Time Complexity: O(1)
// Space Complexity: O(1)

public class Solution
{
    public int MinimumPushes(string word)
    {
        int n = word.Length;

        if (n <= 8)
            return n;

        if (n <= 16)
            return 2 * n - 8;

        if (n <= 24)
            return 3 * n - 24;

        return 4 * n - 48;
    }
}