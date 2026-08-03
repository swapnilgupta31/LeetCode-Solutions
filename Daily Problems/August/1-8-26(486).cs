// Approach:
// 1. Let dp[i][j] represent the maximum score difference
//    (Current Player - Opponent) for numbers from i to j.
// 2. If the current player picks the left number,
//    the score difference becomes:
//      nums[i] - dp[i + 1][j]
// 3. If the current player picks the right number,
//    the score difference becomes:
//      nums[j] - dp[i][j - 1]
// 4. Store the better of the two choices in dp[i][j].
// 5. If the final score difference is non-negative,
//    Player 1 can win or tie.
//
// Time Complexity: O(n²)
// Space Complexity: O(n²)

public class Solution
{
    public bool PredictTheWinner(int[] nums)
    {
        int n = nums.Length;

        // dp[i][j] = Maximum score difference for nums i to j
        int[,] dp = new int[n, n];

        // Base case: Only one number left
        for (int i = 0; i < n; i++)
        {
            dp[i, i] = nums[i];
        }

        // Fill the DP table
        for (int length = 2; length <= n; length++)
        {
            for (int i = 0; i + length - 1 < n; i++)
            {
                int j = i + length - 1;

                // Pick the left number
                int pickLeft = nums[i] - dp[i + 1, j];

                // Pick the right number
                int pickRight = nums[j] - dp[i, j - 1];

                // Choose the better option
                dp[i, j] = Math.Max(pickLeft, pickRight);
            }
        }

        return dp[0, n - 1] >= 0;
    }
}