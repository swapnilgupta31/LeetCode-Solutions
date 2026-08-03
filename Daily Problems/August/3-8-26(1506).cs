// Approach:
// 1. Let dp[i] represent the maximum score difference
//    (Current Player - Opponent) starting from index i.
// 2. From each position, try taking 1, 2, or 3 stones.
// 3. For each choice, calculate:
//      currentSum - dp[next]
// 4. Store the maximum score difference in dp[i].
// 5. If dp[0] > 0 -> Alice wins.
//    If dp[0] < 0 -> Bob wins.
//    Otherwise -> Tie.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public string StoneGameIII(int[] stoneValue)
    {
        int n = stoneValue.Length;

        // dp[i] = Maximum score difference from index i
        int[] dp = new int[n + 1];

        // Build DP from right to left
        for (int i = n - 1; i >= 0; i--)
        {
            dp[i] = int.MinValue;
            int currentSum = 0;

            // Try taking 1, 2, or 3 stones
            for (int k = 0; k < 3 && i + k < n; k++)
            {
                currentSum += stoneValue[i + k];

                // Choose the move that gives maximum score difference
                dp[i] = Math.Max(dp[i], currentSum - dp[i + k + 1]);
            }
        }

        if (dp[0] > 0)
            return "Alice";

        if (dp[0] < 0)
            return "Bob";

        return "Tie";
    }
}