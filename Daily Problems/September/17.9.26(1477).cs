public class Solution
{
    public int MinSumOfLengths(int[] arr, int target)
    {
        int n = arr.Length;
        int[] dp = new int[n + 1];

        int inf = 1000000;

        for (int i = 0; i <= n; i++)
        {
            dp[i] = inf;
        }

        int prefix = 0;
        int answer = inf;

        Dictionary<int, int> map = new Dictionary<int, int>();
        map[0] = 0;

        for (int i = 1; i <= n; i++)
        {
            prefix += arr[i - 1];

            dp[i] = dp[i - 1];

            if (map.ContainsKey(prefix - target))
            {
                int start = map[prefix - target];

                int length = i - start;

                if (dp[start] != inf)
                {
                    answer = Math.Min(answer, length + dp[start]);
                }

                dp[i] = Math.Min(dp[i], length);
            }

            map[prefix] = i;
        }

        if (answer == inf)
        {
            return -1;
        }

        return answer;
    }
}