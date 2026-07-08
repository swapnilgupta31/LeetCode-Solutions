// Approach:
// 1. Precompute prefix sums of digits, count of non-zero digits, and the concatenated non-zero number modulo 1e9+7.
// 2. For each query, calculate:
//    - Sum of digits in the range.
//    - Count of non-zero digits.
//    - Concatenated non-zero number using prefix information.
// 3. Multiply the obtained number with the digit sum and return the result modulo 1e9+7.
//
// Flow:
// Precompute Prefix Arrays
//          ↓
// Process Each Query
//          ↓
// Calculate Digit Sum
//          ↓
// Calculate Non-Zero Number
//          ↓
// Multiply & Take Mod
//          ↓
// Store Answer
//
// Time Complexity: O(n + q)
// Space Complexity: O(n)

public class Solution
{
    private const int MOD = 1_000_000_007;
    private const int MAX = 100001;

    // Precompute powers of 10 modulo MOD
    private static readonly long[] pow10 = InitializePowers();

    private static long[] InitializePowers()
    {
        long[] powers = new long[MAX];
        powers[0] = 1;

        for (int i = 1; i < MAX; i++)
        {
            powers[i] = (powers[i - 1] * 10) % MOD;
        }

        return powers;
    }

    public int[] SumAndMultiply(string s, int[][] queries)
    {
        int n = s.Length;

        // Prefix sum of digits
        int[] prefixSum = new int[n + 1];

        // Prefix count of non-zero digits
        int[] nonZeroCount = new int[n + 1];

        // Prefix concatenated non-zero number (mod MOD)
        long[] prefixNumber = new long[n + 1];

        for (int i = 1; i <= n; i++)
        {
            int digit = s[i - 1] - '0';

            prefixSum[i] = prefixSum[i - 1] + digit;
            nonZeroCount[i] = nonZeroCount[i - 1] + (digit > 0 ? 1 : 0);

            if (digit > 0)
            {
                prefixNumber[i] = (prefixNumber[i - 1] * 10 + digit) % MOD;
            }
            else
            {
                prefixNumber[i] = prefixNumber[i - 1];
            }
        }

        int[] answer = new int[queries.Length];

        // Process each query
        for (int i = 0; i < queries.Length; i++)
        {
            int left = queries[i][0];
            int right = queries[i][1];

            // Sum of digits in the range
            int digitSum = prefixSum[right + 1] - prefixSum[left];

            // Number of non-zero digits in the range
            int count = nonZeroCount[right + 1] - nonZeroCount[left];

            // Concatenated non-zero number in the range
            long number =
                (prefixNumber[right + 1]
                - (prefixNumber[left] * pow10[count]) % MOD
                + MOD) % MOD;

            // Final answer for the query
            answer[i] = (int)((number * digitSum) % MOD);
        }

        return answer;
    }
}