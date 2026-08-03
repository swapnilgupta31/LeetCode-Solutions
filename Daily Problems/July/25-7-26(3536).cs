// Approach:
// 1. Traverse all digits of the given number.
// 2. Keep track of the largest and second largest digits.
// 3. Update both values whenever a larger digit is found.
// 4. Return the product of the two largest digits.
//
// Flow:
// Extract Digits
//       ↓
// Track Largest & Second Largest
//       ↓
// Multiply Both Digits
//       ↓
// Return Answer
//
// Time Complexity: O(d)
// Space Complexity: O(1)
//
// Where:
// d = Number of digits in n

public class Solution
{
    public int MaxProduct(int n)
    {
        int largest = 0;
        int secondLargest = 0;

        // Find the largest and second largest digits
        while (n > 0)
        {
            int digit = n % 10;

            if (digit > largest)
            {
                secondLargest = largest;
                largest = digit;
            }
            else if (digit > secondLargest)
            {
                secondLargest = digit;
            }

            n /= 10;
        }

        // Return the product of the two largest digits
        return largest * secondLargest;
    }
}