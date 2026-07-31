// Approach:
// 1. Negative numbers and numbers ending with 0 (except 0 itself) cannot be palindromes.
// 2. Reverse only the second half of the digits instead of the entire number.
// 3. Stop when the reversed half becomes greater than or equal to the remaining half.
// 4. For even-length numbers, both halves should be equal.
// 5. For odd-length numbers, ignore the middle digit by dividing the reversed half by 10.
//
// Flow:
// Check Invalid Cases
//         ↓
// Reverse Half of the Number
//         ↓
// Reversed Half >= Remaining Half ?
//         ↓
// Compare Both Halves
//         ↓
// Return True / False
//
// Time Complexity: O(log n)
// Space Complexity: O(1)

public class Solution
{
    public bool IsPalindrome(int x)
    {
        if (x < 0 || (x % 10 == 0 && x != 0))
        {
            return false;
        }

        int reversedHalf = 0;

        while (x > reversedHalf)
        {
            reversedHalf = reversedHalf * 10 + x % 10;
            x /= 10;
        }

        return x == reversedHalf || x == reversedHalf / 10;
    }
}