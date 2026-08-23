// LeetCode: Sum Game
//
// Approach:
// 1. Split the string into two equal halves.
// 2. Calculate the sum of digits and count '?' in both halves.
// 3. If the total number of '?' is odd, Alice always wins.
// 4. Otherwise, compare the difference between the digit sums with
//    the maximum possible difference created by the '?' characters.
// 5. Alice wins if these two values are not equal.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public bool SumGame(string num)
    {
        int leftq = 0;
        int rightq = 0;

        int leftSum = 0;
        int rightSum = 0;

        for (int i = 0; i < num.Length / 2; i++)
        {
            if (num[i] == '?')
            {
                leftq++;
            }
            else
            {
                leftSum += num[i] - '0';
            }
        }

        for (int i = num.Length / 2; i < num.Length; i++)
        {
            if (num[i] == '?')
            {
                rightq++;
            }
            else
            {
                rightSum += num[i] - '0';
            }
        }

        // Odd number of '?' means Alice always wins.
        if ((leftq + rightq) % 2 != 0)
        {
            return true;
        }

        // Check whether Alice can make the two sums different.
        return (leftSum - rightSum) != (rightq - leftq) * 9 / 2.0;
    }
}