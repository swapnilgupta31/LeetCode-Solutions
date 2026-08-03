// Approach:
// 1. Create a copy of the original array and sort it.
// 2. Assign a rank to every unique number using a HashMap.
// 3. Traverse the original array and replace each element with its rank.
//
// Flow:
// Copy Array
//      ↓
// Sort Copy
//      ↓
// Assign Ranks to Unique Elements
//      ↓
// Replace Original Values with Their Rank
//      ↓
// Return Answer
//
// Time Complexity: O(n log n)
// Space Complexity: O(n)

public class Solution
{
    public int[] ArrayRankTransform(int[] arr)
    {
        // Create a copy of the array
        int[] sorted = (int[])arr.Clone();

        // Sort the copied array
        Array.Sort(sorted);

        // Store rank of each unique number
        Dictionary<int, int> rank = new Dictionary<int, int>();
        int currentRank = 1;

        foreach (int num in sorted)
        {
            if (!rank.ContainsKey(num))
            {
                rank[num] = currentRank;
                currentRank++;
            }
        }

        // Replace each element with its rank
        for (int i = 0; i < arr.Length; i++)
        {
            arr[i] = rank[arr[i]];
        }

        return arr;
    }
}