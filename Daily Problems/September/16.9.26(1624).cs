public class Solution
{
    public int NumberOfSets(int n, int k)
    {
        int mod = 1000000007;

        long[,] dp = new long[k + 1, n];

        for (int i = 0; i < n; i++)
        {
            dp[0, i] = 1;
        }

        for (int segments = 1; segments <= k; segments++)
        {
            long sum = 0;

            for (int points = 1; points < n; points++)
            {
                sum = (sum + dp[segments - 1, points - 1]) % mod;

                dp[segments, points] =
                    (dp[segments, points - 1] + sum) % mod;
            }
        }

        return (int)dp[k, n - 1];
    }
}