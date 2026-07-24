// Approach:
// 1. Find the maximum value in the array and determine the XOR range.
// 2. Compute all possible XOR values of pairs (i <= j) and store them.
// 3. XOR each pair XOR value with every element in the array to generate all possible triplet XOR values.
// 4. Count the number of unique triplet XOR values.
//
// Flow:
// Find Maximum Value
//         ↓
// Determine XOR Range
//         ↓
// Generate Pair XOR Values
//         ↓
// Generate Triplet XOR Values
//         ↓
// Count Unique XOR Values
//         ↓
// Return Answer
//
// Time Complexity: O(n² + U × n)
// Space Complexity: O(U)
//
// Where:
// n = nums.Length
// U = Smallest power of 2 greater than max(nums)

public class Solution
{
    public int UniqueXorTriplets(int[] nums)
    {
        int n = nums.Length;

        int maximumValue = 0;

        // Find the maximum value in the array
        foreach (int value in nums)
        {
            maximumValue = Math.Max(maximumValue, value);
        }

        // Find the smallest power of two greater than the maximum value
        int xorLimit = 1;
        while (xorLimit <= maximumValue)
        {
            xorLimit <<= 1;
        }

        // Store all possible XOR values of pairs
        bool[] pairXor = new bool[xorLimit];

        for (int i = 0; i < n; i++)
        {
            for (int j = i; j < n; j++)
            {
                pairXor[nums[i] ^ nums[j]] = true;
            }
        }

        // Store all possible XOR values of triplets
        bool[] tripletXor = new bool[xorLimit];

        for (int xorValue = 0; xorValue < xorLimit; xorValue++)
        {
            if (!pairXor[xorValue])
            {
                continue;
            }

            foreach (int value in nums)
            {
                tripletXor[xorValue ^ value] = true;
            }
        }

        // Count unique triplet XOR values
        int answer = 0;

        foreach (bool exists in tripletXor)
        {
            if (exists)
            {
                answer++;
            }
        }

        return answer;
    }
}