// LeetCode: Stone Game IV
//
// Approach:
// 1. Use DP where dp[i] represents whether the current player can win
//    when there are i stones remaining.
// 2. dp[0] is false because there are no stones left, so the current
//    player cannot make a move.
// 3. For every i, try removing every possible perfect square k * k.
// 4. If removing a perfect square leaves a losing position for the
//    opponent, then the current position is winning.
// 5. Therefore, dp[i] becomes true if there exists any k such that
//    dp[i - k * k] is false.
//    The recurrence is:
//    dp[i] = true if any dp[i - k * k] == false
//
// Time Complexity: O(n * sqrt(n))
// Space Complexity: O(n)

public class Solution
{
    public bool WinnerSquareGame(int n)
    {
        bool[] dp = new bool[n + 1];

        dp[0] = false;

        for (int i = 1; i <= n; i++)
        {
            for (int k = 1; k * k <= i; k++)
            {
                if (!dp[i - k * k])
                {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
}