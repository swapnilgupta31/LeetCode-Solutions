// Approach:
// 1. Count the frequency of each number in the array.
// 2. For every possible GCD value, count how many numbers are divisible by it using a sieve-like traversal.
// 3. Use the Inclusion-Exclusion Principle to calculate the number of pairs having exactly each GCD.
// 4. Build a prefix sum array to represent the cumulative count of GCD pairs.
// 5. For each query, perform Binary Search on the prefix sum array to find the required GCD value.
//
// Flow:
// Count Frequency
//       ↓
// Count Divisible Numbers
//       ↓
// Inclusion-Exclusion
//       ↓
// Exact GCD Pair Count
//       ↓
// Prefix Sum
//       ↓
// Binary Search
//       ↓
// Return Answers
//
// Time Complexity: O(M log M + Q log M)
// Space Complexity: O(M)
//
// Where:
// M = Maximum value in nums
// Q = Number of queries

public class Solution
{
    public int[] GcdValues(int[] nums, long[] queries)
    {
        int maxValue = 0;

        // Find the maximum value in the array
        foreach (int num in nums)
        {
            if (num > maxValue)
                maxValue = num;
        }

        // Store the frequency of each number
        long[] frequency = new long[maxValue + 1];
        foreach (int num in nums)
        {
            frequency[num]++;
        }

        // Count how many numbers are divisible by each possible GCD
        long[] divisibleCount = new long[maxValue + 1];

        for (int gcd = 1; gcd <= maxValue; gcd++)
        {
            long count = 0;

            for (int multiple = gcd; multiple <= maxValue; multiple += gcd)
            {
                count += frequency[multiple];
            }

            divisibleCount[gcd] = count;
        }

        // Calculate the number of pairs having exactly each GCD
        long[] exactGcdPairs = new long[maxValue + 1];

        for (int gcd = maxValue; gcd >= 1; gcd--)
        {
            long count = divisibleCount[gcd];

            // Total pairs divisible by the current GCD
            long pairCount = count * (count - 1) / 2;

            // Remove pairs already counted for multiples of the current GCD
            for (int multiple = gcd * 2; multiple <= maxValue; multiple += gcd)
            {
                pairCount -= exactGcdPairs[multiple];
            }

            exactGcdPairs[gcd] = pairCount;
        }

        // Build the prefix sum array
        long[] prefixPairs = new long[maxValue + 1];

        for (int gcd = 1; gcd <= maxValue; gcd++)
        {
            prefixPairs[gcd] = prefixPairs[gcd - 1] + exactGcdPairs[gcd];
        }

        int[] answer = new int[queries.Length];

        // Process each query using Binary Search
        for (int i = 0; i < queries.Length; i++)
        {
            long query = queries[i];

            int left = 1;
            int right = maxValue;

            while (left < right)
            {
                int mid = left + (right - left) / 2;

                if (prefixPairs[mid] > query)
                {
                    right = mid;
                }
                else
                {
                    left = mid + 1;
                }
            }

            answer[i] = left;
        }

        return answer;
    }
}