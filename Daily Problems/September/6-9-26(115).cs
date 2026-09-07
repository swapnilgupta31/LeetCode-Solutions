// LeetCode: Distinct Subsequences
//
// Approach:
// 1. Use a 1D DP array where dp[j] represents the number of ways to form
//    the first j characters of t using the characters processed from s.
// 2. Initialize dp[0] = 1 because there is exactly one way to form an
//    empty string.
// 3. Traverse every character of s and compare it with characters of t.
// 4. If s[i - 1] == t[j - 1], we can either use the current character
//    from s or skip it. Therefore, add dp[j - 1] to dp[j].
// 5. Traverse j backwards so that dp[j - 1] still represents the previous
//    state and is not modified during the current iteration.
//    The recurrence is:
//    dp[j] = dp[j] + dp[j - 1]
//
// Time Complexity: O(m * n)
// Space Complexity: O(n)

public class Solution
{
    public int NumDistinct(string s, string t)
    {
        int m = s.Length;
        int n = t.Length;

        long[] dp = new long[n + 1];

        dp[0] = 1;

        for (int i = 1; i <= m; i++)
        {
            for (int j = n; j >= 1; j--)
            {
                if (s[i - 1] == t[j - 1])
                {
                    dp[j] += dp[j - 1];
                }
            }
        }

        return (int)dp[n];
    }
}