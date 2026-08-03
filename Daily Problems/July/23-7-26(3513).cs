// Approach:
// 1. If the array contains fewer than 3 elements, every element itself is a unique XOR value.
// 2. For n ≥ 3, all XOR values from 0 to the next power of two minus one can be formed.
// 3. Find the smallest power of two greater than n.
// 4. Return that power of two.
//
// Flow:
// Check Array Size
//        ↓
// n < 3 ?
//   ↓ Yes        ↓ No
// Return n   Find Next Power of Two
//                  ↓
//             Return Answer
//
// Time Complexity: O(log n)
// Space Complexity: O(1)

public class Solution
{
    public int UniqueXorTriplets(int[] nums)
    {
        int n = nums.Length;

        // If fewer than 3 elements exist, return the array size
        if (n < 3)
        {
            return n;
        }

        int nextPowerOfTwo = 1;

        // Find the smallest power of two greater than n
        while (nextPowerOfTwo <= n)
        {
            nextPowerOfTwo <<= 1;
        }

        return nextPowerOfTwo;
    }
}