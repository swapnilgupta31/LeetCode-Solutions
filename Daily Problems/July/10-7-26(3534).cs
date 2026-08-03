// Approach:
// 1. Sort the nodes based on their values while storing their original indices.
// 2. Use the Two Pointers technique to find the farthest node directly reachable from every sorted position.
// 3. Assign connected component ids by checking consecutive differences.
// 4. Build a Binary Lifting (Sparse Table) over the farthest reachable positions.
// 5. For each query:
//    - If both nodes are in different components, return -1.
//    - Otherwise, use Binary Lifting to find the minimum number of jumps.
//
// Flow:
// Sort Nodes
//      ↓
// Two Pointers (Compute Farthest Reach)
//      ↓
// Build Connected Components
//      ↓
// Build Binary Lifting Table
//      ↓
// Process Queries
//      ↓
// Same Component ?
//      ↓
// No → -1
// Yes → Binary Lift to Count Minimum Jumps
//
// Time Complexity: O((n + q) log n)
// Space Complexity: O(n log n)

using System;

public class Solution
{
    public int[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries)
    {
        // Store indices and sort them according to their values
        int[] order = new int[n];
        for (int i = 0; i < n; i++)
        {
            order[i] = i;
        }

        Array.Sort(order, (a, b) => nums[a].CompareTo(nums[b]));

        int[] sortedValues = new int[n];
        int[] position = new int[n];

        for (int i = 0; i < n; i++)
        {
            sortedValues[i] = nums[order[i]];
            position[order[i]] = i;
        }

        // Find the farthest directly reachable position using Two Pointers
        int[] farthest = new int[n];
        int right = 0;

        for (int left = 0; left < n; left++)
        {
            if (right < left)
            {
                right = left;
            }

            while (right + 1 < n && sortedValues[right + 1] - sortedValues[left] <= maxDiff)
            {
                right++;
            }

            farthest[left] = right;
        }

        // Assign connected component ids
        int[] component = new int[n];

        for (int i = 1; i < n; i++)
        {
            if (sortedValues[i] - sortedValues[i - 1] <= maxDiff)
            {
                component[i] = component[i - 1];
            }
            else
            {
                component[i] = component[i - 1] + 1;
            }
        }

        // Build Binary Lifting table
        int LOG = 1;
        while ((1 << LOG) < n)
        {
            LOG++;
        }
        LOG++;

        int[][] jump = new int[LOG][];
        jump[0] = farthest;

        for (int k = 1; k < LOG; k++)
        {
            jump[k] = new int[n];

            for (int i = 0; i < n; i++)
            {
                jump[k][i] = jump[k - 1][jump[k - 1][i]];
            }
        }

        int[] answer = new int[queries.Length];

        // Process each query
        for (int i = 0; i < queries.Length; i++)
        {
            int u = queries[i][0];
            int v = queries[i][1];

            int left = position[u];
            int rightPos = position[v];

            if (left == rightPos)
            {
                answer[i] = 0;
                continue;
            }

            if (component[left] != component[rightPos])
            {
                answer[i] = -1;
                continue;
            }

            int start = Math.Min(left, rightPos);
            int end = Math.Max(left, rightPos);

            int current = start;
            int jumps = 0;

            // Binary Lift to find minimum jumps
            for (int k = LOG - 1; k >= 0; k--)
            {
                if (jump[k][current] < end)
                {
                    current = jump[k][current];
                    jumps += (1 << k);
                }
            }

            answer[i] = jumps + 1;
        }

        return answer;
    }
}