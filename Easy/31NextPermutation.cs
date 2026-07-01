// Approach:
// 1. Find the pivot (first decreasing element from the right).
// 2. If no pivot exists, reverse the entire array.
// 3. Swap the pivot with the next greater element from the right.
// 4. Reverse the suffix to get the next permutation.
//
// Flow:
// Find Pivot
//     ↓
// Pivot Found?
//   /      \
// No        Yes
// ↓          ↓
// Reverse   Swap with Next Greater
// Whole     ↓
// Array     Reverse Suffix
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution {
    public void NextPermutation(int[] nums) {
        int pivot = -1;

        // Find the pivot
        for (int i = nums.Length - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                pivot = i;
                break;
            }
        }

        // If no pivot exists, reverse the entire array
        if (pivot == -1) {
            Reverse(nums, 0, nums.Length - 1);
            return;
        }

        // Find the next greater element from the right and swap with the pivot
        for (int i = nums.Length - 1; i > pivot; i--) {
            if (nums[i] > nums[pivot]) {
                Swap(nums, i, pivot);
                break;
            }
        }

        // Reverse the suffix to get the smallest possible arrangement
        Reverse(nums, pivot + 1, nums.Length - 1);
    }

    // Swap two elements in the array
    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // Reverse the array between two indices
    private void Reverse(int[] nums, int left, int right) {
        while (left < right) {
            Swap(nums, left, right);
            left++;
            right--;
        }
    }
}