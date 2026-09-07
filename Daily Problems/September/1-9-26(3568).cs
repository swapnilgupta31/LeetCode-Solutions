// LeetCode: Minimum Moves to Clean the Classroom
//
// Approach:
// 1. Find the starting position 'S' and assign a unique bit to every
//    litter cell 'L'.
// 2. Represent the remaining litter using a bitmask. A cleared bit means
//    that the corresponding litter has already been collected.
// 3. Use BFS because every movement costs exactly one move, so the first
//    time we reach mask == 0 gives the minimum number of moves.
// 4. Each BFS state contains the current row, column, remaining energy,
//    and litter mask.
// 5. When moving to a litter cell, clear its corresponding bit.
// 6. When moving to a recharge cell 'R', reset the energy to its maximum.
// 7. Use a visited array to avoid processing the same state repeatedly.
//    The state is:
//    (row, column, energy, litterMask)
//
// Time Complexity: O(m * n * energy * 2^L)
// Space Complexity: O(m * n * energy * 2^L)
//    where L is the number of litter cells.

public class Solution
{
    public int MinMoves(string[] classroom, int energy)
    {
        int m = classroom.Length;
        int n = classroom[0].Length;

        int[,] id = new int[m, n];

        int sr = 0;
        int sc = 0;
        int count = 0;

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (classroom[i][j] == 'S')
                {
                    sr = i;
                    sc = j;
                }
                else if (classroom[i][j] == 'L')
                {
                    id[i, j] = count;
                    count++;
                }
            }
        }

        if (count == 0)
            return 0;

        int total = 1 << count;
        int full = total - 1;

        bool[,,,] vis = new bool[m, n, energy + 1, total];

        Queue<(int r, int c, int e, int mask)> q =
            new Queue<(int r, int c, int e, int mask)>();

        q.Enqueue((sr, sc, energy, full));
        vis[sr, sc, energy, full] = true;

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        int moves = 0;

        while (q.Count > 0)
        {
            int size = q.Count;

            while (size-- > 0)
            {
                var cur = q.Dequeue();

                int r = cur.r;
                int c = cur.c;
                int e = cur.e;
                int mask = cur.mask;

                if (mask == 0)
                    return moves;

                if (e == 0)
                    continue;

                for (int k = 0; k < 4; k++)
                {
                    int nr = r + dr[k];
                    int nc = c + dc[k];

                    if (nr < 0 || nr >= m || nc < 0 || nc >= n)
                        continue;

                    if (classroom[nr][nc] == 'X')
                        continue;

                    int ne = e - 1;
                    int nmask = mask;

                    if (classroom[nr][nc] == 'R')
                    {
                        ne = energy;
                    }

                    if (classroom[nr][nc] == 'L')
                    {
                        nmask = nmask & ~(1 << id[nr, nc]);
                    }

                    if (!vis[nr, nc, ne, nmask])
                    {
                        vis[nr, nc, ne, nmask] = true;
                        q.Enqueue((nr, nc, ne, nmask));
                    }
                }
            }

            moves++;
        }

        return -1;
    }
}