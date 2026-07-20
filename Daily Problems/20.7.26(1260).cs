// Approach:
// 1. Treat the 2D grid as a single 1D array.
// 2. For each element, calculate its new position after shifting by k.
// 3. Convert the new 1D position back to 2D indices.
// 4. Place the element in its new position.
// 5. Return the shifted grid.
//
// Flow:
// Traverse Grid
//      ↓
// Convert 2D Index → 1D Index
//      ↓
// Shift by k
//      ↓
// Convert 1D Index → 2D Index
//      ↓
// Place Element
//      ↓
// Return Result
//
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

public class Solution
{
    public IList<IList<int>> ShiftGrid(int[][] grid, int k)
    {
        int rows = grid.Length;
        int cols = grid[0].Length;
        int total = rows * cols;

        k %= total;

        int[][] shiftedGrid = new int[rows][];

        // Initialize the result grid
        for (int i = 0; i < rows; i++)
        {
            shiftedGrid[i] = new int[cols];
        }

        // Place each element in its new position
        for (int row = 0; row < rows; row++)
        {
            for (int col = 0; col < cols; col++)
            {
                int currentIndex = row * cols + col;
                int newIndex = (currentIndex + k) % total;

                int newRow = newIndex / cols;
                int newCol = newIndex % cols;

                shiftedGrid[newRow][newCol] = grid[row][col];
            }
        }

        IList<IList<int>> answer = new List<IList<int>>();

        foreach (int[] row in shiftedGrid)
        {
            answer.Add(row.ToList());
        }

        return answer;
    }
}