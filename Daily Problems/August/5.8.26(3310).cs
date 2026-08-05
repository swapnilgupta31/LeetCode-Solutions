// Approach:
// 1. Build two graphs:
//    - Directed graph for method invocations.
//    - Undirected graph for connectivity.
// 2. Run DFS from method k to mark all suspicious methods.
// 3. Start DFS from every non-suspicious method in the
//    undirected graph.
// 4. If any suspicious method is reachable from a
//    non-suspicious method, it cannot be removed.
// 5. Return all remaining non-suspicious methods.
//    Otherwise, return all methods.
//
// Time Complexity: O(n + m)
// Space Complexity: O(n + m)

public class Solution
{
    private bool[] suspicious;
    private bool[] visited;

    private List<int>[] directed;
    private List<int>[] undirected;

    public IList<int> RemainingMethods(int n, int k, int[][] invocations)
    {
        suspicious = new bool[n];
        visited = new bool[n];

        directed = new List<int>[n];
        undirected = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            directed[i] = new List<int>();
            undirected[i] = new List<int>();
        }

        // Build graphs
        foreach (int[] edge in invocations)
        {
            int from = edge[0];
            int to = edge[1];

            directed[from].Add(to);

            undirected[from].Add(to);
            undirected[to].Add(from);
        }

        // Mark suspicious methods
        MarkSuspicious(k);

        // Check whether suspicious methods
        // are reachable from outside
        for (int i = 0; i < n; i++)
        {
            if (!suspicious[i] && !visited[i])
            {
                RestoreMethods(i);
            }
        }

        List<int> answer = new List<int>();

        // Return remaining methods
        for (int i = 0; i < n; i++)
        {
            if (!suspicious[i])
            {
                answer.Add(i);
            }
        }

        return answer;
    }

    // DFS to mark suspicious methods
    private void MarkSuspicious(int node)
    {
        suspicious[node] = true;

        foreach (int next in directed[node])
        {
            if (!suspicious[next])
            {
                MarkSuspicious(next);
            }
        }
    }

    // DFS from non-suspicious methods
    private void RestoreMethods(int node)
    {
        visited[node] = true;
        suspicious[node] = false;

        foreach (int next in undirected[node])
        {
            if (!visited[next])
            {
                RestoreMethods(next);
            }
        }
    }
}