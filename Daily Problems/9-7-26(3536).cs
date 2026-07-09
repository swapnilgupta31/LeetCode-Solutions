// Approach:
// 1. Since nums is sorted, nodes belong to the same connected component
//    as long as the difference between consecutive values is <= maxDiff.
// 2. Assign a unique group id to every connected component.
// 3. For each query, check whether both nodes belong to the same group.
//
// Flow:
// Traverse nums
//      ↓
// Difference > maxDiff ?
//      ↓
// Yes → New Group
// No  → Same Group
//      ↓
// Process Queries
//      ↓
// Same Group ?
//      ↓
// Return true / false
//
// Time Complexity: O(n + q)
// Space Complexity: O(n)

public class Solution
{
    public bool[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries)
    {
        // group[i] = Connected Component Id of node i
        int[] group = new int[n];
        int groupId = 0;

        // Assign group ids
        for (int i = 1; i < n; i++)
        {
            if (nums[i] - nums[i - 1] > maxDiff)
            {
                groupId++;
            }

            group[i] = groupId;
        }

        bool[] answer = new bool[queries.Length];

        // Answer each query
        for (int i = 0; i < queries.Length; i++)
        {
            int u = queries[i][0];
            int v = queries[i][1];

            answer[i] = group[u] == group[v];
        }

        return answer;
    }
}