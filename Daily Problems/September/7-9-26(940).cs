// LeetCode: Distinct Subsequences II
//
// Approach:
// 1. Maintain a dp array of size 26, where dp[i] represents the number of
//    distinct subsequences ending with character ('a' + i).
// 2. For every character, calculate the total number of existing subsequences
//    and add 1 for the subsequence containing only the current character.
// 3. Store this total in dp[index] for the current character.
// 4. Replacing the previous value prevents duplicate subsequences caused by
//    repeated characters.
// 5. Finally, sum all values in dp to get the total number of distinct
//    non-empty subsequences.
//    The recurrence is:
//    newSubsequences = 1 + sum(dp[i])
//
// Time Complexity: O(26 * n) = O(n)
// Space Complexity: O(26) = O(1)

public class Solution
{
    public int DistinctSubseqII(string s)
    {
        int mod = 1000000007;

        long[] dp = new long[26];

        foreach (char c in s)
        {
            int index = c - 'a';

            long total = 1;

            for (int i = 0; i < 26; i++)
            {
                total = (total + dp[i]) % mod;
            }

            dp[index] = total;
        }

        long answer = 0;

        for (int i = 0; i < 26; i++)
        {
            answer = (answer + dp[i]) % mod;
        }

        return (int)answer;
    }
}