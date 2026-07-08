// Algorithm: Dutch National Flag Algorithm (DNF)
//
// Approach:
// 1. Maintain three pointers: low, mid, and high.
// 2. low marks the next position for 0, mid is the current element, and high marks the next position for 2.
// 3. Traverse the array once:
//    - If nums[mid] == 0, swap it with low and increment both low and mid.
//    - If nums[mid] == 1, it is already in the correct position, so increment mid.
//    - If nums[mid] == 2, swap it with high and decrement high (do not increment mid).
//
// Flow:
// Initialize low, mid, high
//          ↓
// nums[mid] == 0 ?
//      ↓            ↓
//    Yes           No
//      ↓            ↓
// Swap(low,mid)  nums[mid] == 1 ?
// low++, mid++      ↓         ↓
//                 Yes        No
//                  ↓          ↓
//               mid++    Swap(mid,high)
//                           high--
//                       (mid remains)
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    // Swap two elements in the array
    public void Swap(int[] nums, int i, int j)
    {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public void SortColors(int[] nums)
    {
        int low = 0;
        int mid = 0;
        int high = nums.Length - 1;

        // Traverse the array using the Dutch National Flag Algorithm
        while (mid <= high)
        {
            // Place 0 at the beginning
            if (nums[mid] == 0)
            {
                Swap(nums, low, mid);
                low++;
                mid++;
            }
            // 1 is already in the correct position
            else if (nums[mid] == 1)
            {
                mid++;
            }
            // Place 2 at the end
            else
            {
                Swap(nums, mid, high);
                high--;
            }
        }
    }
}