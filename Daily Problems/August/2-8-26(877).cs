// Approach:
// 1. Let dp[i][j] represent the maximum score difference
//    (Current Player - Opponent) for piles from i to j.
// 2. If the current player picks the left pile,
//    the score difference becomes:
//      piles[i] - dp[i + 1][j]
// 3. If the current player picks the right pile,
//    the score difference becomes:
//      piles[j] - dp[i][j - 1]
// 4. Store the better of the two choices in dp[i][j].
// 5. If the final score difference is positive,
//    Alice can win.
//
// Time Complexity: O(n²)
// Space Complexity: O(n²)

public class Solution
{
    public bool StoneGame(int[] piles)
    {
        int n = piles.Length;

        // dp[i][j] = Maximum score difference for piles i to j
        int[,] dp = new int[n, n];

        // Base case: Only one pile left
        for (int i = 0; i < n; i++)
        {
            dp[i, i] = piles[i];
        }

        // Fill the DP table
        for (int length = 2; length <= n; length++)
        {
            for (int i = 0; i + length - 1 < n; i++)
            {
                int j = i + length - 1;

                // Pick the left pile
                int pickLeft = piles[i] - dp[i + 1, j];

                // Pick the right pile
                int pickRight = piles[j] - dp[i, j - 1];

                // Choose the better option
                dp[i, j] = Math.Max(pickLeft, pickRight);
            }
        }

        return dp[0, n - 1] > 0;
    }
}