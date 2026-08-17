// Approach:
// 1. Count the number of stones with remainders 0, 1, and 2 when divided by 3.
// 2. If the number of remainder-0 stones is even, Alice wins only when
//    both remainder-1 and remainder-2 stones are available.
// 3. If the number of remainder-0 stones is odd, Alice wins when the
//    difference between remainder-1 and remainder-2 stones is greater than 2.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public bool StoneGameIX(int[] stones)
    {
        int[] count = new int[3];

        // Count stones based on their remainder when divided by 3
        foreach (int stone in stones)
        {
            count[stone % 3]++;
        }

        // Even number of remainder-0 stones
        if (count[0] % 2 == 0)
        {
            return count[1] > 0 && count[2] > 0;
        }

        // Odd number of remainder-0 stones
        return Math.Abs(count[1] - count[2]) > 2;
    }
}