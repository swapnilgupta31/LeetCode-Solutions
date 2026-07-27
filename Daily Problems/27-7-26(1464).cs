// Approach:
// 1. Traverse the array once while keeping track of the largest and second largest elements.
// 2. Update the largest value when a bigger element is found, and shift the previous largest to second largest.
// 3. Otherwise, update the second largest if the current element is greater than it.
// 4. After the traversal, compute the product of (largest - 1) and (secondLargest - 1).
//
// Flow:
// Initialize Largest & Second Largest
//              ↓
// Traverse Array
//              ↓
// Update Largest Two Elements
//              ↓
// Calculate
// (Largest - 1) × (Second Largest - 1)
//              ↓
// Return Result
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int MaxProduct(int[] nums)
    {
        int highest = 0;
        int second = 0;

        // Find the two largest elements
        foreach (int num in nums)
        {
            if (num > highest)
            {
                second = highest;
                highest = num;
            }
            else if (num > second)
            {
                second = num;
            }
        }

        // Return the maximum product
        return (highest - 1) * (second - 1);
    }
}