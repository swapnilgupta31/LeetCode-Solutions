// LeetCode: Check Divisibility by Digit Sum and Product
//
// Approach:
// 1. Store the original number because n is modified while extracting digits.
// 2. Extract each digit using n % 10.
// 3. Add every digit to calculate the digit sum.
// 4. Multiply every digit to calculate the digit product.
// 5. Add the digit sum and digit product.
// 6. Check whether the original number is divisible by this value.
//
// Time Complexity: O(log n)
// Space Complexity: O(1)

public class Solution
{
    public bool CheckDivisibility(int n)
    {
        int temp = n;
        int sum = 0;
        int tempSum = 0;
        int tempPro = 1;

        while (n > 0)
        {
            int digit = n % 10;
            n /= 10;

            tempSum += digit;
            tempPro *= digit;
        }

        sum = tempSum + tempPro;

        return temp % sum == 0;
    }
}