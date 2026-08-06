// Approach:
// 1. Start checking from the given number n.
// 2. Compute the product of all digits of the current number.
// 3. If the product is divisible by t, return the current number.
// 4. Otherwise, increment n and repeat the process.
//
// Time Complexity: O(k × d)
// Space Complexity: O(1)
//
// Where:
// k = Number of integers checked until the answer is found.
// d = Number of digits in the current number.

public class Solution
{
    public int SmallestNumber(int n, int t)
    {
        while (true)
        {
            int product = 1;
            int m = n;

            // Calculate the product of digits
            while (m > 0)
            {
                product *= m % 10;
                m /= 10;
            }

            // Check divisibility
            if (product % t == 0)
            {
                return n;
            }

            n++;
        }
    }
}