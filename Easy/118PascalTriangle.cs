// Approach:
// 1. Generate the triangle row by row.
// 2. The first and last element of every row is always 1.
// 3. Every middle element is the sum of the two elements directly above it.
// 4. Store each row in the output list.
//
// Flow:
// Start
//   ↓
// Create New Row
//   ↓
// First/Last Element?
//   ↓
// Yes → Add 1
// No  → Add Sum of Two Elements Above
//   ↓
// Add Row to Output
//   ↓
// Repeat for All Rows
//
// Time Complexity: O(n²)
// Space Complexity: O(1) Extra Space (Output array excluded)
// Overall Space: O(n²)

public class Solution {
    public IList<IList<int>> Generate(int numRows) {
        IList<IList<int>> output = new List<IList<int>>();

        // Generate each row
        for (int i = 0; i < numRows; i++) {
            IList<int> row = new List<int>();

            // Fill the current row
            for (int j = 0; j <= i; j++) {

                // First and last element are always 1
                if (j == 0 || j == i) {
                    row.Add(1);
                }
                // Middle elements are the sum of the two elements above
                else {
                    row.Add(output[i - 1][j - 1] + output[i - 1][j]);
                }
            }

            // Add the completed row to the answer
            output.Add(row);
        }

        return output;
    }
}