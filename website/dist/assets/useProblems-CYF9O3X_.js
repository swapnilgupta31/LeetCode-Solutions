import{r as o}from"./vendor-B74zMBuY.js";const r=[{id:"Daily Problems/13-7-27(1291).cs",number:1291,title:"Problem 1291",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Start BFS with single-digit numbers (1 to 9).\r
// 2. For each number, check if it lies within the given range.\r
// 3. Generate the next sequential number by appending the next digit.\r
// 4. Continue until no more valid sequential numbers can be formed.\r
//\r
// Flow:\r
// Initialize Queue (1-9)\r
//          ↓\r
// Dequeue Number\r
//          ↓\r
// In Range ?\r
//      ↓         ↓\r
//    Yes        No\r
//      ↓\r
// Add to Answer\r
//          ↓\r
// Last Digit < 9 ?\r
//      ↓         ↓\r
//    Yes        No\r
//      ↓\r
// Generate Next Number\r
//          ↓\r
// Enqueue\r
//\r
// Time Complexity: O(1)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public IList<int> SequentialDigits(int low, int high)\r
    {\r
        List<int> answer = new List<int>();\r
        Queue<int> queue = new Queue<int>();\r
\r
        // Initialize the queue with single-digit numbers\r
        for (int i = 1; i <= 9; i++)\r
        {\r
            queue.Enqueue(i);\r
        }\r
\r
        // BFS Traversal\r
        while (queue.Count > 0)\r
        {\r
            int current = queue.Dequeue();\r
\r
            // Add the number if it lies within the range\r
            if (current >= low && current <= high)\r
            {\r
                answer.Add(current);\r
            }\r
\r
            // Get the last digit\r
            int lastDigit = current % 10;\r
\r
            // Generate the next sequential number\r
            if (lastDigit < 9)\r
            {\r
                int next = current * 10 + (lastDigit + 1);\r
\r
                // Only enqueue if it can still produce a valid answer\r
                if (next <= high)\r
                {\r
                    queue.Enqueue(next);\r
                }\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-13T15:11:09.585Z",dateLabel:"13 July 2027",dateISO:"2027-07-13",leetcodeNumber:1291},{id:"Daily Problems/10-7-27(3534).cs",number:3534,title:"Problem 3534",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Sort the nodes based on their values while storing their original indices.\r
// 2. Use the Two Pointers technique to find the farthest node directly reachable from every sorted position.\r
// 3. Assign connected component ids by checking consecutive differences.\r
// 4. Build a Binary Lifting (Sparse Table) over the farthest reachable positions.\r
// 5. For each query:\r
//    - If both nodes are in different components, return -1.\r
//    - Otherwise, use Binary Lifting to find the minimum number of jumps.\r
//\r
// Flow:\r
// Sort Nodes\r
//      ↓\r
// Two Pointers (Compute Farthest Reach)\r
//      ↓\r
// Build Connected Components\r
//      ↓\r
// Build Binary Lifting Table\r
//      ↓\r
// Process Queries\r
//      ↓\r
// Same Component ?\r
//      ↓\r
// No → -1\r
// Yes → Binary Lift to Count Minimum Jumps\r
//\r
// Time Complexity: O((n + q) log n)\r
// Space Complexity: O(n log n)\r
\r
using System;\r
\r
public class Solution\r
{\r
    public int[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries)\r
    {\r
        // Store indices and sort them according to their values\r
        int[] order = new int[n];\r
        for (int i = 0; i < n; i++)\r
        {\r
            order[i] = i;\r
        }\r
\r
        Array.Sort(order, (a, b) => nums[a].CompareTo(nums[b]));\r
\r
        int[] sortedValues = new int[n];\r
        int[] position = new int[n];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            sortedValues[i] = nums[order[i]];\r
            position[order[i]] = i;\r
        }\r
\r
        // Find the farthest directly reachable position using Two Pointers\r
        int[] farthest = new int[n];\r
        int right = 0;\r
\r
        for (int left = 0; left < n; left++)\r
        {\r
            if (right < left)\r
            {\r
                right = left;\r
            }\r
\r
            while (right + 1 < n && sortedValues[right + 1] - sortedValues[left] <= maxDiff)\r
            {\r
                right++;\r
            }\r
\r
            farthest[left] = right;\r
        }\r
\r
        // Assign connected component ids\r
        int[] component = new int[n];\r
\r
        for (int i = 1; i < n; i++)\r
        {\r
            if (sortedValues[i] - sortedValues[i - 1] <= maxDiff)\r
            {\r
                component[i] = component[i - 1];\r
            }\r
            else\r
            {\r
                component[i] = component[i - 1] + 1;\r
            }\r
        }\r
\r
        // Build Binary Lifting table\r
        int LOG = 1;\r
        while ((1 << LOG) < n)\r
        {\r
            LOG++;\r
        }\r
        LOG++;\r
\r
        int[][] jump = new int[LOG][];\r
        jump[0] = farthest;\r
\r
        for (int k = 1; k < LOG; k++)\r
        {\r
            jump[k] = new int[n];\r
\r
            for (int i = 0; i < n; i++)\r
            {\r
                jump[k][i] = jump[k - 1][jump[k - 1][i]];\r
            }\r
        }\r
\r
        int[] answer = new int[queries.Length];\r
\r
        // Process each query\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            int u = queries[i][0];\r
            int v = queries[i][1];\r
\r
            int left = position[u];\r
            int rightPos = position[v];\r
\r
            if (left == rightPos)\r
            {\r
                answer[i] = 0;\r
                continue;\r
            }\r
\r
            if (component[left] != component[rightPos])\r
            {\r
                answer[i] = -1;\r
                continue;\r
            }\r
\r
            int start = Math.Min(left, rightPos);\r
            int end = Math.Max(left, rightPos);\r
\r
            int current = start;\r
            int jumps = 0;\r
\r
            // Binary Lift to find minimum jumps\r
            for (int k = LOG - 1; k >= 0; k--)\r
            {\r
                if (jump[k][current] < end)\r
                {\r
                    current = jump[k][current];\r
                    jumps += (1 << k);\r
                }\r
            }\r
\r
            answer[i] = jumps + 1;\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-10T15:39:16.135Z",dateLabel:"10 July 2027",dateISO:"2027-07-10",leetcodeNumber:3534},{id:"Daily Problems/8-7-27(3756).cs",number:3756,title:"Problem 3756",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Precompute prefix sums of digits, count of non-zero digits, and the concatenated non-zero number modulo 1e9+7.\r
// 2. For each query, calculate:\r
//    - Sum of digits in the range.\r
//    - Count of non-zero digits.\r
//    - Concatenated non-zero number using prefix information.\r
// 3. Multiply the obtained number with the digit sum and return the result modulo 1e9+7.\r
//\r
// Flow:\r
// Precompute Prefix Arrays\r
//          ↓\r
// Process Each Query\r
//          ↓\r
// Calculate Digit Sum\r
//          ↓\r
// Calculate Non-Zero Number\r
//          ↓\r
// Multiply & Take Mod\r
//          ↓\r
// Store Answer\r
//\r
// Time Complexity: O(n + q)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    private const int MOD = 1_000_000_007;\r
    private const int MAX = 100001;\r
\r
    // Precompute powers of 10 modulo MOD\r
    private static readonly long[] pow10 = InitializePowers();\r
\r
    private static long[] InitializePowers()\r
    {\r
        long[] powers = new long[MAX];\r
        powers[0] = 1;\r
\r
        for (int i = 1; i < MAX; i++)\r
        {\r
            powers[i] = (powers[i - 1] * 10) % MOD;\r
        }\r
\r
        return powers;\r
    }\r
\r
    public int[] SumAndMultiply(string s, int[][] queries)\r
    {\r
        int n = s.Length;\r
\r
        // Prefix sum of digits\r
        int[] prefixSum = new int[n + 1];\r
\r
        // Prefix count of non-zero digits\r
        int[] nonZeroCount = new int[n + 1];\r
\r
        // Prefix concatenated non-zero number (mod MOD)\r
        long[] prefixNumber = new long[n + 1];\r
\r
        for (int i = 1; i <= n; i++)\r
        {\r
            int digit = s[i - 1] - '0';\r
\r
            prefixSum[i] = prefixSum[i - 1] + digit;\r
            nonZeroCount[i] = nonZeroCount[i - 1] + (digit > 0 ? 1 : 0);\r
\r
            if (digit > 0)\r
            {\r
                prefixNumber[i] = (prefixNumber[i - 1] * 10 + digit) % MOD;\r
            }\r
            else\r
            {\r
                prefixNumber[i] = prefixNumber[i - 1];\r
            }\r
        }\r
\r
        int[] answer = new int[queries.Length];\r
\r
        // Process each query\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            int left = queries[i][0];\r
            int right = queries[i][1];\r
\r
            // Sum of digits in the range\r
            int digitSum = prefixSum[right + 1] - prefixSum[left];\r
\r
            // Number of non-zero digits in the range\r
            int count = nonZeroCount[right + 1] - nonZeroCount[left];\r
\r
            // Concatenated non-zero number in the range\r
            long number =\r
                (prefixNumber[right + 1]\r
                - (prefixNumber[left] * pow10[count]) % MOD\r
                + MOD) % MOD;\r
\r
            // Final answer for the query\r
            answer[i] = (int)((number * digitSum) % MOD);\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-08T15:08:17.270Z",dateLabel:"8 July 2027",dateISO:"2027-07-08",leetcodeNumber:3756},{id:"Daily Problems/14-7-26(3336).cs",number:3336,title:"Problem 3336",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Use Dynamic Programming where dp[g1][g2] represents the number of ways\r
//    to form two subsequences with GCDs g1 and g2.\r
// 2. For every number, we have three choices:\r
//    - Ignore it.\r
//    - Add it to the first subsequence.\r
//    - Add it to the second subsequence.\r
// 3. Update the GCDs accordingly.\r
// 4. Sum all states where both subsequences have the same non-zero GCD.\r
//\r
// Flow:\r
// Initialize DP\r
//      ↓\r
// Process Each Number\r
//      ↓\r
// Ignore / Add to Seq1 / Add to Seq2\r
//      ↓\r
// Update GCD States\r
//      ↓\r
// Repeat for All Numbers\r
//      ↓\r
// Sum States where GCD1 == GCD2\r
//\r
// Time Complexity: O(n × 201 × 201)\r
// Space Complexity: O(201 × 201)\r
\r
public class Solution\r
{\r
    const int MOD = 1000000007;\r
    const int MAX = 200;\r
\r
    public int SubsequencePairCount(int[] nums)\r
    {\r
        // dp[g1][g2] = Number of ways to obtain GCDs g1 and g2\r
        long[,] dp = new long[MAX + 1, MAX + 1];\r
        dp[0, 0] = 1;\r
\r
        // Process every number\r
        foreach (int num in nums)\r
        {\r
            long[,] next = new long[MAX + 1, MAX + 1];\r
\r
            for (int g1 = 0; g1 <= MAX; g1++)\r
            {\r
                for (int g2 = 0; g2 <= MAX; g2++)\r
                {\r
                    long ways = dp[g1, g2];\r
\r
                    if (ways == 0)\r
                        continue;\r
\r
                    // Ignore the current number\r
                    next[g1, g2] = (next[g1, g2] + ways) % MOD;\r
\r
                    // Add the current number to the first subsequence\r
                    int newGcd1 = (g1 == 0) ? num : GCD(g1, num);\r
                    next[newGcd1, g2] = (next[newGcd1, g2] + ways) % MOD;\r
\r
                    // Add the current number to the second subsequence\r
                    int newGcd2 = (g2 == 0) ? num : GCD(g2, num);\r
                    next[g1, newGcd2] = (next[g1, newGcd2] + ways) % MOD;\r
                }\r
            }\r
\r
            dp = next;\r
        }\r
\r
        // Count all states where both subsequences have the same non-zero GCD\r
        long answer = 0;\r
\r
        for (int gcd = 1; gcd <= MAX; gcd++)\r
        {\r
            answer = (answer + dp[gcd, gcd]) % MOD;\r
        }\r
\r
        return (int)answer;\r
    }\r
\r
    // Euclidean Algorithm to calculate GCD\r
    private int GCD(int a, int b)\r
    {\r
        while (b != 0)\r
        {\r
            int temp = b;\r
            b = a % b;\r
            a = temp;\r
        }\r
\r
        return a;\r
    }\r
}`,lastModified:"2026-07-14T10:34:55.044Z",dateLabel:"14 July 2026",dateISO:"2026-07-14",leetcodeNumber:3336},{id:"Daily Problems/12-7-26(1331).cs",number:1331,title:"Problem 1331",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Create a copy of the original array and sort it.\r
// 2. Assign a rank to every unique number using a HashMap.\r
// 3. Traverse the original array and replace each element with its rank.\r
//\r
// Flow:\r
// Copy Array\r
//      ↓\r
// Sort Copy\r
//      ↓\r
// Assign Ranks to Unique Elements\r
//      ↓\r
// Replace Original Values with Their Rank\r
//      ↓\r
// Return Answer\r
//\r
// Time Complexity: O(n log n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int[] ArrayRankTransform(int[] arr)\r
    {\r
        // Create a copy of the array\r
        int[] sorted = (int[])arr.Clone();\r
\r
        // Sort the copied array\r
        Array.Sort(sorted);\r
\r
        // Store rank of each unique number\r
        Dictionary<int, int> rank = new Dictionary<int, int>();\r
        int currentRank = 1;\r
\r
        foreach (int num in sorted)\r
        {\r
            if (!rank.ContainsKey(num))\r
            {\r
                rank[num] = currentRank;\r
                currentRank++;\r
            }\r
        }\r
\r
        // Replace each element with its rank\r
        for (int i = 0; i < arr.Length; i++)\r
        {\r
            arr[i] = rank[arr[i]];\r
        }\r
\r
        return arr;\r
    }\r
}`,lastModified:"2026-07-12T15:36:39.295Z",dateLabel:"12 July 2026",dateISO:"2026-07-12",leetcodeNumber:1331},{id:"Daily Problems/11-7-26(2685).cs",number:2685,title:"Problem 2685",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Build an adjacency list for the graph.\r
// 2. Use DFS to find every connected component.\r
// 3. Count the number of nodes and the total degree in each component.\r
// 4. A component is complete if:\r
//      Total Degree = Nodes × (Nodes - 1)\r
//    (Since every edge contributes to the degree of two nodes.)\r
//\r
// Flow:\r
// Build Graph\r
//      ↓\r
// DFS for Each Component\r
//      ↓\r
// Count Nodes & Total Degree\r
//      ↓\r
// Complete Component ?\r
//      ↓\r
// Yes → Count++\r
// No  → Ignore\r
//\r
// Time Complexity: O(V + E)\r
// Space Complexity: O(V + E)\r
\r
public class Solution\r
{\r
    public int CountCompleteComponents(int n, int[][] edges)\r
    {\r
        // Build adjacency list\r
        List<int>[] graph = new List<int>[n];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            graph[i] = new List<int>();\r
        }\r
\r
        foreach (var edge in edges)\r
        {\r
            graph[edge[0]].Add(edge[1]);\r
            graph[edge[1]].Add(edge[0]);\r
        }\r
\r
        bool[] visited = new bool[n];\r
        int answer = 0;\r
\r
        // Traverse every connected component\r
        for (int i = 0; i < n; i++)\r
        {\r
            if (!visited[i])\r
            {\r
                int nodes = 0;\r
                int degreeSum = 0;\r
\r
                DFS(i);\r
\r
                // Check if the component is complete\r
                if (degreeSum == nodes * (nodes - 1))\r
                {\r
                    answer++;\r
                }\r
\r
                void DFS(int node)\r
                {\r
                    visited[node] = true;\r
                    nodes++;\r
                    degreeSum += graph[node].Count;\r
\r
                    foreach (int next in graph[node])\r
                    {\r
                        if (!visited[next])\r
                        {\r
                            DFS(next);\r
                        }\r
                    }\r
                }\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}\r
`,lastModified:"2026-07-14T14:07:52.960Z",dateLabel:"11 July 2026",dateISO:"2026-07-11",leetcodeNumber:2685},{id:"Daily Problems/9-7-26(3536).cs",number:3536,title:"Problem 3536",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Since nums is sorted, nodes belong to the same connected component\r
//    as long as the difference between consecutive values is <= maxDiff.\r
// 2. Assign a unique group id to every connected component.\r
// 3. For each query, check whether both nodes belong to the same group.\r
//\r
// Flow:\r
// Traverse nums\r
//      ↓\r
// Difference > maxDiff ?\r
//      ↓\r
// Yes → New Group\r
// No  → Same Group\r
//      ↓\r
// Process Queries\r
//      ↓\r
// Same Group ?\r
//      ↓\r
// Return true / false\r
//\r
// Time Complexity: O(n + q)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public bool[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries)\r
    {\r
        // group[i] = Connected Component Id of node i\r
        int[] group = new int[n];\r
        int groupId = 0;\r
\r
        // Assign group ids\r
        for (int i = 1; i < n; i++)\r
        {\r
            if (nums[i] - nums[i - 1] > maxDiff)\r
            {\r
                groupId++;\r
            }\r
\r
            group[i] = groupId;\r
        }\r
\r
        bool[] answer = new bool[queries.Length];\r
\r
        // Answer each query\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            int u = queries[i][0];\r
            int v = queries[i][1];\r
\r
            answer[i] = group[u] == group[v];\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-09T13:54:39.624Z",dateLabel:"9 July 2026",dateISO:"2026-07-09",leetcodeNumber:3536},{id:"Daily Problems/7-7-26(3754).cs",number:3754,title:"Problem 3754",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Convert the number into a string.\r
// 2. Ignore all zero digits while forming a new number.\r
// 3. Simultaneously calculate the sum of all non-zero digits.\r
// 4. Return the product of the new number and the calculated sum.\r
//\r
// Flow:\r
// Convert Number to String\r
//          ↓\r
// Traverse Each Digit\r
//          ↓\r
// Ignore Zero?\r
//      ↓         ↓\r
//    Yes        No\r
//     ↓          ↓\r
//   Skip   Add to New Number & Sum\r
//          ↓\r
// Multiply New Number × Sum\r
//          ↓\r
// Return Answer\r
//\r
// Time Complexity: O(d)\r
// Space Complexity: O(d)\r
// (d = Number of digits)\r
\r
public class Solution {\r
    public long SumAndMultiply(int n) {\r
\r
        // Edge case: if the number is 0\r
        if (n == 0)\r
            return 0;\r
\r
        string str = n.ToString();\r
        string output = "";\r
        int sum = 0;\r
\r
        // Build the new number and calculate the sum of non-zero digits\r
        foreach (char c in str) {\r
            if (c != '0') {\r
                output += c;\r
                sum += c - '0';\r
            }\r
        }\r
\r
        // Return the required product\r
        return long.Parse(output) * sum;\r
    }\r
}`,lastModified:"2026-07-07T10:52:46.295Z",dateLabel:"7 July 2026",dateISO:"2026-07-07",leetcodeNumber:3754},{id:"Daily Problems/6-7-26(1288).cs",number:1288,title:"Problem 1288",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Sort intervals by start in ascending order.\r
// 2. If two intervals have the same start, sort by end in descending order.\r
// 3. Traverse the sorted intervals while keeping track of the maximum ending point seen so far.\r
// 4. If the current interval's end is less than or equal to maxEnd, it is covered.\r
// 5. Otherwise, count it and update maxEnd.\r
//\r
// Flow:\r
// Sort Intervals\r
//        ↓\r
// Start ↑, End ↓\r
//        ↓\r
// Traverse Intervals\r
//        ↓\r
// Current End <= maxEnd ?\r
//        ↓\r
// Yes → Covered (Ignore)\r
// No  → Count++ & Update maxEnd\r
//\r
// Time Complexity: O(n log n)\r
// Space Complexity: O(1)\r
\r
public class Solution {\r
    public int RemoveCoveredIntervals(int[][] intervals) {\r
\r
        // Sort by start ascending, and end descending if starts are equal\r
        Array.Sort(intervals, (a, b) =>\r
        {\r
            if (a[0] == b[0])\r
                return b[1].CompareTo(a[1]);\r
\r
            return a[0].CompareTo(b[0]);\r
        });\r
\r
        int count = 1;\r
        int maxEnd = intervals[0][1];\r
\r
        // Traverse the sorted intervals\r
        for (int i = 1; i < intervals.Length; i++)\r
        {\r
            // If current interval is not covered\r
            if (intervals[i][1] > maxEnd)\r
            {\r
                count++;\r
                maxEnd = intervals[i][1];\r
            }\r
        }\r
\r
        return count;\r
    }\r
}`,lastModified:"2026-07-06T17:56:49.568Z",dateLabel:"6 July 2026",dateISO:"2026-07-06",leetcodeNumber:1288},{id:"Daily Problems/4-7-26(2492).cs",number:2492,title:"Problem 2492",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Build an adjacency list for the given roads.\r
// 2. Perform DFS starting from city 1.\r
// 3. While traversing, keep track of the minimum road distance encountered.\r
// 4. Since all cities connected to city 1 can be part of a valid path to city n, the minimum edge in this connected component is the answer.\r
//\r
// Flow:\r
// Build Graph\r
//      ↓\r
// Start DFS from City 1\r
//      ↓\r
// Visit Connected Cities\r
//      ↓\r
// Update Minimum Edge Distance\r
//      ↓\r
// Return Minimum Score\r
//\r
// Time Complexity: O(n + roads.length)\r
// Space Complexity: O(n + roads.length)\r
\r
public class Solution\r
{\r
    public int MinScore(int n, int[][] roads)\r
    {\r
        // Build the adjacency list\r
        List<(int city, int dist)>[] graph = new List<(int, int)>[n + 1];\r
\r
        for (int i = 1; i <= n; i++)\r
            graph[i] = new List<(int, int)>();\r
\r
        foreach (var road in roads)\r
        {\r
            int u = road[0];\r
            int v = road[1];\r
            int d = road[2];\r
\r
            graph[u].Add((v, d));\r
            graph[v].Add((u, d));\r
        }\r
\r
        bool[] visited = new bool[n + 1];\r
        int answer = int.MaxValue;\r
\r
        // Start DFS from city 1\r
        DFS(1);\r
\r
        return answer;\r
\r
        // DFS Traversal\r
        void DFS(int node)\r
        {\r
            visited[node] = true;\r
\r
            foreach (var (next, dist) in graph[node])\r
            {\r
                // Update the minimum edge distance\r
                answer = Math.Min(answer, dist);\r
\r
                // Visit unvisited neighbouring cities\r
                if (!visited[next])\r
                {\r
                    DFS(next);\r
                }\r
            }\r
        }\r
    }\r
}`,lastModified:"2026-07-04T16:38:05.166Z",dateLabel:"4 July 2026",dateISO:"2026-07-04",leetcodeNumber:2492},{id:"Daily Problems/2-7-26(3286).cs",number:3286,title:"Problem 3286",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Start BFS from (0,0) with the remaining health.\r
// 2. For every move, reduce health if the next cell contains 1.\r
// 3. Store the maximum health left for every cell.\r
// 4. Visit a cell again only if we reach it with more health than before.\r
// 5. If the destination is reached with health > 0, return true.\r
//\r
// Flow:\r
// Start\r
//   ↓\r
// BFS\r
//   ↓\r
// Move in 4 Directions\r
//   ↓\r
// More Health Than Previous?\r
//   ↓\r
// Yes → Update & Push into Queue\r
//   ↓\r
// Reach Destination?\r
//   ↓\r
// Return true\r
//\r
// Time Complexity: O(m × n)\r
// Space Complexity: O(m × n)\r
\r
public class Solution\r
{\r
    public bool FindSafeWalk(IList<IList<int>> grid, int health)\r
    {\r
        int rows = grid.Count;\r
        int cols = grid[0].Count;\r
\r
        // bestHealth[r][c] = maximum health left when reaching this cell\r
        int[][] bestHealth = new int[rows][];\r
        for (int i = 0; i < rows; i++)\r
        {\r
            bestHealth[i] = new int[cols];\r
        }\r
\r
        // Calculate remaining health after entering the starting cell\r
        int startHealth = health - grid[0][0];\r
\r
        if (startHealth <= 0)\r
            return false;\r
\r
        bestHealth[0][0] = startHealth;\r
\r
        // BFS Queue\r
        Queue<(int row, int col)> queue = new Queue<(int, int)>();\r
        queue.Enqueue((0, 0));\r
\r
        // 4 Possible Directions\r
        int[] dr = { -1, 1, 0, 0 };\r
        int[] dc = { 0, 0, -1, 1 };\r
\r
        while (queue.Count > 0)\r
        {\r
            var (row, col) = queue.Dequeue();\r
\r
            // Destination reached\r
            if (row == rows - 1 && col == cols - 1)\r
                return true;\r
\r
            for (int d = 0; d < 4; d++)\r
            {\r
                int newRow = row + dr[d];\r
                int newCol = col + dc[d];\r
\r
                // Skip invalid cells\r
                if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)\r
                    continue;\r
\r
                // Remaining health after moving\r
                int newHealth = bestHealth[row][col] - grid[newRow][newCol];\r
\r
                // Skip if health becomes zero or negative\r
                if (newHealth <= 0)\r
                    continue;\r
\r
                // Visit only if this path leaves us with more health\r
                if (newHealth > bestHealth[newRow][newCol])\r
                {\r
                    bestHealth[newRow][newCol] = newHealth;\r
                    queue.Enqueue((newRow, newCol));\r
                }\r
            }\r
        }\r
\r
        return false;\r
    }\r
}`,lastModified:"2026-07-02T09:20:20.079Z",dateLabel:"2 July 2026",dateISO:"2026-07-02",leetcodeNumber:3286},{id:"Daily Problems/1-7-26(2812).cs",number:2812,title:"Problem 2812",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Use Multi-Source BFS from all thieves to calculate the minimum distance of every cell from its nearest thief.\r
// 2. Use a Max Heap (Priority Queue) to always explore the safest path first.\r
// 3. For each move, the path's safeness is the minimum safeness seen so far. Return when the destination is reached.\r
//\r
// Flow:\r
// Multi-Source BFS\r
//        ↓\r
// Distance Matrix\r
//        ↓\r
// Max Heap (Safest Path)\r
//        ↓\r
// Reach Destination\r
//        ↓\r
// Return Maximum Safeness\r
//\r
// Time Complexity: O(n² log n)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    int[][] dirs = new int[][]\r
    {\r
        new int[]{1,0},\r
        new int[]{-1,0},\r
        new int[]{0,1},\r
        new int[]{0,-1}\r
    };\r
\r
    public int MaximumSafenessFactor(IList<IList<int>> grid)\r
    {\r
        int n = grid.Count;\r
\r
        // Step 1: Compute distance of every cell from the nearest thief\r
        int[][] dist = new int[n][];\r
        for (int i = 0; i < n; i++)\r
        {\r
            dist[i] = new int[n];\r
            Array.Fill(dist[i], -1);\r
        }\r
\r
        Queue<(int, int)> q = new Queue<(int, int)>();\r
\r
        // Push all thieves into the queue\r
        for (int i = 0; i < n; i++)\r
        {\r
            for (int j = 0; j < n; j++)\r
            {\r
                if (grid[i][j] == 1)\r
                {\r
                    dist[i][j] = 0;\r
                    q.Enqueue((i, j));\r
                }\r
            }\r
        }\r
\r
        // Multi-Source BFS\r
        while (q.Count > 0)\r
        {\r
            var (r, c) = q.Dequeue();\r
\r
            foreach (var d in dirs)\r
            {\r
                int nr = r + d[0];\r
                int nc = c + d[1];\r
\r
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1)\r
                {\r
                    dist[nr][nc] = dist[r][c] + 1;\r
                    q.Enqueue((nr, nc));\r
                }\r
            }\r
        }\r
\r
        // Step 2: Find the safest path using a Max Heap\r
        bool[][] visited = new bool[n][];\r
        for (int i = 0; i < n; i++)\r
            visited[i] = new bool[n];\r
\r
        PriorityQueue<(int r, int c, int safe), int> pq =\r
            new PriorityQueue<(int, int, int), int>();\r
\r
        pq.Enqueue((0, 0, dist[0][0]), -dist[0][0]);\r
\r
        while (pq.Count > 0)\r
        {\r
            var (r, c, safe) = pq.Dequeue();\r
\r
            if (visited[r][c])\r
                continue;\r
\r
            visited[r][c] = true;\r
\r
            // Destination reached\r
            if (r == n - 1 && c == n - 1)\r
                return safe;\r
\r
            foreach (var d in dirs)\r
            {\r
                int nr = r + d[0];\r
                int nc = c + d[1];\r
\r
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc])\r
                {\r
                    int newSafe = Math.Min(safe, dist[nr][nc]);\r
                    pq.Enqueue((nr, nc, newSafe), -newSafe);\r
                }\r
            }\r
        }\r
\r
        return 0;\r
    }\r
}`,lastModified:"2026-07-01T15:19:31.981Z",dateLabel:"1 July 2026",dateISO:"2026-07-01",leetcodeNumber:2812},{id:"Easy/118PascalTriangle.cs",number:118,title:"Pascal Triangle",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Generate the triangle row by row.\r
// 2. The first and last element of every row is always 1.\r
// 3. Every middle element is the sum of the two elements directly above it.\r
// 4. Store each row in the output list.\r
//\r
// Flow:\r
// Start\r
//   ↓\r
// Create New Row\r
//   ↓\r
// First/Last Element?\r
//   ↓\r
// Yes → Add 1\r
// No  → Add Sum of Two Elements Above\r
//   ↓\r
// Add Row to Output\r
//   ↓\r
// Repeat for All Rows\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(1) Extra Space (Output array excluded)\r
// Overall Space: O(n²)\r
\r
public class Solution {\r
    public IList<IList<int>> Generate(int numRows) {\r
        IList<IList<int>> output = new List<IList<int>>();\r
\r
        // Generate each row\r
        for (int i = 0; i < numRows; i++) {\r
            IList<int> row = new List<int>();\r
\r
            // Fill the current row\r
            for (int j = 0; j <= i; j++) {\r
\r
                // First and last element are always 1\r
                if (j == 0 || j == i) {\r
                    row.Add(1);\r
                }\r
                // Middle elements are the sum of the two elements above\r
                else {\r
                    row.Add(output[i - 1][j - 1] + output[i - 1][j]);\r
                }\r
            }\r
\r
            // Add the completed row to the answer\r
            output.Add(row);\r
        }\r
\r
        return output;\r
    }\r
}`,lastModified:"2026-07-02T09:29:49.253Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Medium/31NextPermutation.cs",number:31,title:"Next Permutation",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the pivot (first decreasing element from the right).\r
// 2. If no pivot exists, reverse the entire array.\r
// 3. Swap the pivot with the next greater element from the right.\r
// 4. Reverse the suffix to get the next permutation.\r
//\r
// Flow:\r
// Find Pivot\r
//     ↓\r
// Pivot Found?\r
//   /      \\\r
// No        Yes\r
// ↓          ↓\r
// Reverse   Swap with Next Greater\r
// Whole     ↓\r
// Array     Reverse Suffix\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution {\r
    public void NextPermutation(int[] nums) {\r
        int pivot = -1;\r
\r
        // Find the pivot\r
        for (int i = nums.Length - 2; i >= 0; i--) {\r
            if (nums[i] < nums[i + 1]) {\r
                pivot = i;\r
                break;\r
            }\r
        }\r
\r
        // If no pivot exists, reverse the entire array\r
        if (pivot == -1) {\r
            Reverse(nums, 0, nums.Length - 1);\r
            return;\r
        }\r
\r
        // Find the next greater element from the right and swap with the pivot\r
        for (int i = nums.Length - 1; i > pivot; i--) {\r
            if (nums[i] > nums[pivot]) {\r
                Swap(nums, i, pivot);\r
                break;\r
            }\r
        }\r
\r
        // Reverse the suffix to get the smallest possible arrangement\r
        Reverse(nums, pivot + 1, nums.Length - 1);\r
    }\r
\r
    // Swap two elements in the array\r
    private void Swap(int[] nums, int i, int j) {\r
        int temp = nums[i];\r
        nums[i] = nums[j];\r
        nums[j] = temp;\r
    }\r
\r
    // Reverse the array between two indices\r
    private void Reverse(int[] nums, int left, int right) {\r
        while (left < right) {\r
            Swap(nums, left, right);\r
            left++;\r
            right--;\r
        }\r
    }\r
}`,lastModified:"2026-07-01T09:34:53.224Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Medium/75SortColors.cs",number:75,title:"Sort Colors",category:"Medium",difficulty:"Medium",readme:"",solution:`// Algorithm: Dutch National Flag Algorithm (DNF)\r
//\r
// Approach:\r
// 1. Maintain three pointers: low, mid, and high.\r
// 2. low marks the next position for 0, mid is the current element, and high marks the next position for 2.\r
// 3. Traverse the array once:\r
//    - If nums[mid] == 0, swap it with low and increment both low and mid.\r
//    - If nums[mid] == 1, it is already in the correct position, so increment mid.\r
//    - If nums[mid] == 2, swap it with high and decrement high (do not increment mid).\r
//\r
// Flow:\r
// Initialize low, mid, high\r
//          ↓\r
// nums[mid] == 0 ?\r
//      ↓            ↓\r
//    Yes           No\r
//      ↓            ↓\r
// Swap(low,mid)  nums[mid] == 1 ?\r
// low++, mid++      ↓         ↓\r
//                 Yes        No\r
//                  ↓          ↓\r
//               mid++    Swap(mid,high)\r
//                           high--\r
//                       (mid remains)\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    // Swap two elements in the array\r
    public void Swap(int[] nums, int i, int j)\r
    {\r
        int temp = nums[i];\r
        nums[i] = nums[j];\r
        nums[j] = temp;\r
    }\r
\r
    public void SortColors(int[] nums)\r
    {\r
        int low = 0;\r
        int mid = 0;\r
        int high = nums.Length - 1;\r
\r
        // Traverse the array using the Dutch National Flag Algorithm\r
        while (mid <= high)\r
        {\r
            // Place 0 at the beginning\r
            if (nums[mid] == 0)\r
            {\r
                Swap(nums, low, mid);\r
                low++;\r
                mid++;\r
            }\r
            // 1 is already in the correct position\r
            else if (nums[mid] == 1)\r
            {\r
                mid++;\r
            }\r
            // Place 2 at the end\r
            else\r
            {\r
                Swap(nums, mid, high);\r
                high--;\r
            }\r
        }\r
    }\r
}`,lastModified:"2026-07-07T11:31:38.103Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Medium/1291__daily",number:1291,title:"Problem 1291",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Start BFS with single-digit numbers (1 to 9).\r
// 2. For each number, check if it lies within the given range.\r
// 3. Generate the next sequential number by appending the next digit.\r
// 4. Continue until no more valid sequential numbers can be formed.\r
//\r
// Flow:\r
// Initialize Queue (1-9)\r
//          ↓\r
// Dequeue Number\r
//          ↓\r
// In Range ?\r
//      ↓         ↓\r
//    Yes        No\r
//      ↓\r
// Add to Answer\r
//          ↓\r
// Last Digit < 9 ?\r
//      ↓         ↓\r
//    Yes        No\r
//      ↓\r
// Generate Next Number\r
//          ↓\r
// Enqueue\r
//\r
// Time Complexity: O(1)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public IList<int> SequentialDigits(int low, int high)\r
    {\r
        List<int> answer = new List<int>();\r
        Queue<int> queue = new Queue<int>();\r
\r
        // Initialize the queue with single-digit numbers\r
        for (int i = 1; i <= 9; i++)\r
        {\r
            queue.Enqueue(i);\r
        }\r
\r
        // BFS Traversal\r
        while (queue.Count > 0)\r
        {\r
            int current = queue.Dequeue();\r
\r
            // Add the number if it lies within the range\r
            if (current >= low && current <= high)\r
            {\r
                answer.Add(current);\r
            }\r
\r
            // Get the last digit\r
            int lastDigit = current % 10;\r
\r
            // Generate the next sequential number\r
            if (lastDigit < 9)\r
            {\r
                int next = current * 10 + (lastDigit + 1);\r
\r
                // Only enqueue if it can still produce a valid answer\r
                if (next <= high)\r
                {\r
                    queue.Enqueue(next);\r
                }\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-13T15:11:09.585Z",dateLabel:"13 July 2027",dateISO:"2027-07-13",leetcodeNumber:1291},{id:"Hard/3534__daily",number:3534,title:"Problem 3534",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Sort the nodes based on their values while storing their original indices.\r
// 2. Use the Two Pointers technique to find the farthest node directly reachable from every sorted position.\r
// 3. Assign connected component ids by checking consecutive differences.\r
// 4. Build a Binary Lifting (Sparse Table) over the farthest reachable positions.\r
// 5. For each query:\r
//    - If both nodes are in different components, return -1.\r
//    - Otherwise, use Binary Lifting to find the minimum number of jumps.\r
//\r
// Flow:\r
// Sort Nodes\r
//      ↓\r
// Two Pointers (Compute Farthest Reach)\r
//      ↓\r
// Build Connected Components\r
//      ↓\r
// Build Binary Lifting Table\r
//      ↓\r
// Process Queries\r
//      ↓\r
// Same Component ?\r
//      ↓\r
// No → -1\r
// Yes → Binary Lift to Count Minimum Jumps\r
//\r
// Time Complexity: O((n + q) log n)\r
// Space Complexity: O(n log n)\r
\r
using System;\r
\r
public class Solution\r
{\r
    public int[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries)\r
    {\r
        // Store indices and sort them according to their values\r
        int[] order = new int[n];\r
        for (int i = 0; i < n; i++)\r
        {\r
            order[i] = i;\r
        }\r
\r
        Array.Sort(order, (a, b) => nums[a].CompareTo(nums[b]));\r
\r
        int[] sortedValues = new int[n];\r
        int[] position = new int[n];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            sortedValues[i] = nums[order[i]];\r
            position[order[i]] = i;\r
        }\r
\r
        // Find the farthest directly reachable position using Two Pointers\r
        int[] farthest = new int[n];\r
        int right = 0;\r
\r
        for (int left = 0; left < n; left++)\r
        {\r
            if (right < left)\r
            {\r
                right = left;\r
            }\r
\r
            while (right + 1 < n && sortedValues[right + 1] - sortedValues[left] <= maxDiff)\r
            {\r
                right++;\r
            }\r
\r
            farthest[left] = right;\r
        }\r
\r
        // Assign connected component ids\r
        int[] component = new int[n];\r
\r
        for (int i = 1; i < n; i++)\r
        {\r
            if (sortedValues[i] - sortedValues[i - 1] <= maxDiff)\r
            {\r
                component[i] = component[i - 1];\r
            }\r
            else\r
            {\r
                component[i] = component[i - 1] + 1;\r
            }\r
        }\r
\r
        // Build Binary Lifting table\r
        int LOG = 1;\r
        while ((1 << LOG) < n)\r
        {\r
            LOG++;\r
        }\r
        LOG++;\r
\r
        int[][] jump = new int[LOG][];\r
        jump[0] = farthest;\r
\r
        for (int k = 1; k < LOG; k++)\r
        {\r
            jump[k] = new int[n];\r
\r
            for (int i = 0; i < n; i++)\r
            {\r
                jump[k][i] = jump[k - 1][jump[k - 1][i]];\r
            }\r
        }\r
\r
        int[] answer = new int[queries.Length];\r
\r
        // Process each query\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            int u = queries[i][0];\r
            int v = queries[i][1];\r
\r
            int left = position[u];\r
            int rightPos = position[v];\r
\r
            if (left == rightPos)\r
            {\r
                answer[i] = 0;\r
                continue;\r
            }\r
\r
            if (component[left] != component[rightPos])\r
            {\r
                answer[i] = -1;\r
                continue;\r
            }\r
\r
            int start = Math.Min(left, rightPos);\r
            int end = Math.Max(left, rightPos);\r
\r
            int current = start;\r
            int jumps = 0;\r
\r
            // Binary Lift to find minimum jumps\r
            for (int k = LOG - 1; k >= 0; k--)\r
            {\r
                if (jump[k][current] < end)\r
                {\r
                    current = jump[k][current];\r
                    jumps += (1 << k);\r
                }\r
            }\r
\r
            answer[i] = jumps + 1;\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-10T15:39:16.135Z",dateLabel:"10 July 2027",dateISO:"2027-07-10",leetcodeNumber:3534},{id:"Hard/3756__daily",number:3756,title:"Problem 3756",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Precompute prefix sums of digits, count of non-zero digits, and the concatenated non-zero number modulo 1e9+7.\r
// 2. For each query, calculate:\r
//    - Sum of digits in the range.\r
//    - Count of non-zero digits.\r
//    - Concatenated non-zero number using prefix information.\r
// 3. Multiply the obtained number with the digit sum and return the result modulo 1e9+7.\r
//\r
// Flow:\r
// Precompute Prefix Arrays\r
//          ↓\r
// Process Each Query\r
//          ↓\r
// Calculate Digit Sum\r
//          ↓\r
// Calculate Non-Zero Number\r
//          ↓\r
// Multiply & Take Mod\r
//          ↓\r
// Store Answer\r
//\r
// Time Complexity: O(n + q)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    private const int MOD = 1_000_000_007;\r
    private const int MAX = 100001;\r
\r
    // Precompute powers of 10 modulo MOD\r
    private static readonly long[] pow10 = InitializePowers();\r
\r
    private static long[] InitializePowers()\r
    {\r
        long[] powers = new long[MAX];\r
        powers[0] = 1;\r
\r
        for (int i = 1; i < MAX; i++)\r
        {\r
            powers[i] = (powers[i - 1] * 10) % MOD;\r
        }\r
\r
        return powers;\r
    }\r
\r
    public int[] SumAndMultiply(string s, int[][] queries)\r
    {\r
        int n = s.Length;\r
\r
        // Prefix sum of digits\r
        int[] prefixSum = new int[n + 1];\r
\r
        // Prefix count of non-zero digits\r
        int[] nonZeroCount = new int[n + 1];\r
\r
        // Prefix concatenated non-zero number (mod MOD)\r
        long[] prefixNumber = new long[n + 1];\r
\r
        for (int i = 1; i <= n; i++)\r
        {\r
            int digit = s[i - 1] - '0';\r
\r
            prefixSum[i] = prefixSum[i - 1] + digit;\r
            nonZeroCount[i] = nonZeroCount[i - 1] + (digit > 0 ? 1 : 0);\r
\r
            if (digit > 0)\r
            {\r
                prefixNumber[i] = (prefixNumber[i - 1] * 10 + digit) % MOD;\r
            }\r
            else\r
            {\r
                prefixNumber[i] = prefixNumber[i - 1];\r
            }\r
        }\r
\r
        int[] answer = new int[queries.Length];\r
\r
        // Process each query\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            int left = queries[i][0];\r
            int right = queries[i][1];\r
\r
            // Sum of digits in the range\r
            int digitSum = prefixSum[right + 1] - prefixSum[left];\r
\r
            // Number of non-zero digits in the range\r
            int count = nonZeroCount[right + 1] - nonZeroCount[left];\r
\r
            // Concatenated non-zero number in the range\r
            long number =\r
                (prefixNumber[right + 1]\r
                - (prefixNumber[left] * pow10[count]) % MOD\r
                + MOD) % MOD;\r
\r
            // Final answer for the query\r
            answer[i] = (int)((number * digitSum) % MOD);\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-08T15:08:17.270Z",dateLabel:"8 July 2027",dateISO:"2027-07-08",leetcodeNumber:3756},{id:"Hard/3336__daily",number:3336,title:"Problem 3336",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Use Dynamic Programming where dp[g1][g2] represents the number of ways\r
//    to form two subsequences with GCDs g1 and g2.\r
// 2. For every number, we have three choices:\r
//    - Ignore it.\r
//    - Add it to the first subsequence.\r
//    - Add it to the second subsequence.\r
// 3. Update the GCDs accordingly.\r
// 4. Sum all states where both subsequences have the same non-zero GCD.\r
//\r
// Flow:\r
// Initialize DP\r
//      ↓\r
// Process Each Number\r
//      ↓\r
// Ignore / Add to Seq1 / Add to Seq2\r
//      ↓\r
// Update GCD States\r
//      ↓\r
// Repeat for All Numbers\r
//      ↓\r
// Sum States where GCD1 == GCD2\r
//\r
// Time Complexity: O(n × 201 × 201)\r
// Space Complexity: O(201 × 201)\r
\r
public class Solution\r
{\r
    const int MOD = 1000000007;\r
    const int MAX = 200;\r
\r
    public int SubsequencePairCount(int[] nums)\r
    {\r
        // dp[g1][g2] = Number of ways to obtain GCDs g1 and g2\r
        long[,] dp = new long[MAX + 1, MAX + 1];\r
        dp[0, 0] = 1;\r
\r
        // Process every number\r
        foreach (int num in nums)\r
        {\r
            long[,] next = new long[MAX + 1, MAX + 1];\r
\r
            for (int g1 = 0; g1 <= MAX; g1++)\r
            {\r
                for (int g2 = 0; g2 <= MAX; g2++)\r
                {\r
                    long ways = dp[g1, g2];\r
\r
                    if (ways == 0)\r
                        continue;\r
\r
                    // Ignore the current number\r
                    next[g1, g2] = (next[g1, g2] + ways) % MOD;\r
\r
                    // Add the current number to the first subsequence\r
                    int newGcd1 = (g1 == 0) ? num : GCD(g1, num);\r
                    next[newGcd1, g2] = (next[newGcd1, g2] + ways) % MOD;\r
\r
                    // Add the current number to the second subsequence\r
                    int newGcd2 = (g2 == 0) ? num : GCD(g2, num);\r
                    next[g1, newGcd2] = (next[g1, newGcd2] + ways) % MOD;\r
                }\r
            }\r
\r
            dp = next;\r
        }\r
\r
        // Count all states where both subsequences have the same non-zero GCD\r
        long answer = 0;\r
\r
        for (int gcd = 1; gcd <= MAX; gcd++)\r
        {\r
            answer = (answer + dp[gcd, gcd]) % MOD;\r
        }\r
\r
        return (int)answer;\r
    }\r
\r
    // Euclidean Algorithm to calculate GCD\r
    private int GCD(int a, int b)\r
    {\r
        while (b != 0)\r
        {\r
            int temp = b;\r
            b = a % b;\r
            a = temp;\r
        }\r
\r
        return a;\r
    }\r
}`,lastModified:"2026-07-14T10:34:55.044Z",dateLabel:"14 July 2026",dateISO:"2026-07-14",leetcodeNumber:3336},{id:"Easy/1331__daily",number:1331,title:"Problem 1331",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Create a copy of the original array and sort it.\r
// 2. Assign a rank to every unique number using a HashMap.\r
// 3. Traverse the original array and replace each element with its rank.\r
//\r
// Flow:\r
// Copy Array\r
//      ↓\r
// Sort Copy\r
//      ↓\r
// Assign Ranks to Unique Elements\r
//      ↓\r
// Replace Original Values with Their Rank\r
//      ↓\r
// Return Answer\r
//\r
// Time Complexity: O(n log n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int[] ArrayRankTransform(int[] arr)\r
    {\r
        // Create a copy of the array\r
        int[] sorted = (int[])arr.Clone();\r
\r
        // Sort the copied array\r
        Array.Sort(sorted);\r
\r
        // Store rank of each unique number\r
        Dictionary<int, int> rank = new Dictionary<int, int>();\r
        int currentRank = 1;\r
\r
        foreach (int num in sorted)\r
        {\r
            if (!rank.ContainsKey(num))\r
            {\r
                rank[num] = currentRank;\r
                currentRank++;\r
            }\r
        }\r
\r
        // Replace each element with its rank\r
        for (int i = 0; i < arr.Length; i++)\r
        {\r
            arr[i] = rank[arr[i]];\r
        }\r
\r
        return arr;\r
    }\r
}`,lastModified:"2026-07-12T15:36:39.295Z",dateLabel:"12 July 2026",dateISO:"2026-07-12",leetcodeNumber:1331},{id:"Medium/2685__daily",number:2685,title:"Problem 2685",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Build an adjacency list for the graph.\r
// 2. Use DFS to find every connected component.\r
// 3. Count the number of nodes and the total degree in each component.\r
// 4. A component is complete if:\r
//      Total Degree = Nodes × (Nodes - 1)\r
//    (Since every edge contributes to the degree of two nodes.)\r
//\r
// Flow:\r
// Build Graph\r
//      ↓\r
// DFS for Each Component\r
//      ↓\r
// Count Nodes & Total Degree\r
//      ↓\r
// Complete Component ?\r
//      ↓\r
// Yes → Count++\r
// No  → Ignore\r
//\r
// Time Complexity: O(V + E)\r
// Space Complexity: O(V + E)\r
\r
public class Solution\r
{\r
    public int CountCompleteComponents(int n, int[][] edges)\r
    {\r
        // Build adjacency list\r
        List<int>[] graph = new List<int>[n];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            graph[i] = new List<int>();\r
        }\r
\r
        foreach (var edge in edges)\r
        {\r
            graph[edge[0]].Add(edge[1]);\r
            graph[edge[1]].Add(edge[0]);\r
        }\r
\r
        bool[] visited = new bool[n];\r
        int answer = 0;\r
\r
        // Traverse every connected component\r
        for (int i = 0; i < n; i++)\r
        {\r
            if (!visited[i])\r
            {\r
                int nodes = 0;\r
                int degreeSum = 0;\r
\r
                DFS(i);\r
\r
                // Check if the component is complete\r
                if (degreeSum == nodes * (nodes - 1))\r
                {\r
                    answer++;\r
                }\r
\r
                void DFS(int node)\r
                {\r
                    visited[node] = true;\r
                    nodes++;\r
                    degreeSum += graph[node].Count;\r
\r
                    foreach (int next in graph[node])\r
                    {\r
                        if (!visited[next])\r
                        {\r
                            DFS(next);\r
                        }\r
                    }\r
                }\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}\r
`,lastModified:"2026-07-14T14:07:52.960Z",dateLabel:"11 July 2026",dateISO:"2026-07-11",leetcodeNumber:2685},{id:"Medium/3536__daily",number:3536,title:"Problem 3536",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Since nums is sorted, nodes belong to the same connected component\r
//    as long as the difference between consecutive values is <= maxDiff.\r
// 2. Assign a unique group id to every connected component.\r
// 3. For each query, check whether both nodes belong to the same group.\r
//\r
// Flow:\r
// Traverse nums\r
//      ↓\r
// Difference > maxDiff ?\r
//      ↓\r
// Yes → New Group\r
// No  → Same Group\r
//      ↓\r
// Process Queries\r
//      ↓\r
// Same Group ?\r
//      ↓\r
// Return true / false\r
//\r
// Time Complexity: O(n + q)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public bool[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries)\r
    {\r
        // group[i] = Connected Component Id of node i\r
        int[] group = new int[n];\r
        int groupId = 0;\r
\r
        // Assign group ids\r
        for (int i = 1; i < n; i++)\r
        {\r
            if (nums[i] - nums[i - 1] > maxDiff)\r
            {\r
                groupId++;\r
            }\r
\r
            group[i] = groupId;\r
        }\r
\r
        bool[] answer = new bool[queries.Length];\r
\r
        // Answer each query\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            int u = queries[i][0];\r
            int v = queries[i][1];\r
\r
            answer[i] = group[u] == group[v];\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-09T13:54:39.624Z",dateLabel:"9 July 2026",dateISO:"2026-07-09",leetcodeNumber:3536},{id:"Easy/3754__daily",number:3754,title:"Problem 3754",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Convert the number into a string.\r
// 2. Ignore all zero digits while forming a new number.\r
// 3. Simultaneously calculate the sum of all non-zero digits.\r
// 4. Return the product of the new number and the calculated sum.\r
//\r
// Flow:\r
// Convert Number to String\r
//          ↓\r
// Traverse Each Digit\r
//          ↓\r
// Ignore Zero?\r
//      ↓         ↓\r
//    Yes        No\r
//     ↓          ↓\r
//   Skip   Add to New Number & Sum\r
//          ↓\r
// Multiply New Number × Sum\r
//          ↓\r
// Return Answer\r
//\r
// Time Complexity: O(d)\r
// Space Complexity: O(d)\r
// (d = Number of digits)\r
\r
public class Solution {\r
    public long SumAndMultiply(int n) {\r
\r
        // Edge case: if the number is 0\r
        if (n == 0)\r
            return 0;\r
\r
        string str = n.ToString();\r
        string output = "";\r
        int sum = 0;\r
\r
        // Build the new number and calculate the sum of non-zero digits\r
        foreach (char c in str) {\r
            if (c != '0') {\r
                output += c;\r
                sum += c - '0';\r
            }\r
        }\r
\r
        // Return the required product\r
        return long.Parse(output) * sum;\r
    }\r
}`,lastModified:"2026-07-07T10:52:46.295Z",dateLabel:"7 July 2026",dateISO:"2026-07-07",leetcodeNumber:3754},{id:"Medium/1288__daily",number:1288,title:"Problem 1288",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Sort intervals by start in ascending order.\r
// 2. If two intervals have the same start, sort by end in descending order.\r
// 3. Traverse the sorted intervals while keeping track of the maximum ending point seen so far.\r
// 4. If the current interval's end is less than or equal to maxEnd, it is covered.\r
// 5. Otherwise, count it and update maxEnd.\r
//\r
// Flow:\r
// Sort Intervals\r
//        ↓\r
// Start ↑, End ↓\r
//        ↓\r
// Traverse Intervals\r
//        ↓\r
// Current End <= maxEnd ?\r
//        ↓\r
// Yes → Covered (Ignore)\r
// No  → Count++ & Update maxEnd\r
//\r
// Time Complexity: O(n log n)\r
// Space Complexity: O(1)\r
\r
public class Solution {\r
    public int RemoveCoveredIntervals(int[][] intervals) {\r
\r
        // Sort by start ascending, and end descending if starts are equal\r
        Array.Sort(intervals, (a, b) =>\r
        {\r
            if (a[0] == b[0])\r
                return b[1].CompareTo(a[1]);\r
\r
            return a[0].CompareTo(b[0]);\r
        });\r
\r
        int count = 1;\r
        int maxEnd = intervals[0][1];\r
\r
        // Traverse the sorted intervals\r
        for (int i = 1; i < intervals.Length; i++)\r
        {\r
            // If current interval is not covered\r
            if (intervals[i][1] > maxEnd)\r
            {\r
                count++;\r
                maxEnd = intervals[i][1];\r
            }\r
        }\r
\r
        return count;\r
    }\r
}`,lastModified:"2026-07-06T17:56:49.568Z",dateLabel:"6 July 2026",dateISO:"2026-07-06",leetcodeNumber:1288},{id:"Medium/2492__daily",number:2492,title:"Problem 2492",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Build an adjacency list for the given roads.\r
// 2. Perform DFS starting from city 1.\r
// 3. While traversing, keep track of the minimum road distance encountered.\r
// 4. Since all cities connected to city 1 can be part of a valid path to city n, the minimum edge in this connected component is the answer.\r
//\r
// Flow:\r
// Build Graph\r
//      ↓\r
// Start DFS from City 1\r
//      ↓\r
// Visit Connected Cities\r
//      ↓\r
// Update Minimum Edge Distance\r
//      ↓\r
// Return Minimum Score\r
//\r
// Time Complexity: O(n + roads.length)\r
// Space Complexity: O(n + roads.length)\r
\r
public class Solution\r
{\r
    public int MinScore(int n, int[][] roads)\r
    {\r
        // Build the adjacency list\r
        List<(int city, int dist)>[] graph = new List<(int, int)>[n + 1];\r
\r
        for (int i = 1; i <= n; i++)\r
            graph[i] = new List<(int, int)>();\r
\r
        foreach (var road in roads)\r
        {\r
            int u = road[0];\r
            int v = road[1];\r
            int d = road[2];\r
\r
            graph[u].Add((v, d));\r
            graph[v].Add((u, d));\r
        }\r
\r
        bool[] visited = new bool[n + 1];\r
        int answer = int.MaxValue;\r
\r
        // Start DFS from city 1\r
        DFS(1);\r
\r
        return answer;\r
\r
        // DFS Traversal\r
        void DFS(int node)\r
        {\r
            visited[node] = true;\r
\r
            foreach (var (next, dist) in graph[node])\r
            {\r
                // Update the minimum edge distance\r
                answer = Math.Min(answer, dist);\r
\r
                // Visit unvisited neighbouring cities\r
                if (!visited[next])\r
                {\r
                    DFS(next);\r
                }\r
            }\r
        }\r
    }\r
}`,lastModified:"2026-07-04T16:38:05.166Z",dateLabel:"4 July 2026",dateISO:"2026-07-04",leetcodeNumber:2492},{id:"Medium/3286__daily",number:3286,title:"Problem 3286",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Start BFS from (0,0) with the remaining health.\r
// 2. For every move, reduce health if the next cell contains 1.\r
// 3. Store the maximum health left for every cell.\r
// 4. Visit a cell again only if we reach it with more health than before.\r
// 5. If the destination is reached with health > 0, return true.\r
//\r
// Flow:\r
// Start\r
//   ↓\r
// BFS\r
//   ↓\r
// Move in 4 Directions\r
//   ↓\r
// More Health Than Previous?\r
//   ↓\r
// Yes → Update & Push into Queue\r
//   ↓\r
// Reach Destination?\r
//   ↓\r
// Return true\r
//\r
// Time Complexity: O(m × n)\r
// Space Complexity: O(m × n)\r
\r
public class Solution\r
{\r
    public bool FindSafeWalk(IList<IList<int>> grid, int health)\r
    {\r
        int rows = grid.Count;\r
        int cols = grid[0].Count;\r
\r
        // bestHealth[r][c] = maximum health left when reaching this cell\r
        int[][] bestHealth = new int[rows][];\r
        for (int i = 0; i < rows; i++)\r
        {\r
            bestHealth[i] = new int[cols];\r
        }\r
\r
        // Calculate remaining health after entering the starting cell\r
        int startHealth = health - grid[0][0];\r
\r
        if (startHealth <= 0)\r
            return false;\r
\r
        bestHealth[0][0] = startHealth;\r
\r
        // BFS Queue\r
        Queue<(int row, int col)> queue = new Queue<(int, int)>();\r
        queue.Enqueue((0, 0));\r
\r
        // 4 Possible Directions\r
        int[] dr = { -1, 1, 0, 0 };\r
        int[] dc = { 0, 0, -1, 1 };\r
\r
        while (queue.Count > 0)\r
        {\r
            var (row, col) = queue.Dequeue();\r
\r
            // Destination reached\r
            if (row == rows - 1 && col == cols - 1)\r
                return true;\r
\r
            for (int d = 0; d < 4; d++)\r
            {\r
                int newRow = row + dr[d];\r
                int newCol = col + dc[d];\r
\r
                // Skip invalid cells\r
                if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)\r
                    continue;\r
\r
                // Remaining health after moving\r
                int newHealth = bestHealth[row][col] - grid[newRow][newCol];\r
\r
                // Skip if health becomes zero or negative\r
                if (newHealth <= 0)\r
                    continue;\r
\r
                // Visit only if this path leaves us with more health\r
                if (newHealth > bestHealth[newRow][newCol])\r
                {\r
                    bestHealth[newRow][newCol] = newHealth;\r
                    queue.Enqueue((newRow, newCol));\r
                }\r
            }\r
        }\r
\r
        return false;\r
    }\r
}`,lastModified:"2026-07-02T09:20:20.079Z",dateLabel:"2 July 2026",dateISO:"2026-07-02",leetcodeNumber:3286},{id:"Medium/2812__daily",number:2812,title:"Problem 2812",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Use Multi-Source BFS from all thieves to calculate the minimum distance of every cell from its nearest thief.\r
// 2. Use a Max Heap (Priority Queue) to always explore the safest path first.\r
// 3. For each move, the path's safeness is the minimum safeness seen so far. Return when the destination is reached.\r
//\r
// Flow:\r
// Multi-Source BFS\r
//        ↓\r
// Distance Matrix\r
//        ↓\r
// Max Heap (Safest Path)\r
//        ↓\r
// Reach Destination\r
//        ↓\r
// Return Maximum Safeness\r
//\r
// Time Complexity: O(n² log n)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    int[][] dirs = new int[][]\r
    {\r
        new int[]{1,0},\r
        new int[]{-1,0},\r
        new int[]{0,1},\r
        new int[]{0,-1}\r
    };\r
\r
    public int MaximumSafenessFactor(IList<IList<int>> grid)\r
    {\r
        int n = grid.Count;\r
\r
        // Step 1: Compute distance of every cell from the nearest thief\r
        int[][] dist = new int[n][];\r
        for (int i = 0; i < n; i++)\r
        {\r
            dist[i] = new int[n];\r
            Array.Fill(dist[i], -1);\r
        }\r
\r
        Queue<(int, int)> q = new Queue<(int, int)>();\r
\r
        // Push all thieves into the queue\r
        for (int i = 0; i < n; i++)\r
        {\r
            for (int j = 0; j < n; j++)\r
            {\r
                if (grid[i][j] == 1)\r
                {\r
                    dist[i][j] = 0;\r
                    q.Enqueue((i, j));\r
                }\r
            }\r
        }\r
\r
        // Multi-Source BFS\r
        while (q.Count > 0)\r
        {\r
            var (r, c) = q.Dequeue();\r
\r
            foreach (var d in dirs)\r
            {\r
                int nr = r + d[0];\r
                int nc = c + d[1];\r
\r
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1)\r
                {\r
                    dist[nr][nc] = dist[r][c] + 1;\r
                    q.Enqueue((nr, nc));\r
                }\r
            }\r
        }\r
\r
        // Step 2: Find the safest path using a Max Heap\r
        bool[][] visited = new bool[n][];\r
        for (int i = 0; i < n; i++)\r
            visited[i] = new bool[n];\r
\r
        PriorityQueue<(int r, int c, int safe), int> pq =\r
            new PriorityQueue<(int, int, int), int>();\r
\r
        pq.Enqueue((0, 0, dist[0][0]), -dist[0][0]);\r
\r
        while (pq.Count > 0)\r
        {\r
            var (r, c, safe) = pq.Dequeue();\r
\r
            if (visited[r][c])\r
                continue;\r
\r
            visited[r][c] = true;\r
\r
            // Destination reached\r
            if (r == n - 1 && c == n - 1)\r
                return safe;\r
\r
            foreach (var d in dirs)\r
            {\r
                int nr = r + d[0];\r
                int nc = c + d[1];\r
\r
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc])\r
                {\r
                    int newSafe = Math.Min(safe, dist[nr][nc]);\r
                    pq.Enqueue((nr, nc, newSafe), -newSafe);\r
                }\r
            }\r
        }\r
\r
        return 0;\r
    }\r
}`,lastModified:"2026-07-01T15:19:31.981Z",dateLabel:"1 July 2026",dateISO:"2026-07-01",leetcodeNumber:2812}];function u(){return r}function l(n){return o.useMemo(()=>r.filter(e=>e.category===n),[n])}function d(){return o.useMemo(()=>({"Daily Problems":r.filter(n=>n.category==="Daily Problems").length,Easy:r.filter(n=>n.category==="Easy").length,Medium:r.filter(n=>n.category==="Medium").length,Hard:r.filter(n=>n.category==="Hard").length}),[])}function c(n,e){return o.useMemo(()=>{const i=n.trim().toLowerCase();return r.filter(t=>e==="All"||(e==="Daily"?t.category==="Daily Problems":t.difficulty===e)?i?t.title.toLowerCase().includes(i)||t.number!==null&&String(t.number).includes(i):!0:!1)},[n,e])}export{l as a,u as b,c,d as u};
