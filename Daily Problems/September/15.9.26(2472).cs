public class Solution
{
    public int MaxPalindromes(string s, int k)
    {
        int n = s.Length;

        bool[,] palindrome = new bool[n, n];

        // Check all palindromic substrings
        for (int length = 1; length <= n; length++)
        {
            for (int start = 0; start + length <= n; start++)
            {
                int end = start + length - 1;

                if (s[start] == s[end] &&
                    (length <= 2 || palindrome[start + 1, end - 1]))
                {
                    palindrome[start, end] = true;
                }
            }
        }

        int[] dp = new int[n + 1];

        for (int end = 1; end <= n; end++)
        {
            dp[end] = dp[end - 1];

            for (int start = 0; start < end; start++)
            {
                int length = end - start;

                if (length >= k && palindrome[start, end - 1])
                {
                    dp[end] = Math.Max(dp[end], dp[start] + 1);
                }
            }
        }

        return dp[n];
    }
}