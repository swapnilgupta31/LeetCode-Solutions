// LeetCode: Distribute Elements Into Two Arrays II
//
// Approach:
// 1. Create two separate lists and place the first two elements into them.
// 2. Starting from the third element, compare the last elements of both lists.
// 3. If the last element of arr1 is greater than or equal to the last element
//    of arr2, add the current element to arr1.
// 4. Otherwise, add the current element to arr2.
// 5. Combine arr1 and arr2 into the result array.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public int[] ResultArray(int[] nums)
    {
        List<int> arr1 = new List<int>();
        List<int> arr2 = new List<int>();

        arr1.Add(nums[0]);
        arr2.Add(nums[1]);

        for (int i = 2; i < nums.Length; i++)
        {
            if (arr1[arr1.Count - 1] >= arr2[arr2.Count - 1])
            {
                arr1.Add(nums[i]);
            }
            else
            {
                arr2.Add(nums[i]);
            }
        }

        int[] result = new int[nums.Length];

        for (int i = 0; i < arr1.Count; i++)
        {
            result[i] = arr1[i];
        }

        for (int i = arr1.Count; i < nums.Length; i++)
        {
            result[i] = arr2[i - arr1.Count];
        }

        return result;
    }
}