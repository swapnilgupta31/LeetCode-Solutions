// Approach:
// 1. Build an adjacency list for the graph.
// 2. Use DFS to find every connected component.
// 3. Count the number of nodes and the total degree in each component.
// 4. A component is complete if:
//      Total Degree = Nodes × (Nodes - 1)
//    (Since every edge contributes to the degree of two nodes.)
//
// Flow:
// Build Graph
//      ↓
// DFS for Each Component
//      ↓
// Count Nodes & Total Degree
//      ↓
// Complete Component ?
//      ↓
// Yes → Count++
// No  → Ignore
//
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

public class Solution
{
    public int CountCompleteComponents(int n, int[][] edges)
    {
        // Build adjacency list
        List<int>[] graph = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }

        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }

        bool[] visited = new bool[n];
        int answer = 0;

        // Traverse every connected component
        for (int i = 0; i < n; i++)
        {
            if (!visited[i])
            {
                int nodes = 0;
                int degreeSum = 0;

                DFS(i);

                // Check if the component is complete
                if (degreeSum == nodes * (nodes - 1))
                {
                    answer++;
                }

                void DFS(int node)
                {
                    visited[node] = true;
                    nodes++;
                    degreeSum += graph[node].Count;

                    foreach (int next in graph[node])
                    {
                        if (!visited[next])
                        {
                            DFS(next);
                        }
                    }
                }
            }
        }

        return answer;
    }
}