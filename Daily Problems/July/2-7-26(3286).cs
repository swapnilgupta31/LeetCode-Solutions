// Approach:
// 1. Start BFS from (0,0) with the remaining health.
// 2. For every move, reduce health if the next cell contains 1.
// 3. Store the maximum health left for every cell.
// 4. Visit a cell again only if we reach it with more health than before.
// 5. If the destination is reached with health > 0, return true.
//
// Flow:
// Start
//   ↓
// BFS
//   ↓
// Move in 4 Directions
//   ↓
// More Health Than Previous?
//   ↓
// Yes → Update & Push into Queue
//   ↓
// Reach Destination?
//   ↓
// Return true
//
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

public class Solution
{
    public bool FindSafeWalk(IList<IList<int>> grid, int health)
    {
        int rows = grid.Count;
        int cols = grid[0].Count;

        // bestHealth[r][c] = maximum health left when reaching this cell
        int[][] bestHealth = new int[rows][];
        for (int i = 0; i < rows; i++)
        {
            bestHealth[i] = new int[cols];
        }

        // Calculate remaining health after entering the starting cell
        int startHealth = health - grid[0][0];

        if (startHealth <= 0)
            return false;

        bestHealth[0][0] = startHealth;

        // BFS Queue
        Queue<(int row, int col)> queue = new Queue<(int, int)>();
        queue.Enqueue((0, 0));

        // 4 Possible Directions
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (row, col) = queue.Dequeue();

            // Destination reached
            if (row == rows - 1 && col == cols - 1)
                return true;

            for (int d = 0; d < 4; d++)
            {
                int newRow = row + dr[d];
                int newCol = col + dc[d];

                // Skip invalid cells
                if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)
                    continue;

                // Remaining health after moving
                int newHealth = bestHealth[row][col] - grid[newRow][newCol];

                // Skip if health becomes zero or negative
                if (newHealth <= 0)
                    continue;

                // Visit only if this path leaves us with more health
                if (newHealth > bestHealth[newRow][newCol])
                {
                    bestHealth[newRow][newCol] = newHealth;
                    queue.Enqueue((newRow, newCol));
                }
            }
        }

        return false;
    }
}