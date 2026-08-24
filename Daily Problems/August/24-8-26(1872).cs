// LeetCode: Stone Game VIII
//
// Approach:
// 1. Calculate the prefix sum of the stones.
// 2. The first move must take at least two stones.
// 3. Work backwards from the second-last position.
// 4. At every position, Alice can either take the current prefix sum
//    or keep the previous best result.
// 5. The recurrence is:
//    answer = Math.Max(answer, prefixSum - answer)
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int StoneGameVIII(int[] stones)
    {
        int n = stones.Length;

        int sum = 0;

        for (int i = 0; i < n; i++)
        {
            sum += stones[i];
        }

        int answer = sum;

        for (int i = n - 2; i >= 1; i--)
        {
            sum -= stones[i + 1];

            answer = Math.Max(answer, sum - answer);
        }

        return answer;
    }
}