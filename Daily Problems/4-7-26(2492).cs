// Approach:
// 1. Build an adjacency list for the given roads.
// 2. Perform DFS starting from city 1.
// 3. While traversing, keep track of the minimum road distance encountered.
// 4. Since all cities connected to city 1 can be part of a valid path to city n, the minimum edge in this connected component is the answer.
//
// Flow:
// Build Graph
//      ↓
// Start DFS from City 1
//      ↓
// Visit Connected Cities
//      ↓
// Update Minimum Edge Distance
//      ↓
// Return Minimum Score
//
// Time Complexity: O(n + roads.length)
// Space Complexity: O(n + roads.length)

public class Solution
{
    public int MinScore(int n, int[][] roads)
    {
        // Build the adjacency list
        List<(int city, int dist)>[] graph = new List<(int, int)>[n + 1];

        for (int i = 1; i <= n; i++)
            graph[i] = new List<(int, int)>();

        foreach (var road in roads)
        {
            int u = road[0];
            int v = road[1];
            int d = road[2];

            graph[u].Add((v, d));
            graph[v].Add((u, d));
        }

        bool[] visited = new bool[n + 1];
        int answer = int.MaxValue;

        // Start DFS from city 1
        DFS(1);

        return answer;

        // DFS Traversal
        void DFS(int node)
        {
            visited[node] = true;

            foreach (var (next, dist) in graph[node])
            {
                // Update the minimum edge distance
                answer = Math.Min(answer, dist);

                // Visit unvisited neighbouring cities
                if (!visited[next])
                {
                    DFS(next);
                }
            }
        }
    }
}