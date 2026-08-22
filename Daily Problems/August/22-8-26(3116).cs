// LeetCode: K-th Smallest Amount With Single Denomination Combination
//
// Approach:
// 1. Sort the coins and remove coins that are multiples of smaller coins.
//    Such coins are already covered by the smaller coin.
// 2. Use binary search to find the smallest value x such that there are
//    at least k valid amounts less than or equal to x.
// 3. To count valid amounts up to x, use the Inclusion-Exclusion Principle.
// 4. For every subset of coins, calculate its LCM and count how many
//    multiples of that LCM are present up to x.
// 5. Add counts for odd-sized subsets and subtract counts for even-sized subsets.
//
// Time Complexity: O(2^n * n * log(k * minCoin))
// Space Complexity: O(n)

public class Solution
{
    public long FindKthSmallest(int[] coins, int k)
    {
        Array.Sort(coins);

        List<long> arr = new List<long>();

        // Remove coins that are multiples of smaller coins.
        foreach (int coin in coins)
        {
            bool ok = true;

            foreach (long x in arr)
            {
                if (coin % x == 0)
                {
                    ok = false;
                    break;
                }
            }

            if (ok)
            {
                arr.Add(coin);
            }
        }

        long low = 1;
        long high = arr[0] * k;

        // Binary search for the kth smallest amount.
        while (low < high)
        {
            long mid = low + (high - low) / 2;

            if (Count(mid, arr) >= k)
            {
                high = mid;
            }
            else
            {
                low = mid + 1;
            }
        }

        return low;
    }

    private long Count(long x, List<long> coins)
    {
        long answer = 0;
        int n = coins.Count;

        // Inclusion-Exclusion Principle.
        for (int mask = 1; mask < (1 << n); mask++)
        {
            long lcm = 1;
            int bits = 0;
            bool valid = true;

            for (int i = 0; i < n; i++)
            {
                if ((mask & (1 << i)) != 0)
                {
                    bits++;

                    long gcd = Gcd(lcm, coins[i]);
                    lcm = lcm / gcd * coins[i];

                    if (lcm > x)
                    {
                        valid = false;
                        break;
                    }
                }
            }

            if (!valid)
            {
                continue;
            }

            long count = x / lcm;

            if (bits % 2 == 1)
            {
                answer += count;
            }
            else
            {
                answer -= count;
            }
        }

        return answer;
    }

    private long Gcd(long a, long b)
    {
        while (b != 0)
        {
            long temp = a % b;
            a = b;
            b = temp;
        }

        return a;
    }
}