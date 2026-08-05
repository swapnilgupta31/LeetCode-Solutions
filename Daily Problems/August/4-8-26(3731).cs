// Approach:
// 1. Find the minimum and maximum elements in the array.
// 2. Store all elements in a HashSet for O(1) lookup.
// 3. Traverse every number between min and max.
// 4. If a number is not present in the HashSet,
//    add it to the answer list.
// 5. Return the sorted list of missing numbers.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public IList<int> FindMissingElements(int[] nums)
    {
        int min = int.MaxValue;
        int max = int.MinValue;

        // Store all numbers and find min/max
        HashSet<int> seen = new HashSet<int>();

        foreach (int num in nums)
        {
            min = Math.Min(min, num);
            max = Math.Max(max, num);
            seen.Add(num);
        }

        List<int> answer = new List<int>();

        // Find all missing numbers in the range
        for (int num = min + 1; num < max; num++)
        {
            if (!seen.Contains(num))
            {
                answer.Add(num);
            }
        }

        return answer;
    }
}