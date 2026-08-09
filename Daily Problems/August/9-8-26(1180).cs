// Approach:
// 1. Calculate suffix sums so we can get the total stones
//    remaining from any index in O(1).
// 2. Let dp[i, m] represent the maximum stones the current
//    player can collect starting from index i with M = m.
// 3. If the player can take all remaining piles (2 * m >= remaining),
//    take all of them.
// 4. Otherwise, try taking x piles where 1 <= x <= 2 * m.
// 5. After taking x piles, the opponent's M becomes max(m, x).
// 6. Choose the maximum number of stones the current player can get.
//
// Time Complexity: O(n³)
// Space Complexity: O(n²)

public class Solution
{
    public int StoneGameII(int[] piles)
    {
        int n = piles.Length;
        int[,] dp = new int[n, n + 1];
        int[] suffixSum = new int[n];

        // Calculate suffix sums
        suffixSum[n - 1] = piles[n - 1];

        for (int i = n - 2; i >= 0; i--)
        {
            suffixSum[i] = suffixSum[i + 1] + piles[i];
        }

        // Fill DP table from right to left
        for (int i = n - 1; i >= 0; i--)
        {
            for (int m = 1; m <= n; m++)
            {
                // Take all remaining piles
                if (i + 2 * m >= n)
                {
                    dp[i, m] = suffixSum[i];
                }
                else
                {
                    int maxStones = 0;

                    // Try taking 1 to 2 * M piles
                    for (int x = 1; x <= 2 * m; x++)
                    {
                        int currentTake =
                            suffixSum[i] - dp[i + x, Math.Max(m, x)];

                        maxStones = Math.Max(maxStones, currentTake);
                    }

                    dp[i, m] = maxStones;
                }
            }
        }

        return dp[0, 1];
    }
}