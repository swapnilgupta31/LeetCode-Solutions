// Approach:
// 1. Use Dynamic Programming where dp[g1][g2] represents the number of ways
//    to form two subsequences with GCDs g1 and g2.
// 2. For every number, we have three choices:
//    - Ignore it.
//    - Add it to the first subsequence.
//    - Add it to the second subsequence.
// 3. Update the GCDs accordingly.
// 4. Sum all states where both subsequences have the same non-zero GCD.
//
// Flow:
// Initialize DP
//      ↓
// Process Each Number
//      ↓
// Ignore / Add to Seq1 / Add to Seq2
//      ↓
// Update GCD States
//      ↓
// Repeat for All Numbers
//      ↓
// Sum States where GCD1 == GCD2
//
// Time Complexity: O(n × 201 × 201)
// Space Complexity: O(201 × 201)

public class Solution
{
    const int MOD = 1000000007;
    const int MAX = 200;

    public int SubsequencePairCount(int[] nums)
    {
        // dp[g1][g2] = Number of ways to obtain GCDs g1 and g2
        long[,] dp = new long[MAX + 1, MAX + 1];
        dp[0, 0] = 1;

        // Process every number
        foreach (int num in nums)
        {
            long[,] next = new long[MAX + 1, MAX + 1];

            for (int g1 = 0; g1 <= MAX; g1++)
            {
                for (int g2 = 0; g2 <= MAX; g2++)
                {
                    long ways = dp[g1, g2];

                    if (ways == 0)
                        continue;

                    // Ignore the current number
                    next[g1, g2] = (next[g1, g2] + ways) % MOD;

                    // Add the current number to the first subsequence
                    int newGcd1 = (g1 == 0) ? num : GCD(g1, num);
                    next[newGcd1, g2] = (next[newGcd1, g2] + ways) % MOD;

                    // Add the current number to the second subsequence
                    int newGcd2 = (g2 == 0) ? num : GCD(g2, num);
                    next[g1, newGcd2] = (next[g1, newGcd2] + ways) % MOD;
                }
            }

            dp = next;
        }

        // Count all states where both subsequences have the same non-zero GCD
        long answer = 0;

        for (int gcd = 1; gcd <= MAX; gcd++)
        {
            answer = (answer + dp[gcd, gcd]) % MOD;
        }

        return (int)answer;
    }

    // Euclidean Algorithm to calculate GCD
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }

        return a;
    }
}