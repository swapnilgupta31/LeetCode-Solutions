// Approach:
// 1. Find the maximum value seen so far while traversing the array.
// 2. Compute gcd(nums[i], currentMaximum) for every index and store it.
// 3. Sort the generated GCD array.
// 4. Pair the smallest and largest elements, compute their GCD, and add it to the answer.
//
// Flow:
// Traverse Array
//      ↓
// Build Prefix GCD Array
//      ↓
// Sort Prefix GCD Array
//      ↓
// Pair Smallest & Largest
//      ↓
// Compute GCD of Each Pair
//      ↓
// Sum All GCDs
//
// Time Complexity: O(n log n)
// Space Complexity: O(n)

public class Solution
{
    public long SumOfGcdPairs(int[] nums)
    {
        int n = nums.Length;
        int[] prefixGcd = new int[n];

        int currentMax = 0;

        // Build the prefix GCD array
        for (int i = 0; i < n; i++)
        {
            currentMax = Math.Max(currentMax, nums[i]);
            prefixGcd[i] = GCD(nums[i], currentMax);
        }

        // Sort the prefix GCD array
        Array.Sort(prefixGcd);

        long answer = 0;
        int left = 0;
        int right = n - 1;

        // Pair the smallest and largest elements
        while (left < right)
        {
            answer += GCD(prefixGcd[left], prefixGcd[right]);
            left++;
            right--;
        }

        return answer;
    }

    // Euclidean Algorithm to calculate GCD
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }
}