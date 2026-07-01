// Approach:
// 1. Use Multi-Source BFS from all thieves to calculate the minimum distance of every cell from its nearest thief.
// 2. Use a Max Heap (Priority Queue) to always explore the safest path first.
// 3. For each move, the path's safeness is the minimum safeness seen so far. Return when the destination is reached.
//
// Flow:
// Multi-Source BFS
//        ↓
// Distance Matrix
//        ↓
// Max Heap (Safest Path)
//        ↓
// Reach Destination
//        ↓
// Return Maximum Safeness
//
// Time Complexity: O(n² log n)
// Space Complexity: O(n²)

public class Solution
{
    int[][] dirs = new int[][]
    {
        new int[]{1,0},
        new int[]{-1,0},
        new int[]{0,1},
        new int[]{0,-1}
    };

    public int MaximumSafenessFactor(IList<IList<int>> grid)
    {
        int n = grid.Count;

        // Step 1: Compute distance of every cell from the nearest thief
        int[][] dist = new int[n][];
        for (int i = 0; i < n; i++)
        {
            dist[i] = new int[n];
            Array.Fill(dist[i], -1);
        }

        Queue<(int, int)> q = new Queue<(int, int)>();

        // Push all thieves into the queue
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] == 1)
                {
                    dist[i][j] = 0;
                    q.Enqueue((i, j));
                }
            }
        }

        // Multi-Source BFS
        while (q.Count > 0)
        {
            var (r, c) = q.Dequeue();

            foreach (var d in dirs)
            {
                int nr = r + d[0];
                int nc = c + d[1];

                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1)
                {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.Enqueue((nr, nc));
                }
            }
        }

        // Step 2: Find the safest path using a Max Heap
        bool[][] visited = new bool[n][];
        for (int i = 0; i < n; i++)
            visited[i] = new bool[n];

        PriorityQueue<(int r, int c, int safe), int> pq =
            new PriorityQueue<(int, int, int), int>();

        pq.Enqueue((0, 0, dist[0][0]), -dist[0][0]);

        while (pq.Count > 0)
        {
            var (r, c, safe) = pq.Dequeue();

            if (visited[r][c])
                continue;

            visited[r][c] = true;

            // Destination reached
            if (r == n - 1 && c == n - 1)
                return safe;

            foreach (var d in dirs)
            {
                int nr = r + d[0];
                int nc = c + d[1];

                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc])
                {
                    int newSafe = Math.Min(safe, dist[nr][nc]);
                    pq.Enqueue((nr, nc, newSafe), -newSafe);
                }
            }
        }

        return 0;
    }
}