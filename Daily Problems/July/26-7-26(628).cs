// Approach:
// 1. Traverse the array once while maintaining the three largest and two smallest numbers.
// 2. Update the three largest values whenever a larger element is found.
// 3. Simultaneously update the two smallest values for handling negative numbers.
// 4. The maximum product is either:
//    - Product of the three largest numbers.
//    - Product of the largest number and the two smallest numbers.
// 5. Return the greater of the two products.
//
// Flow:
// Initialize Largest & Smallest Values
//              ↓
// Traverse Array
//              ↓
// Update Top 3 Largest Numbers
//              ↓
// Update Bottom 2 Smallest Numbers
//              ↓
// Calculate:
// (Highest × Second × Third)
//          and
// (Highest × Lowest × SecondLowest)
//              ↓
// Return Maximum Product
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int MaximumProduct(int[] nums)
    {
        int highest = -1001;
        int second = -1001;
        int third = -1001;

        int lowest = 1001;
        int secondLowest = 1001;

        foreach (int num in nums)
        {
            // Update the three largest numbers
            if (num > highest)
            {
                third = second;
                second = highest;
                highest = num;
            }
            else if (num > second)
            {
                third = second;
                second = num;
            }
            else if (num > third)
            {
                third = num;
            }

            // Update the two smallest numbers
            if (num < lowest)
            {
                secondLowest = lowest;
                lowest = num;
            }
            else if (num < secondLowest)
            {
                secondLowest = num;
            }
        }

        // Return the maximum possible product
        return Math.Max(highest * second * third,
                        highest * lowest * secondLowest);
    }
}