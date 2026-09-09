// LeetCode: Count Commas
//
// Approach:
// 1. Numbers below 1,000 contain no commas, so return 0.
// 2. Numbers from 1,000 to 999,999 contain exactly one comma.
// 3. Numbers from 1,000,000 to 999,999,999 contain two commas.
// 4. Numbers from 1,000,000,000 to 999,999,999,999 contain three commas.
// 5. Continue the same pattern for larger ranges, adding the number
//    of commas contributed by each complete range.
// 6. For the current range, multiply the number of remaining values
//    by the number of commas in each number.
//
// Time Complexity: O(1)
// Space Complexity: O(1)

public class Solution
{
    public long CountCommas(long n)
    {
        if (n < 1000)
        {
            return 0;
        }

        // 1,000 to 999,999 -> 1 comma each
        if (n < 1000000)
        {
            return n - 999;
        }

        // 1,000,000 to 999,999,999 -> 2 commas each
        if (n < 1000000000)
        {
            return 999000L + 2L * (n - 999999);
        }

        // 1,000,000,000 to 999,999,999,999 -> 3 commas each
        if (n < 1000000000000L)
        {
            return 999000L
                 + 2L * 999000000L
                 + 3L * (n - 999999999L);
        }

        // 1,000,000,000,000 to 999,999,999,999,999 -> 4 commas each
        if (n < 1000000000000000L)
        {
            return 999000L
                 + 2L * 999000000L
                 + 3L * 999000000000L
                 + 4L * (n - 999999999999L);
        }

        // 1,000,000,000,000,000 and above -> 5 commas each
        return 999000L
             + 2L * 999000000L
             + 3L * 999000000000L
             + 4L * 999000000000000L
             + 5L * (n - 999999999999999L);
    }
}