import{r as a}from"./vendor-B74zMBuY.js";const r=[{id:"Daily Problems/13-8-26(2213).cs",number:2213,title:"Problem 2213",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Build a Segment Tree where each node stores:\r
//    - Left character\r
//    - Right character\r
//    - Prefix length of equal characters\r
//    - Suffix length of equal characters\r
//    - Maximum repeating length\r
//    - Total segment length\r
// 2. Build the tree from the original string.\r
// 3. For every query, update only the changed index.\r
// 4. Merge the affected nodes while moving back to the root.\r
// 5. The root's max value gives the longest repeating substring.\r
//\r
// Time Complexity: O(n + q log n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    private struct Node\r
    {\r
        public char leftChar;\r
        public char rightChar;\r
\r
        public int length;\r
        public int prefix;\r
        public int suffix;\r
        public int maxLength;\r
    }\r
\r
    private Node[] tree;\r
    private char[] str;\r
\r
    public int[] LongestRepeating(\r
        string s,\r
        string queryCharacters,\r
        int[] queryIndices)\r
    {\r
        int n = s.Length;\r
\r
        str = s.ToCharArray();\r
        tree = new Node[4 * n];\r
\r
        // Build Segment Tree\r
        Build(1, 0, n - 1);\r
\r
        int[] answer = new int[queryIndices.Length];\r
\r
        for (int i = 0; i < queryIndices.Length; i++)\r
        {\r
            int index = queryIndices[i];\r
\r
            // Update the character\r
            str[index] = queryCharacters[i];\r
\r
            // Update only the affected path\r
            Update(1, 0, n - 1, index);\r
\r
            // Root contains the global maximum\r
            answer[i] = tree[1].maxLength;\r
        }\r
\r
        return answer;\r
    }\r
\r
    private void Build(int node, int left, int right)\r
    {\r
        if (left == right)\r
        {\r
            tree[node] = new Node\r
            {\r
                leftChar = str[left],\r
                rightChar = str[left],\r
                length = 1,\r
                prefix = 1,\r
                suffix = 1,\r
                maxLength = 1\r
            };\r
\r
            return;\r
        }\r
\r
        int mid = left + (right - left) / 2;\r
\r
        Build(node * 2, left, mid);\r
        Build(node * 2 + 1, mid + 1, right);\r
\r
        tree[node] = Merge(tree[node * 2], tree[node * 2 + 1]);\r
    }\r
\r
    private void Update(int node, int left, int right, int index)\r
    {\r
        if (left == right)\r
        {\r
            tree[node] = new Node\r
            {\r
                leftChar = str[index],\r
                rightChar = str[index],\r
                length = 1,\r
                prefix = 1,\r
                suffix = 1,\r
                maxLength = 1\r
            };\r
\r
            return;\r
        }\r
\r
        int mid = left + (right - left) / 2;\r
\r
        if (index <= mid)\r
        {\r
            Update(node * 2, left, mid, index);\r
        }\r
        else\r
        {\r
            Update(node * 2 + 1, mid + 1, right, index);\r
        }\r
\r
        tree[node] = Merge(tree[node * 2], tree[node * 2 + 1]);\r
    }\r
\r
    private Node Merge(Node left, Node right)\r
    {\r
        Node result = new Node();\r
\r
        result.length = left.length + right.length;\r
        result.leftChar = left.leftChar;\r
        result.rightChar = right.rightChar;\r
\r
        // Prefix\r
        result.prefix = left.prefix;\r
\r
        if (left.prefix == left.length &&\r
            left.rightChar == right.leftChar)\r
        {\r
            result.prefix = left.length + right.prefix;\r
        }\r
\r
        // Suffix\r
        result.suffix = right.suffix;\r
\r
        if (right.suffix == right.length &&\r
            left.rightChar == right.leftChar)\r
        {\r
            result.suffix = right.length + left.suffix;\r
        }\r
\r
        // Maximum repeating segment\r
        result.maxLength = Math.Max(\r
            left.maxLength,\r
            right.maxLength\r
        );\r
\r
        // Join suffix of left + prefix of right\r
        if (left.rightChar == right.leftChar)\r
        {\r
            result.maxLength = Math.Max(\r
                result.maxLength,\r
                left.suffix + right.prefix\r
            );\r
        }\r
\r
        return result;\r
    }\r
}`,lastModified:"2026-08-13T08:38:34.727Z",dateLabel:"13 August 2026",dateISO:"2026-08-13",leetcodeNumber:2213},{id:"Daily Problems/12-8-26(2958).cs",number:2958,title:"Problem 2958",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Use a sliding window to maintain the longest valid subarray.\r
// 2. Store the frequency of each number inside the current window.\r
// 3. Expand the right pointer and increase the frequency.\r
// 4. If any number appears more than 2 times, move the left pointer\r
//    until the window becomes valid again.\r
// 5. Keep track of the maximum valid window length.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int MaxSubarrayLength(int[] nums, int k)\r
    {\r
        Dictionary<int, int> frequency = new Dictionary<int, int>();\r
\r
        int left = 0;\r
        int answer = 0;\r
\r
        for (int right = 0; right < nums.Length; right++)\r
        {\r
            if (!frequency.ContainsKey(nums[right]))\r
            {\r
                frequency[nums[right]] = 0;\r
            }\r
\r
            frequency[nums[right]]++;\r
\r
            // Shrink window if frequency exceeds k\r
            while (frequency[nums[right]] > k)\r
            {\r
                frequency[nums[left]]--;\r
                left++;\r
            }\r
\r
            // Update maximum window length\r
            answer = Math.Max(answer, right - left + 1);\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-08-13T06:18:34.169Z",dateLabel:"12 August 2026",dateISO:"2026-08-12",leetcodeNumber:2958},{id:"Daily Problems/11-8-26(2996).cs",number:2996,title:"Problem 2996",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the longest consecutive prefix starting from nums[0].\r
// 2. Calculate the sum of this prefix.\r
// 3. Check whether the current sum exists anywhere in the array.\r
// 4. If it exists, increment the sum and check again.\r
// 5. Return the first missing integer.\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MissingInteger(int[] nums)\r
    {\r
        int n = nums.Length;\r
        int sum = nums[0];\r
\r
        // Calculate sum of the longest consecutive prefix\r
        for (int i = 1; i < n; i++)\r
        {\r
            if (nums[i] == nums[i - 1] + 1)\r
            {\r
                sum += nums[i];\r
            }\r
            else\r
            {\r
                break;\r
            }\r
        }\r
\r
        // Find the smallest missing integer >= sum\r
        while (true)\r
        {\r
            bool found = false;\r
\r
            for (int i = 0; i < n; i++)\r
            {\r
                if (nums[i] == sum)\r
                {\r
                    found = true;\r
                    break;\r
                }\r
            }\r
\r
            if (!found)\r
            {\r
                return sum;\r
            }\r
\r
            sum++;\r
        }\r
    }\r
}`,lastModified:"2026-08-11T16:13:59.484Z",dateLabel:"11 August 2026",dateISO:"2026-08-11",leetcodeNumber:2996},{id:"Daily Problems/9-8-26(1180).cs",number:1180,title:"Problem 1180",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Calculate suffix sums so we can get the total stones\r
//    remaining from any index in O(1).\r
// 2. Let dp[i, m] represent the maximum stones the current\r
//    player can collect starting from index i with M = m.\r
// 3. If the player can take all remaining piles (2 * m >= remaining),\r
//    take all of them.\r
// 4. Otherwise, try taking x piles where 1 <= x <= 2 * m.\r
// 5. After taking x piles, the opponent's M becomes max(m, x).\r
// 6. Choose the maximum number of stones the current player can get.\r
//\r
// Time Complexity: O(n³)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    public int StoneGameII(int[] piles)\r
    {\r
        int n = piles.Length;\r
        int[,] dp = new int[n, n + 1];\r
        int[] suffixSum = new int[n];\r
\r
        // Calculate suffix sums\r
        suffixSum[n - 1] = piles[n - 1];\r
\r
        for (int i = n - 2; i >= 0; i--)\r
        {\r
            suffixSum[i] = suffixSum[i + 1] + piles[i];\r
        }\r
\r
        // Fill DP table from right to left\r
        for (int i = n - 1; i >= 0; i--)\r
        {\r
            for (int m = 1; m <= n; m++)\r
            {\r
                // Take all remaining piles\r
                if (i + 2 * m >= n)\r
                {\r
                    dp[i, m] = suffixSum[i];\r
                }\r
                else\r
                {\r
                    int maxStones = 0;\r
\r
                    // Try taking 1 to 2 * M piles\r
                    for (int x = 1; x <= 2 * m; x++)\r
                    {\r
                        int currentTake =\r
                            suffixSum[i] - dp[i + x, Math.Max(m, x)];\r
\r
                        maxStones = Math.Max(maxStones, currentTake);\r
                    }\r
\r
                    dp[i, m] = maxStones;\r
                }\r
            }\r
        }\r
\r
        return dp[0, 1];\r
    }\r
}`,lastModified:"2026-08-09T14:11:30.858Z",dateLabel:"9 August 2026",dateISO:"2026-08-09",leetcodeNumber:1180},{id:"Daily Problems/8-8-26(3302).cs",number:3302,title:"Problem 3302",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Build a suffixMatch array by traversing word1 from right to left.\r
// 2. suffixMatch[i] stores the earliest unmatched index in word2\r
//    after processing word1 from index i.\r
// 3. Traverse word1 from left to right greedily.\r
// 4. If characters match, include the current index.\r
// 5. Otherwise, use the one allowed mismatch only if the remaining\r
//    suffix of word2 can still be matched.\r
// 6. Since we always choose the earliest valid index, the resulting\r
//    sequence is lexicographically smallest.\r
//\r
// Time Complexity: O(n + m)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int[] ValidSequence(string word1, string word2)\r
    {\r
        int n = word1.Length;\r
        int m = word2.Length;\r
\r
        // suffixMatch[i] = Earliest unmatched index in word2\r
        // after processing word1 from index i\r
        int[] suffixMatch = new int[n + 1];\r
        suffixMatch[n] = m;\r
\r
        int j = m - 1;\r
\r
        // Build suffix matching information\r
        for (int i = n - 1; i >= 0; i--)\r
        {\r
            if (j >= 0 && word1[i] == word2[j])\r
            {\r
                j--;\r
            }\r
\r
            suffixMatch[i] = j + 1;\r
        }\r
\r
        List<int> answer = new List<int>();\r
\r
        bool mismatchUsed = false;\r
        j = 0;\r
\r
        // Build the lexicographically smallest sequence\r
        for (int i = 0; i < n && j < m; i++)\r
        {\r
            // Characters match\r
            if (word1[i] == word2[j])\r
            {\r
                answer.Add(i);\r
                j++;\r
            }\r
            // Use the one allowed mismatch\r
            else if (!mismatchUsed &&\r
                     suffixMatch[i + 1] <= j + 1)\r
            {\r
                mismatchUsed = true;\r
                answer.Add(i);\r
                j++;\r
            }\r
        }\r
\r
        // Unable to build a valid sequence\r
        if (j != m)\r
        {\r
            return Array.Empty<int>();\r
        }\r
\r
        return answer.ToArray();\r
    }\r
}`,lastModified:"2026-08-08T07:26:46.338Z",dateLabel:"8 August 2026",dateISO:"2026-08-08",leetcodeNumber:3302},{id:"Daily Problems/6-8-26(3345).cs",number:3345,title:"Problem 3345",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Start checking from the given number n.\r
// 2. Compute the product of all digits of the current number.\r
// 3. If the product is divisible by t, return the current number.\r
// 4. Otherwise, increment n and repeat the process.\r
//\r
// Time Complexity: O(k × d)\r
// Space Complexity: O(1)\r
//\r
// Where:\r
// k = Number of integers checked until the answer is found.\r
// d = Number of digits in the current number.\r
\r
public class Solution\r
{\r
    public int SmallestNumber(int n, int t)\r
    {\r
        while (true)\r
        {\r
            int product = 1;\r
            int m = n;\r
\r
            // Calculate the product of digits\r
            while (m > 0)\r
            {\r
                product *= m % 10;\r
                m /= 10;\r
            }\r
\r
            // Check divisibility\r
            if (product % t == 0)\r
            {\r
                return n;\r
            }\r
\r
            n++;\r
        }\r
    }\r
}`,lastModified:"2026-08-06T09:53:21.998Z",dateLabel:"6 August 2026",dateISO:"2026-08-06",leetcodeNumber:3345},{id:"Daily Problems/5.8.26(3310).cs",number:3310,title:"Problem 3310",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Build two graphs:\r
//    - Directed graph for method invocations.\r
//    - Undirected graph for connectivity.\r
// 2. Run DFS from method k to mark all suspicious methods.\r
// 3. Start DFS from every non-suspicious method in the\r
//    undirected graph.\r
// 4. If any suspicious method is reachable from a\r
//    non-suspicious method, it cannot be removed.\r
// 5. Return all remaining non-suspicious methods.\r
//    Otherwise, return all methods.\r
//\r
// Time Complexity: O(n + m)\r
// Space Complexity: O(n + m)\r
\r
public class Solution\r
{\r
    private bool[] suspicious;\r
    private bool[] visited;\r
\r
    private List<int>[] directed;\r
    private List<int>[] undirected;\r
\r
    public IList<int> RemainingMethods(int n, int k, int[][] invocations)\r
    {\r
        suspicious = new bool[n];\r
        visited = new bool[n];\r
\r
        directed = new List<int>[n];\r
        undirected = new List<int>[n];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            directed[i] = new List<int>();\r
            undirected[i] = new List<int>();\r
        }\r
\r
        // Build graphs\r
        foreach (int[] edge in invocations)\r
        {\r
            int from = edge[0];\r
            int to = edge[1];\r
\r
            directed[from].Add(to);\r
\r
            undirected[from].Add(to);\r
            undirected[to].Add(from);\r
        }\r
\r
        // Mark suspicious methods\r
        MarkSuspicious(k);\r
\r
        // Check whether suspicious methods\r
        // are reachable from outside\r
        for (int i = 0; i < n; i++)\r
        {\r
            if (!suspicious[i] && !visited[i])\r
            {\r
                RestoreMethods(i);\r
            }\r
        }\r
\r
        List<int> answer = new List<int>();\r
\r
        // Return remaining methods\r
        for (int i = 0; i < n; i++)\r
        {\r
            if (!suspicious[i])\r
            {\r
                answer.Add(i);\r
            }\r
        }\r
\r
        return answer;\r
    }\r
\r
    // DFS to mark suspicious methods\r
    private void MarkSuspicious(int node)\r
    {\r
        suspicious[node] = true;\r
\r
        foreach (int next in directed[node])\r
        {\r
            if (!suspicious[next])\r
            {\r
                MarkSuspicious(next);\r
            }\r
        }\r
    }\r
\r
    // DFS from non-suspicious methods\r
    private void RestoreMethods(int node)\r
    {\r
        visited[node] = true;\r
        suspicious[node] = false;\r
\r
        foreach (int next in undirected[node])\r
        {\r
            if (!visited[next])\r
            {\r
                RestoreMethods(next);\r
            }\r
        }\r
    }\r
}`,lastModified:"2026-08-05T16:54:20.799Z",dateLabel:"5 August 2026",dateISO:"2026-08-05",leetcodeNumber:3310},{id:"Daily Problems/4-8-26(3731).cs",number:3731,title:"Problem 3731",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the minimum and maximum elements in the array.\r
// 2. Store all elements in a HashSet for O(1) lookup.\r
// 3. Traverse every number between min and max.\r
// 4. If a number is not present in the HashSet,\r
//    add it to the answer list.\r
// 5. Return the sorted list of missing numbers.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public IList<int> FindMissingElements(int[] nums)\r
    {\r
        int min = int.MaxValue;\r
        int max = int.MinValue;\r
\r
        // Store all numbers and find min/max\r
        HashSet<int> seen = new HashSet<int>();\r
\r
        foreach (int num in nums)\r
        {\r
            min = Math.Min(min, num);\r
            max = Math.Max(max, num);\r
            seen.Add(num);\r
        }\r
\r
        List<int> answer = new List<int>();\r
\r
        // Find all missing numbers in the range\r
        for (int num = min + 1; num < max; num++)\r
        {\r
            if (!seen.Contains(num))\r
            {\r
                answer.Add(num);\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-08-05T12:00:38.175Z",dateLabel:"4 August 2026",dateISO:"2026-08-04",leetcodeNumber:3731},{id:"Daily Problems/3-8-26(1506).cs",number:1506,title:"Problem 1506",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Let dp[i] represent the maximum score difference\r
//    (Current Player - Opponent) starting from index i.\r
// 2. From each position, try taking 1, 2, or 3 stones.\r
// 3. For each choice, calculate:\r
//      currentSum - dp[next]\r
// 4. Store the maximum score difference in dp[i].\r
// 5. If dp[0] > 0 -> Alice wins.\r
//    If dp[0] < 0 -> Bob wins.\r
//    Otherwise -> Tie.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public string StoneGameIII(int[] stoneValue)\r
    {\r
        int n = stoneValue.Length;\r
\r
        // dp[i] = Maximum score difference from index i\r
        int[] dp = new int[n + 1];\r
\r
        // Build DP from right to left\r
        for (int i = n - 1; i >= 0; i--)\r
        {\r
            dp[i] = int.MinValue;\r
            int currentSum = 0;\r
\r
            // Try taking 1, 2, or 3 stones\r
            for (int k = 0; k < 3 && i + k < n; k++)\r
            {\r
                currentSum += stoneValue[i + k];\r
\r
                // Choose the move that gives maximum score difference\r
                dp[i] = Math.Max(dp[i], currentSum - dp[i + k + 1]);\r
            }\r
        }\r
\r
        if (dp[0] > 0)\r
            return "Alice";\r
\r
        if (dp[0] < 0)\r
            return "Bob";\r
\r
        return "Tie";\r
    }\r
}`,lastModified:"2026-08-03T12:02:58.834Z",dateLabel:"3 August 2026",dateISO:"2026-08-03",leetcodeNumber:1506},{id:"Daily Problems/2-8-26(877).cs",number:877,title:"Problem 877",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Let dp[i][j] represent the maximum score difference\r
//    (Current Player - Opponent) for piles from i to j.\r
// 2. If the current player picks the left pile,\r
//    the score difference becomes:\r
//      piles[i] - dp[i + 1][j]\r
// 3. If the current player picks the right pile,\r
//    the score difference becomes:\r
//      piles[j] - dp[i][j - 1]\r
// 4. Store the better of the two choices in dp[i][j].\r
// 5. If the final score difference is positive,\r
//    Alice can win.\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    public bool StoneGame(int[] piles)\r
    {\r
        int n = piles.Length;\r
\r
        // dp[i][j] = Maximum score difference for piles i to j\r
        int[,] dp = new int[n, n];\r
\r
        // Base case: Only one pile left\r
        for (int i = 0; i < n; i++)\r
        {\r
            dp[i, i] = piles[i];\r
        }\r
\r
        // Fill the DP table\r
        for (int length = 2; length <= n; length++)\r
        {\r
            for (int i = 0; i + length - 1 < n; i++)\r
            {\r
                int j = i + length - 1;\r
\r
                // Pick the left pile\r
                int pickLeft = piles[i] - dp[i + 1, j];\r
\r
                // Pick the right pile\r
                int pickRight = piles[j] - dp[i, j - 1];\r
\r
                // Choose the better option\r
                dp[i, j] = Math.Max(pickLeft, pickRight);\r
            }\r
        }\r
\r
        return dp[0, n - 1] > 0;\r
    }\r
}`,lastModified:"2026-08-03T12:07:05.435Z",dateLabel:"2 August 2026",dateISO:"2026-08-02",leetcodeNumber:877},{id:"Daily Problems/1-8-26(486).cs",number:486,title:"Problem 486",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Let dp[i][j] represent the maximum score difference\r
//    (Current Player - Opponent) for numbers from i to j.\r
// 2. If the current player picks the left number,\r
//    the score difference becomes:\r
//      nums[i] - dp[i + 1][j]\r
// 3. If the current player picks the right number,\r
//    the score difference becomes:\r
//      nums[j] - dp[i][j - 1]\r
// 4. Store the better of the two choices in dp[i][j].\r
// 5. If the final score difference is non-negative,\r
//    Player 1 can win or tie.\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    public bool PredictTheWinner(int[] nums)\r
    {\r
        int n = nums.Length;\r
\r
        // dp[i][j] = Maximum score difference for nums i to j\r
        int[,] dp = new int[n, n];\r
\r
        // Base case: Only one number left\r
        for (int i = 0; i < n; i++)\r
        {\r
            dp[i, i] = nums[i];\r
        }\r
\r
        // Fill the DP table\r
        for (int length = 2; length <= n; length++)\r
        {\r
            for (int i = 0; i + length - 1 < n; i++)\r
            {\r
                int j = i + length - 1;\r
\r
                // Pick the left number\r
                int pickLeft = nums[i] - dp[i + 1, j];\r
\r
                // Pick the right number\r
                int pickRight = nums[j] - dp[i, j - 1];\r
\r
                // Choose the better option\r
                dp[i, j] = Math.Max(pickLeft, pickRight);\r
            }\r
        }\r
\r
        return dp[0, n - 1] >= 0;\r
    }\r
}`,lastModified:"2026-08-03T12:07:52.819Z",dateLabel:"1 August 2026",dateISO:"2026-08-01",leetcodeNumber:486},{id:"Daily Problems/31-7-26(3016).cs",number:3016,title:"Problem 3016",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Count the frequency of each character.\r
// 2. Sort the frequencies in ascending order.\r
// 3. Traverse the array from the end (largest frequencies first).\r
// 4. Every group of 8 characters shares the same push count.\r
// 5. Add (frequency × push count) to the answer.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MinimumPushes(string word)\r
    {\r
        int[] frequency = new int[26];\r
\r
        // Count frequency of each character\r
        foreach (char c in word)\r
        {\r
            frequency[c - 'a']++;\r
        }\r
\r
        // Sort in ascending order\r
        Array.Sort(frequency);\r
\r
        int answer = 0;\r
        int pushCount = 1;\r
        int assigned = 0;\r
\r
        // Traverse from largest frequency to smallest\r
        for (int i = 25; i >= 0; i--)\r
        {\r
            if (frequency[i] == 0)\r
                break;\r
\r
            answer += frequency[i] * pushCount;\r
            assigned++;\r
\r
            // After assigning 8 characters,\r
            // increase the number of pushes required\r
            if (assigned == 8)\r
            {\r
                pushCount++;\r
                assigned = 0;\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-31T11:56:52.418Z",dateLabel:"31 July 2026",dateISO:"2026-07-31",leetcodeNumber:3016},{id:"Daily Problems/30-7-26(3014).cs",number:3014,title:"Problem 3014",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. The keyboard can assign at most 8 characters to each push count.\r
// 2. The first 8 characters require 1 push each.\r
// 3. The next 8 characters require 2 pushes each.\r
// 4. The following 8 characters require 3 pushes each.\r
// 5. Any remaining characters require 4 pushes each.\r
// 6. Compute the answer directly using the length of the word.\r
//\r
// Flow:\r
// Get Word Length\r
//        ↓\r
// Length ≤ 8 ?\r
//   ↓ Yes      ↓ No\r
// Return n     Length ≤ 16 ?\r
//               ↓ Yes      ↓ No\r
//          Return 2n-8    Length ≤ 24 ?\r
//                          ↓ Yes      ↓ No\r
//                     Return 3n-24   Return 4n-48\r
//\r
// Time Complexity: O(1)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MinimumPushes(string word)\r
    {\r
        int n = word.Length;\r
\r
        if (n <= 8)\r
            return n;\r
\r
        if (n <= 16)\r
            return 2 * n - 8;\r
\r
        if (n <= 24)\r
            return 3 * n - 24;\r
\r
        return 4 * n - 48;\r
    }\r
}`,lastModified:"2026-07-30T05:46:03.992Z",dateLabel:"30 July 2026",dateISO:"2026-07-30",leetcodeNumber:3014},{id:"Daily Problems/29-7-26(3518).cs",number:3518,title:"Problem 3518",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Since the given string is already a palindrome, only the left half needs to be rearranged.\r
// 2. Count the frequency of each character in the left half.\r
// 3. Construct the k-th lexicographically smallest left half greedily.\r
// 4. For every position, try placing each character from 'a' to 'z'.\r
// 5. Count how many palindromic arrangements are possible after fixing the current character.\r
// 6. If the number of arrangements is less than k, skip them and move to the next character.\r
// 7. Otherwise, keep the character, continue building the left half, then mirror it to obtain the final palindrome.\r
//\r
// Flow:\r
// Count Left Half Frequencies\r
//            ↓\r
// Build k-th Left Half Greedily\r
//            ↓\r
// Try Characters ('a' → 'z')\r
//            ↓\r
// Count Remaining Arrangements\r
//            ↓\r
// Enough Arrangements?\r
//      ↓ Yes           ↓ No\r
// Keep Character   Skip & Update k\r
//            ↓\r
// Append Middle Character (if any)\r
//            ↓\r
// Mirror Left Half\r
//            ↓\r
// Return Result\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public string SmallestPalindrome(string s, long k)\r
    {\r
        int partition = s.Length / 2;\r
        int[] bucket = new int[26];\r
\r
        // Count the characters in the left half\r
        for (int i = 0; i < partition; i++)\r
        {\r
            bucket[s[i] - 'a']++;\r
        }\r
\r
        // Calculate nCr with early stopping\r
        long Combination(long n, long r)\r
        {\r
            long result = 1;\r
            r = Math.Min(r, n - r);\r
\r
            for (long i = 1; i <= r; i++)\r
            {\r
                result = result * (n - i + 1) / i;\r
\r
                if (result > k)\r
                {\r
                    return k + 1;\r
                }\r
            }\r
\r
            return result;\r
        }\r
\r
        // Count the number of valid permutations\r
        long CountPermutations(int remaining)\r
        {\r
            long ways = 1;\r
\r
            for (int i = 0; i < 26; i++)\r
            {\r
                if (bucket[i] == 0)\r
                {\r
                    continue;\r
                }\r
\r
                ways *= Combination(remaining, bucket[i]);\r
\r
                if (ways > k)\r
                {\r
                    break;\r
                }\r
\r
                remaining -= bucket[i];\r
            }\r
\r
            return ways;\r
        }\r
\r
        StringBuilder left = new StringBuilder();\r
        long currentRank = 1;\r
\r
        // Construct the k-th lexicographical left half\r
        for (int pos = 0; pos < partition; pos++)\r
        {\r
            for (int ch = 0; ch < 26; ch++)\r
            {\r
                if (bucket[ch] == 0)\r
                {\r
                    continue;\r
                }\r
\r
                bucket[ch]--;\r
\r
                long ways = CountPermutations(partition - pos - 1);\r
\r
                if (currentRank + ways > k)\r
                {\r
                    left.Append((char)(ch + 'a'));\r
                    break;\r
                }\r
\r
                bucket[ch]++;\r
                currentRank += ways;\r
            }\r
        }\r
\r
        // k is larger than the total number of palindromes\r
        if (left.Length < partition)\r
        {\r
            return "";\r
        }\r
\r
        // Append the middle character for odd-length strings\r
        if ((s.Length & 1) == 1)\r
        {\r
            left.Append(s[partition]);\r
        }\r
\r
        // Mirror the left half\r
        for (int i = partition - 1; i >= 0; i--)\r
        {\r
            left.Append(left[i]);\r
        }\r
\r
        return left.ToString();\r
    }\r
}`,lastModified:"2026-07-29T16:57:20.332Z",dateLabel:"29 July 2026",dateISO:"2026-07-29",leetcodeNumber:3518},{id:"Daily Problems/28-7-26(3517).cs",number:3517,title:"Problem 3517",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Since the given string is already a palindrome, only the left half determines the entire palindrome.\r
// 2. Count the frequency of each character in the left half of the string.\r
// 3. Traverse the characters from 'a' to 'z' and place them in lexicographical order at both ends of the result.\r
// 4. If the string length is odd, keep the original middle character unchanged.\r
// 5. Return the constructed lexicographically smallest palindrome.\r
//\r
// Flow:\r
// Count Characters in Left Half\r
//            ↓\r
// Initialize Result Array\r
//            ↓\r
// Traverse Characters ('a' to 'z')\r
//            ↓\r
// Place Character at Left & Right Ends\r
//            ↓\r
// String Length is Odd?\r
//      ↓ Yes          ↓ No\r
// Place Middle      Skip\r
//            ↓\r
// Return Result\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public string SmallestPalindrome(string s)\r
    {\r
        int n = s.Length;\r
        int[] bucket = new int[26];\r
\r
        // Count the characters in the left half\r
        for (int i = 0; i < n / 2; i++)\r
        {\r
            bucket[s[i] - 'a']++;\r
        }\r
\r
        char[] result = new char[n];\r
        int left = 0;\r
        int right = n - 1;\r
\r
        // Construct the smallest palindrome\r
        for (int i = 0; i < 26; i++)\r
        {\r
            while (bucket[i] > 0)\r
            {\r
                char current = (char)('a' + i);\r
\r
                result[left++] = current;\r
                result[right--] = current;\r
\r
                bucket[i]--;\r
            }\r
        }\r
\r
        // Place the middle character for odd-length strings\r
        if ((n & 1) == 1)\r
        {\r
            result[left] = s[n / 2];\r
        }\r
\r
        return new string(result);\r
    }\r
}`,lastModified:"2026-07-28T15:25:23.458Z",dateLabel:"28 July 2026",dateISO:"2026-07-28",leetcodeNumber:3517},{id:"Daily Problems/27-7-26(1464).cs",number:1464,title:"Problem 1464",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Traverse the array once while keeping track of the largest and second largest elements.\r
// 2. Update the largest value when a bigger element is found, and shift the previous largest to second largest.\r
// 3. Otherwise, update the second largest if the current element is greater than it.\r
// 4. After the traversal, compute the product of (largest - 1) and (secondLargest - 1).\r
//\r
// Flow:\r
// Initialize Largest & Second Largest\r
//              ↓\r
// Traverse Array\r
//              ↓\r
// Update Largest Two Elements\r
//              ↓\r
// Calculate\r
// (Largest - 1) × (Second Largest - 1)\r
//              ↓\r
// Return Result\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MaxProduct(int[] nums)\r
    {\r
        int highest = 0;\r
        int second = 0;\r
\r
        // Find the two largest elements\r
        foreach (int num in nums)\r
        {\r
            if (num > highest)\r
            {\r
                second = highest;\r
                highest = num;\r
            }\r
            else if (num > second)\r
            {\r
                second = num;\r
            }\r
        }\r
\r
        // Return the maximum product\r
        return (highest - 1) * (second - 1);\r
    }\r
}`,lastModified:"2026-07-27T09:31:03.310Z",dateLabel:"27 July 2026",dateISO:"2026-07-27",leetcodeNumber:1464},{id:"Daily Problems/26-7-26(628).cs",number:628,title:"Problem 628",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Traverse the array once while maintaining the three largest and two smallest numbers.\r
// 2. Update the three largest values whenever a larger element is found.\r
// 3. Simultaneously update the two smallest values for handling negative numbers.\r
// 4. The maximum product is either:\r
//    - Product of the three largest numbers.\r
//    - Product of the largest number and the two smallest numbers.\r
// 5. Return the greater of the two products.\r
//\r
// Flow:\r
// Initialize Largest & Smallest Values\r
//              ↓\r
// Traverse Array\r
//              ↓\r
// Update Top 3 Largest Numbers\r
//              ↓\r
// Update Bottom 2 Smallest Numbers\r
//              ↓\r
// Calculate:\r
// (Highest × Second × Third)\r
//          and\r
// (Highest × Lowest × SecondLowest)\r
//              ↓\r
// Return Maximum Product\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MaximumProduct(int[] nums)\r
    {\r
        int highest = -1001;\r
        int second = -1001;\r
        int third = -1001;\r
\r
        int lowest = 1001;\r
        int secondLowest = 1001;\r
\r
        foreach (int num in nums)\r
        {\r
            // Update the three largest numbers\r
            if (num > highest)\r
            {\r
                third = second;\r
                second = highest;\r
                highest = num;\r
            }\r
            else if (num > second)\r
            {\r
                third = second;\r
                second = num;\r
            }\r
            else if (num > third)\r
            {\r
                third = num;\r
            }\r
\r
            // Update the two smallest numbers\r
            if (num < lowest)\r
            {\r
                secondLowest = lowest;\r
                lowest = num;\r
            }\r
            else if (num < secondLowest)\r
            {\r
                secondLowest = num;\r
            }\r
        }\r
\r
        // Return the maximum possible product\r
        return Math.Max(highest * second * third,\r
                        highest * lowest * secondLowest);\r
    }\r
}`,lastModified:"2026-07-26T06:53:53.280Z",dateLabel:"26 July 2026",dateISO:"2026-07-26",leetcodeNumber:628},{id:"Daily Problems/25-7-26(3536).cs",number:3536,title:"Problem 3536",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Traverse all digits of the given number.\r
// 2. Keep track of the largest and second largest digits.\r
// 3. Update both values whenever a larger digit is found.\r
// 4. Return the product of the two largest digits.\r
//\r
// Flow:\r
// Extract Digits\r
//       ↓\r
// Track Largest & Second Largest\r
//       ↓\r
// Multiply Both Digits\r
//       ↓\r
// Return Answer\r
//\r
// Time Complexity: O(d)\r
// Space Complexity: O(1)\r
//\r
// Where:\r
// d = Number of digits in n\r
\r
public class Solution\r
{\r
    public int MaxProduct(int n)\r
    {\r
        int largest = 0;\r
        int secondLargest = 0;\r
\r
        // Find the largest and second largest digits\r
        while (n > 0)\r
        {\r
            int digit = n % 10;\r
\r
            if (digit > largest)\r
            {\r
                secondLargest = largest;\r
                largest = digit;\r
            }\r
            else if (digit > secondLargest)\r
            {\r
                secondLargest = digit;\r
            }\r
\r
            n /= 10;\r
        }\r
\r
        // Return the product of the two largest digits\r
        return largest * secondLargest;\r
    }\r
}`,lastModified:"2026-07-25T05:28:39.098Z",dateLabel:"25 July 2026",dateISO:"2026-07-25",leetcodeNumber:3536},{id:"Daily Problems/24-7-26(3514).cs",number:3514,title:"Problem 3514",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the maximum value in the array and determine the XOR range.\r
// 2. Compute all possible XOR values of pairs (i <= j) and store them.\r
// 3. XOR each pair XOR value with every element in the array to generate all possible triplet XOR values.\r
// 4. Count the number of unique triplet XOR values.\r
//\r
// Flow:\r
// Find Maximum Value\r
//         ↓\r
// Determine XOR Range\r
//         ↓\r
// Generate Pair XOR Values\r
//         ↓\r
// Generate Triplet XOR Values\r
//         ↓\r
// Count Unique XOR Values\r
//         ↓\r
// Return Answer\r
//\r
// Time Complexity: O(n² + U × n)\r
// Space Complexity: O(U)\r
//\r
// Where:\r
// n = nums.Length\r
// U = Smallest power of 2 greater than max(nums)\r
\r
public class Solution\r
{\r
    public int UniqueXorTriplets(int[] nums)\r
    {\r
        int n = nums.Length;\r
\r
        int maximumValue = 0;\r
\r
        // Find the maximum value in the array\r
        foreach (int value in nums)\r
        {\r
            maximumValue = Math.Max(maximumValue, value);\r
        }\r
\r
        // Find the smallest power of two greater than the maximum value\r
        int xorLimit = 1;\r
        while (xorLimit <= maximumValue)\r
        {\r
            xorLimit <<= 1;\r
        }\r
\r
        // Store all possible XOR values of pairs\r
        bool[] pairXor = new bool[xorLimit];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            for (int j = i; j < n; j++)\r
            {\r
                pairXor[nums[i] ^ nums[j]] = true;\r
            }\r
        }\r
\r
        // Store all possible XOR values of triplets\r
        bool[] tripletXor = new bool[xorLimit];\r
\r
        for (int xorValue = 0; xorValue < xorLimit; xorValue++)\r
        {\r
            if (!pairXor[xorValue])\r
            {\r
                continue;\r
            }\r
\r
            foreach (int value in nums)\r
            {\r
                tripletXor[xorValue ^ value] = true;\r
            }\r
        }\r
\r
        // Count unique triplet XOR values\r
        int answer = 0;\r
\r
        foreach (bool exists in tripletXor)\r
        {\r
            if (exists)\r
            {\r
                answer++;\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-24T07:14:25.629Z",dateLabel:"24 July 2026",dateISO:"2026-07-24",leetcodeNumber:3514},{id:"Daily Problems/23-7-26(3513).cs",number:3513,title:"Problem 3513",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. If the array contains fewer than 3 elements, every element itself is a unique XOR value.\r
// 2. For n ≥ 3, all XOR values from 0 to the next power of two minus one can be formed.\r
// 3. Find the smallest power of two greater than n.\r
// 4. Return that power of two.\r
//\r
// Flow:\r
// Check Array Size\r
//        ↓\r
// n < 3 ?\r
//   ↓ Yes        ↓ No\r
// Return n   Find Next Power of Two\r
//                  ↓\r
//             Return Answer\r
//\r
// Time Complexity: O(log n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int UniqueXorTriplets(int[] nums)\r
    {\r
        int n = nums.Length;\r
\r
        // If fewer than 3 elements exist, return the array size\r
        if (n < 3)\r
        {\r
            return n;\r
        }\r
\r
        int nextPowerOfTwo = 1;\r
\r
        // Find the smallest power of two greater than n\r
        while (nextPowerOfTwo <= n)\r
        {\r
            nextPowerOfTwo <<= 1;\r
        }\r
\r
        return nextPowerOfTwo;\r
    }\r
}`,lastModified:"2026-07-23T14:05:58.949Z",dateLabel:"23 July 2026",dateISO:"2026-07-23",leetcodeNumber:3513},{id:"Daily Problems/22-7-26(3501).cs",number:3501,title:"Problem 3501",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Build a Segment Tree where each node stores information about the substring:\r
//    - Length of the segment.\r
//    - Number of active ('1') sections.\r
//    - First and last few run lengths.\r
//    - Maximum gain obtainable by one valid trade.\r
// 2. Merge two child nodes by combining their run information and updating the best possible trade.\r
// 3. For each query, retrieve the corresponding segment tree node.\r
// 4. Compute the maximum active sections after the optimal trade inside the queried range.\r
// 5. Add the active sections outside the range to obtain the final answer.\r
//\r
// Flow:\r
// Build Segment Tree\r
//          ↓\r
// Store Run Information\r
//          ↓\r
// Merge Child Nodes\r
//          ↓\r
// Process Each Query\r
//          ↓\r
// Compute Best Trade\r
//          ↓\r
// Return Answers\r
//\r
// Time Complexity:\r
// Build: O(n)\r
// Each Query: O(log n)\r
// Total: O(n + q log n)\r
//\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    struct Node\r
    {\r
        public int Len;\r
        public int Ones;\r
\r
        // First up to 3 run lengths from the beginning\r
        public int SChar;\r
        public int[] S;\r
\r
        // First up to 3 run lengths from the end\r
        public int EChar;\r
        public int[] E;\r
\r
        // Maximum gain obtainable by one trade\r
        public int Best;\r
    }\r
\r
    private Node[] tree;\r
    private string s;\r
    private int n;\r
\r
    public IList<int> MaxActiveSectionsAfterTrade(string s, int[][] queries)\r
    {\r
        this.s = s;\r
        n = s.Length;\r
\r
        tree = new Node[4 * n];\r
\r
        // Build the segment tree\r
        Build(1, 0, n - 1);\r
\r
        int totalOnes = 0;\r
\r
        foreach (char ch in s)\r
        {\r
            if (ch == '1')\r
            {\r
                totalOnes++;\r
            }\r
        }\r
\r
        List<int> answer = new List<int>(queries.Length);\r
\r
        foreach (int[] query in queries)\r
        {\r
            int left = query[0];\r
            int right = query[1];\r
\r
            Node current = Query(1, 0, n - 1, left, right);\r
\r
            int onesInRange = current.Ones;\r
\r
            int bestInside =\r
                Math.Min(right - left + 1, onesInRange + current.Best);\r
\r
            answer.Add((totalOnes - onesInRange) + bestInside);\r
        }\r
\r
        return answer;\r
    }\r
\r
    // Build the segment tree\r
    private void Build(int index, int left, int right)\r
    {\r
        if (left == right)\r
        {\r
            int value = s[left] == '1' ? 1 : 0;\r
\r
            tree[index] = new Node\r
            {\r
                Len = 1,\r
                Ones = value,\r
                SChar = value,\r
                S = new int[] { 1, 0, 0 },\r
                EChar = value,\r
                E = new int[] { 1, 0, 0 },\r
                Best = 0\r
            };\r
\r
            return;\r
        }\r
\r
        int mid = (left + right) / 2;\r
\r
        Build(index * 2, left, mid);\r
        Build(index * 2 + 1, mid + 1, right);\r
\r
        tree[index] = Merge(tree[index * 2], tree[index * 2 + 1]);\r
    }\r
\r
    // Combine the first three runs of two adjacent segments\r
    private (int, int[]) CombineFront(\r
        int leftChar,\r
        int[] leftRuns,\r
        int leftLength,\r
        int rightChar,\r
        int[] rightRuns)\r
    {\r
        List<(int character, int length)> runs =\r
            new List<(int, int)>();\r
\r
        int consumed = 0;\r
        int currentChar = leftChar;\r
\r
        for (int i = 0; i < 3; i++)\r
        {\r
            if (leftRuns[i] == 0)\r
            {\r
                break;\r
            }\r
\r
            runs.Add((currentChar, leftRuns[i]));\r
            consumed += leftRuns[i];\r
            currentChar ^= 1;\r
        }\r
\r
        if (consumed == leftLength)\r
        {\r
            int nextChar = rightChar;\r
            int index = 0;\r
\r
            if (runs.Count > 0 &&\r
                runs[runs.Count - 1].character == rightChar)\r
            {\r
                var last = runs[runs.Count - 1];\r
\r
                runs[runs.Count - 1] =\r
                    (last.character, last.length + rightRuns[0]);\r
\r
                index = 1;\r
                nextChar ^= 1;\r
            }\r
\r
            while (runs.Count < 3 &&\r
                   index < 3 &&\r
                   rightRuns[index] > 0)\r
            {\r
                runs.Add((nextChar, rightRuns[index]));\r
                nextChar ^= 1;\r
                index++;\r
            }\r
        }\r
\r
        int[] result = new int[3];\r
\r
        for (int i = 0; i < runs.Count && i < 3; i++)\r
        {\r
            result[i] = runs[i].length;\r
        }\r
\r
        int firstCharacter =\r
            runs.Count > 0 ? runs[0].character : leftChar;\r
\r
        return (firstCharacter, result);\r
    }\r
\r
    // Merge two segment tree nodes\r
    private Node Merge(Node leftNode, Node rightNode)\r
    {\r
        Node result = new Node();\r
\r
        result.Len = leftNode.Len + rightNode.Len;\r
        result.Ones = leftNode.Ones + rightNode.Ones;\r
\r
        var (startChar, startRuns) =\r
            CombineFront(\r
                leftNode.SChar,\r
                leftNode.S,\r
                leftNode.Len,\r
                rightNode.SChar,\r
                rightNode.S);\r
\r
        result.SChar = startChar;\r
        result.S = startRuns;\r
\r
        var (endChar, endRuns) =\r
            CombineFront(\r
                rightNode.EChar,\r
                rightNode.E,\r
                rightNode.Len,\r
                leftNode.EChar,\r
                leftNode.E);\r
\r
        result.EChar = endChar;\r
        result.E = endRuns;\r
\r
        int bestGain = Math.Max(leftNode.Best, rightNode.Best);\r
\r
        int leftFirst = leftNode.E[0];\r
        int leftSecond = leftNode.E[1];\r
        int leftThird = leftNode.E[2];\r
\r
        int rightFirst = rightNode.S[0];\r
        int rightSecond = rightNode.S[1];\r
        int rightThird = rightNode.S[2];\r
\r
        if (leftNode.EChar != rightNode.SChar)\r
        {\r
            if (leftNode.EChar == 1 && leftSecond > 0)\r
            {\r
                bestGain = Math.Max(bestGain, leftSecond + rightFirst);\r
            }\r
\r
            if (rightNode.SChar == 1 && rightSecond > 0)\r
            {\r
                bestGain = Math.Max(bestGain, leftFirst + rightSecond);\r
            }\r
        }\r
        else\r
        {\r
            int merged = leftFirst + rightFirst;\r
\r
            if (leftNode.EChar == 1)\r
            {\r
                if (leftSecond > 0 && rightSecond > 0)\r
                {\r
                    bestGain =\r
                        Math.Max(bestGain, leftSecond + rightSecond);\r
                }\r
            }\r
            else\r
            {\r
                if (leftSecond > 0 && leftThird > 0)\r
                {\r
                    bestGain =\r
                        Math.Max(bestGain, leftThird + merged);\r
                }\r
\r
                if (rightSecond > 0 && rightThird > 0)\r
                {\r
                    bestGain =\r
                        Math.Max(bestGain, merged + rightThird);\r
                }\r
            }\r
        }\r
\r
        result.Best = bestGain;\r
\r
        return result;\r
    }\r
\r
    // Query the segment tree\r
    private Node Query(\r
        int index,\r
        int left,\r
        int right,\r
        int queryLeft,\r
        int queryRight)\r
    {\r
        if (queryLeft <= left && right <= queryRight)\r
        {\r
            return tree[index];\r
        }\r
\r
        int mid = (left + right) / 2;\r
\r
        if (queryRight <= mid)\r
        {\r
            return Query(index * 2, left, mid, queryLeft, queryRight);\r
        }\r
\r
        if (queryLeft > mid)\r
        {\r
            return Query(index * 2 + 1, mid + 1, right, queryLeft, queryRight);\r
        }\r
\r
        Node leftNode =\r
            Query(index * 2, left, mid, queryLeft, queryRight);\r
\r
        Node rightNode =\r
            Query(index * 2 + 1, mid + 1, right, queryLeft, queryRight);\r
\r
        return Merge(leftNode, rightNode);\r
    }\r
}`,lastModified:"2026-07-25T05:33:45.050Z",dateLabel:"22 July 2026",dateISO:"2026-07-22",leetcodeNumber:3501},{id:"Daily Problems/21-7-26(3499).cs",number:3499,title:"Problem 3499",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Count the total number of active ('1') sections.\r
// 2. Treat the string as augmented with '1' at both ends.\r
// 3. Split the string into consecutive blocks of '0's and '1's.\r
// 4. For every '1' block surrounded by two '0' blocks, calculate the gain obtained by\r
//    merging the neighboring zero blocks.\r
// 5. Add the maximum gain to the original count of active sections.\r
//\r
// Flow:\r
// Count Total Ones\r
//        ↓\r
// Augment String\r
//        ↓\r
// Build Consecutive Segments\r
//        ↓\r
// Find Maximum Gain\r
//        ↓\r
// Return Total Ones + Gain\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int MaxActiveSectionsAfterTrade(string s)\r
    {\r
        int totalOnes = 0;\r
\r
        foreach (char ch in s)\r
        {\r
            if (ch == '1')\r
                totalOnes++;\r
        }\r
\r
        string t = "1" + s + "1";\r
\r
        List<char> segmentType = new List<char>();\r
        List<int> segmentLength = new List<int>();\r
\r
        int index = 0;\r
\r
        // Split into consecutive segments\r
        while (index < t.Length)\r
        {\r
            char current = t[index];\r
            int length = 0;\r
\r
            while (index < t.Length && t[index] == current)\r
            {\r
                length++;\r
                index++;\r
            }\r
\r
            segmentType.Add(current);\r
            segmentLength.Add(length);\r
        }\r
\r
        int maxGain = 0;\r
\r
        // Find the best surrounded '1' segment\r
        for (int i = 1; i + 1 < segmentType.Count; i++)\r
        {\r
            if (segmentType[i] == '1' &&\r
                segmentType[i - 1] == '0' &&\r
                segmentType[i + 1] == '0')\r
            {\r
                maxGain = Math.Max(maxGain,\r
                    segmentLength[i - 1] + segmentLength[i + 1]);\r
            }\r
        }\r
\r
        return totalOnes + maxGain;\r
    }\r
}`,lastModified:"2026-07-25T05:34:44.758Z",dateLabel:"21 July 2026",dateISO:"2026-07-21",leetcodeNumber:3499},{id:"Daily Problems/20-7-26(1260).cs",number:1260,title:"Problem 1260",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Treat the 2D grid as a single 1D array.\r
// 2. For each element, calculate its new position after shifting by k.\r
// 3. Convert the new 1D position back to 2D indices.\r
// 4. Place the element in its new position.\r
// 5. Return the shifted grid.\r
//\r
// Flow:\r
// Traverse Grid\r
//      ↓\r
// Convert 2D Index → 1D Index\r
//      ↓\r
// Shift by k\r
//      ↓\r
// Convert 1D Index → 2D Index\r
//      ↓\r
// Place Element\r
//      ↓\r
// Return Result\r
//\r
// Time Complexity: O(m × n)\r
// Space Complexity: O(m × n)\r
\r
public class Solution\r
{\r
    public IList<IList<int>> ShiftGrid(int[][] grid, int k)\r
    {\r
        int rows = grid.Length;\r
        int cols = grid[0].Length;\r
        int total = rows * cols;\r
\r
        k %= total;\r
\r
        int[][] shiftedGrid = new int[rows][];\r
\r
        // Initialize the result grid\r
        for (int i = 0; i < rows; i++)\r
        {\r
            shiftedGrid[i] = new int[cols];\r
        }\r
\r
        // Place each element in its new position\r
        for (int row = 0; row < rows; row++)\r
        {\r
            for (int col = 0; col < cols; col++)\r
            {\r
                int currentIndex = row * cols + col;\r
                int newIndex = (currentIndex + k) % total;\r
\r
                int newRow = newIndex / cols;\r
                int newCol = newIndex % cols;\r
\r
                shiftedGrid[newRow][newCol] = grid[row][col];\r
            }\r
        }\r
\r
        IList<IList<int>> answer = new List<IList<int>>();\r
\r
        foreach (int[] row in shiftedGrid)\r
        {\r
            answer.Add(row.ToList());\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-20T10:19:11.998Z",dateLabel:"20 July 2026",dateISO:"2026-07-20",leetcodeNumber:1260},{id:"Daily Problems/17-7-26(3312).cs",number:3312,title:"Problem 3312",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Count the frequency of each number in the array.\r
// 2. For every possible GCD value, count how many numbers are divisible by it using a sieve-like traversal.\r
// 3. Use the Inclusion-Exclusion Principle to calculate the number of pairs having exactly each GCD.\r
// 4. Build a prefix sum array to represent the cumulative count of GCD pairs.\r
// 5. For each query, perform Binary Search on the prefix sum array to find the required GCD value.\r
//\r
// Flow:\r
// Count Frequency\r
//       ↓\r
// Count Divisible Numbers\r
//       ↓\r
// Inclusion-Exclusion\r
//       ↓\r
// Exact GCD Pair Count\r
//       ↓\r
// Prefix Sum\r
//       ↓\r
// Binary Search\r
//       ↓\r
// Return Answers\r
//\r
// Time Complexity: O(M log M + Q log M)\r
// Space Complexity: O(M)\r
//\r
// Where:\r
// M = Maximum value in nums\r
// Q = Number of queries\r
\r
public class Solution\r
{\r
    public int[] GcdValues(int[] nums, long[] queries)\r
    {\r
        int maxValue = 0;\r
\r
        // Find the maximum value in the array\r
        foreach (int num in nums)\r
        {\r
            if (num > maxValue)\r
                maxValue = num;\r
        }\r
\r
        // Store the frequency of each number\r
        long[] frequency = new long[maxValue + 1];\r
        foreach (int num in nums)\r
        {\r
            frequency[num]++;\r
        }\r
\r
        // Count how many numbers are divisible by each possible GCD\r
        long[] divisibleCount = new long[maxValue + 1];\r
\r
        for (int gcd = 1; gcd <= maxValue; gcd++)\r
        {\r
            long count = 0;\r
\r
            for (int multiple = gcd; multiple <= maxValue; multiple += gcd)\r
            {\r
                count += frequency[multiple];\r
            }\r
\r
            divisibleCount[gcd] = count;\r
        }\r
\r
        // Calculate the number of pairs having exactly each GCD\r
        long[] exactGcdPairs = new long[maxValue + 1];\r
\r
        for (int gcd = maxValue; gcd >= 1; gcd--)\r
        {\r
            long count = divisibleCount[gcd];\r
\r
            // Total pairs divisible by the current GCD\r
            long pairCount = count * (count - 1) / 2;\r
\r
            // Remove pairs already counted for multiples of the current GCD\r
            for (int multiple = gcd * 2; multiple <= maxValue; multiple += gcd)\r
            {\r
                pairCount -= exactGcdPairs[multiple];\r
            }\r
\r
            exactGcdPairs[gcd] = pairCount;\r
        }\r
\r
        // Build the prefix sum array\r
        long[] prefixPairs = new long[maxValue + 1];\r
\r
        for (int gcd = 1; gcd <= maxValue; gcd++)\r
        {\r
            prefixPairs[gcd] = prefixPairs[gcd - 1] + exactGcdPairs[gcd];\r
        }\r
\r
        int[] answer = new int[queries.Length];\r
\r
        // Process each query using Binary Search\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            long query = queries[i];\r
\r
            int left = 1;\r
            int right = maxValue;\r
\r
            while (left < right)\r
            {\r
                int mid = left + (right - left) / 2;\r
\r
                if (prefixPairs[mid] > query)\r
                {\r
                    right = mid;\r
                }\r
                else\r
                {\r
                    left = mid + 1;\r
                }\r
            }\r
\r
            answer[i] = left;\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-17T11:29:06.081Z",dateLabel:"17 July 2026",dateISO:"2026-07-17",leetcodeNumber:3312},{id:"Daily Problems/16-7-26(3867).cs",number:3867,title:"Problem 3867",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the maximum value seen so far while traversing the array.\r
// 2. Compute gcd(nums[i], currentMaximum) for every index and store it.\r
// 3. Sort the generated GCD array.\r
// 4. Pair the smallest and largest elements, compute their GCD, and add it to the answer.\r
//\r
// Flow:\r
// Traverse Array\r
//      ↓\r
// Build Prefix GCD Array\r
//      ↓\r
// Sort Prefix GCD Array\r
//      ↓\r
// Pair Smallest & Largest\r
//      ↓\r
// Compute GCD of Each Pair\r
//      ↓\r
// Sum All GCDs\r
//\r
// Time Complexity: O(n log n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public long SumOfGcdPairs(int[] nums)\r
    {\r
        int n = nums.Length;\r
        int[] prefixGcd = new int[n];\r
\r
        int currentMax = 0;\r
\r
        // Build the prefix GCD array\r
        for (int i = 0; i < n; i++)\r
        {\r
            currentMax = Math.Max(currentMax, nums[i]);\r
            prefixGcd[i] = GCD(nums[i], currentMax);\r
        }\r
\r
        // Sort the prefix GCD array\r
        Array.Sort(prefixGcd);\r
\r
        long answer = 0;\r
        int left = 0;\r
        int right = n - 1;\r
\r
        // Pair the smallest and largest elements\r
        while (left < right)\r
        {\r
            answer += GCD(prefixGcd[left], prefixGcd[right]);\r
            left++;\r
            right--;\r
        }\r
\r
        return answer;\r
    }\r
\r
    // Euclidean Algorithm to calculate GCD\r
    private int GCD(int a, int b)\r
    {\r
        while (b != 0)\r
        {\r
            int temp = a % b;\r
            a = b;\r
            b = temp;\r
        }\r
        return a;\r
    }\r
}`,lastModified:"2026-07-17T11:29:13.419Z",dateLabel:"16 July 2026",dateISO:"2026-07-16",leetcodeNumber:3867},{id:"Daily Problems/15-7-26(3658).cs",number:3658,title:"Problem 3658",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. The sum of the first n odd numbers is n².\r
// 2. The sum of the first n even numbers is n × (n + 1).\r
// 3. GCD(n², n(n + 1)) = n because consecutive numbers are always coprime.\r
//\r
// Flow:\r
// Calculate Mathematical Observation\r
//          ↓\r
// GCD(n², n(n + 1))\r
//          ↓\r
// Simplifies to n\r
//          ↓\r
// Return n\r
//\r
// Time Complexity: O(1)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int GcdOfOddEvenSums(int n)\r
    {\r
        // Return the GCD using the mathematical observation\r
        return n;\r
    }\r
}`,lastModified:"2026-07-15T15:07:59.606Z",dateLabel:"15 July 2026",dateISO:"2026-07-15",leetcodeNumber:3658},{id:"Daily Problems/14-7-26(3336).cs",number:3336,title:"Problem 3336",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-14T10:34:55.044Z",dateLabel:"14 July 2026",dateISO:"2026-07-14",leetcodeNumber:3336},{id:"Daily Problems/13-7-26(1291).cs",number:1291,title:"Problem 1291",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-13T15:11:09.585Z",dateLabel:"13 July 2026",dateISO:"2026-07-13",leetcodeNumber:1291},{id:"Daily Problems/12-7-26(1331).cs",number:1331,title:"Problem 1331",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
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
`,lastModified:"2026-07-14T14:07:52.960Z",dateLabel:"11 July 2026",dateISO:"2026-07-11",leetcodeNumber:2685},{id:"Daily Problems/10-7-26(3534).cs",number:3534,title:"Problem 3534",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-10T15:39:16.135Z",dateLabel:"10 July 2026",dateISO:"2026-07-10",leetcodeNumber:3534},{id:"Daily Problems/9-7-26(3536).cs",number:3536,title:"Problem 3536",category:"Daily Problems",difficulty:"Medium",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-09T13:54:39.624Z",dateLabel:"9 July 2026",dateISO:"2026-07-09",leetcodeNumber:3536},{id:"Daily Problems/8-7-26(3756).cs",number:3756,title:"Problem 3756",category:"Daily Problems",difficulty:"Hard",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-08T15:08:17.270Z",dateLabel:"8 July 2026",dateISO:"2026-07-08",leetcodeNumber:3756},{id:"Daily Problems/7-7-26(3754).cs",number:3754,title:"Problem 3754",category:"Daily Problems",difficulty:"Easy",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-01T15:19:31.981Z",dateLabel:"1 July 2026",dateISO:"2026-07-01",leetcodeNumber:2812},{id:"Easy/9PallindromeNumber.cs",number:9,title:"Pallindrome Number",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Negative numbers and numbers ending with 0 (except 0 itself) cannot be palindromes.\r
// 2. Reverse only the second half of the digits instead of the entire number.\r
// 3. Stop when the reversed half becomes greater than or equal to the remaining half.\r
// 4. For even-length numbers, both halves should be equal.\r
// 5. For odd-length numbers, ignore the middle digit by dividing the reversed half by 10.\r
//\r
// Flow:\r
// Check Invalid Cases\r
//         ↓\r
// Reverse Half of the Number\r
//         ↓\r
// Reversed Half >= Remaining Half ?\r
//         ↓\r
// Compare Both Halves\r
//         ↓\r
// Return True / False\r
//\r
// Time Complexity: O(log n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public bool IsPalindrome(int x)\r
    {\r
        if (x < 0 || (x % 10 == 0 && x != 0))\r
        {\r
            return false;\r
        }\r
\r
        int reversedHalf = 0;\r
\r
        while (x > reversedHalf)\r
        {\r
            reversedHalf = reversedHalf * 10 + x % 10;\r
            x /= 10;\r
        }\r
\r
        return x == reversedHalf || x == reversedHalf / 10;\r
    }\r
}`,lastModified:"2026-07-30T06:29:29.978Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Easy/118PascalTriangle.cs",number:118,title:"Pascal Triangle",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-02T09:29:49.253Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Easy/125ValidPallindrome.cs",number:125,title:"Valid Pallindrome",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Use two pointers, one starting from the beginning and the other from the end.\r
// 2. Skip all non-alphanumeric characters.\r
// 3. Compare the remaining characters after converting them to lowercase.\r
// 4. If any pair of characters does not match, return false.\r
// 5. If all valid characters match, return true.\r
//\r
// Flow:\r
// Initialize Two Pointers\r
//          ↓\r
// Skip Non-Alphanumeric Characters\r
//          ↓\r
// Compare Lowercase Characters\r
//          ↓\r
// Characters Different?\r
//     ↓ Yes        ↓ No\r
// Return False   Move Both Pointers\r
//                      ↓\r
//             Continue Until Pointers Meet\r
//                      ↓\r
//                 Return True\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public bool IsPalindrome(string s)\r
    {\r
        int left = 0;\r
        int right = s.Length - 1;\r
\r
        while (left < right)\r
        {\r
            // Skip non-alphanumeric characters from the left\r
            while (left < right && !char.IsLetterOrDigit(s[left]))\r
            {\r
                left++;\r
            }\r
\r
            // Skip non-alphanumeric characters from the right\r
            while (left < right && !char.IsLetterOrDigit(s[right]))\r
            {\r
                right--;\r
            }\r
\r
            // Compare characters ignoring case\r
            if (char.ToLower(s[left]) != char.ToLower(s[right]))\r
            {\r
                return false;\r
            }\r
\r
            left++;\r
            right--;\r
        }\r
\r
        return true;\r
    }\r
}`,lastModified:"2026-07-25T14:39:48.454Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Easy/383RansomNote.cs",number:383,title:"Ransom Note",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach: By HASHMAP\r
// 1. Count the frequency of each character in the magazine using a HashMap.\r
// 2. Traverse the ransom note one character at a time.\r
// 3. If a character is not present in the HashMap, return false.\r
// 4. Decrease the frequency of the matched character.\r
// 5. If the frequency becomes negative, return false.\r
// 6. If all characters are successfully matched, return true.\r
//\r
// Flow:\r
// Create HashMap\r
//        ↓\r
// Count Characters in Magazine\r
//        ↓\r
// Traverse Ransom Note\r
//        ↓\r
// Character Exists?\r
//   ↓ No         ↓ Yes\r
// Return False   Decrease Frequency\r
//                     ↓\r
//             Frequency < 0 ?\r
//               ↓ Yes      ↓ No\r
//          Return False   Continue\r
//                     ↓\r
//            All Characters Checked\r
//                     ↓\r
//                Return True\r
//\r
// Time Complexity: O(n + m)\r
// Space Complexity: O(k)\r
//\r
// Where:\r
// n = Length of ransomNote\r
// m = Length of magazine\r
// k = Number of distinct characters (at most 26 for this problem)\r
\r
public class Solution\r
{\r
    public bool CanConstruct(string ransomNote, string magazine)\r
    {\r
        Dictionary<char, int> magz = new Dictionary<char, int>();\r
\r
        // Count the frequency of each character in the magazine\r
        foreach (char c in magazine)\r
        {\r
            if (magz.ContainsKey(c))\r
            {\r
                magz[c]++;\r
            }\r
            else\r
            {\r
                magz[c] = 1;\r
            }\r
        }\r
\r
        // Check if the ransom note can be constructed\r
        foreach (char c in ransomNote)\r
        {\r
            if (!magz.ContainsKey(c))\r
            {\r
                return false;\r
            }\r
\r
            magz[c]--;\r
\r
            if (magz[c] < 0)\r
            {\r
                return false;\r
            }\r
        }\r
\r
        return true;\r
    }\r
}`,lastModified:"2026-07-26T09:46:53.795Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Easy/383RansomNoteArray.cs",number:383,title:"Ransom Note Array",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach: ARRAY APPROACH\r
// 1. Create a frequency array of size 26 to store the count of each lowercase letter in the magazine.\r
// 2. Traverse the magazine and increment the count for each character.\r
// 3. Traverse the ransom note and decrement the corresponding character count.\r
// 4. If any character's count becomes negative, the magazine doesn't contain enough occurrences, so return false.\r
// 5. If all characters are successfully matched, return true.\r
//\r
// Flow:\r
// Initialize Frequency Array\r
//            ↓\r
// Count Characters in Magazine\r
//            ↓\r
// Traverse Ransom Note\r
//            ↓\r
// Decrease Character Frequency\r
//            ↓\r
// Frequency < 0 ?\r
//      ↓ Yes       ↓ No\r
// Return False   Continue\r
//            ↓\r
// All Characters Processed\r
//            ↓\r
// Return True\r
//\r
// Time Complexity: O(n + m)\r
// Space Complexity: O(1)\r
//\r
// Where:\r
// n = Length of ransomNote\r
// m = Length of magazine\r
\r
public class Solution\r
{\r
    public bool CanConstruct(string ransomNote, string magazine)\r
    {\r
        int[] count = new int[26];\r
\r
        // Count the frequency of each character in the magazine\r
        foreach (char c in magazine)\r
        {\r
            count[c - 'a']++;\r
        }\r
\r
        // Check if the ransom note can be constructed\r
        foreach (char c in ransomNote)\r
        {\r
            if (--count[c - 'a'] < 0)\r
            {\r
                return false;\r
            }\r
        }\r
\r
        return true;\r
    }\r
}`,lastModified:"2026-07-27T09:40:00.957Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Easy/392IsSubSequence.cs",number:392,title:"Is Sub Sequence",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Use two pointers, one for string s and one for string t.\r
// 2. Traverse string t from left to right.\r
// 3. Whenever the characters match, move the pointer of s forward.\r
// 4. Continue until the end of either string.\r
// 5. If all characters of s are matched, return true; otherwise, return false.\r
//\r
// Flow:\r
// Initialize Two Pointers\r
//          ↓\r
// Traverse String t\r
//          ↓\r
// Characters Match?\r
//     ↓ Yes        ↓ No\r
// Move s Pointer   Continue\r
//          ↓\r
// Move t Pointer\r
//          ↓\r
// End of Traversal\r
//          ↓\r
// All Characters Matched?\r
//     ↓ Yes        ↓ No\r
// Return True   Return False\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
//\r
// Where:\r
// n = Length of string t\r
\r
public class Solution\r
{\r
    public bool IsSubsequence(string s, string t)\r
    {\r
        int i = 0;\r
        int j = 0;\r
\r
        // Traverse both strings\r
        while (i < s.Length && j < t.Length)\r
        {\r
            // Move the pointer of s when characters match\r
            if (s[i] == t[j])\r
            {\r
                i++;\r
            }\r
\r
            // Always move the pointer of t\r
            j++;\r
        }\r
\r
        // Check if all characters of s were matched\r
        return i == s.Length;\r
    }\r
}`,lastModified:"2026-07-25T16:15:53.150Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Medium/31NextPermutation.cs",number:31,title:"Next Permutation",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-07T11:31:38.103Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Medium/209MinSizeSubarraySum.cs",number:209,title:"Min Size Subarray Sum",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Use a sliding window with two pointers: left and right.\r
// 2. Expand the window by moving right and adding nums[right] to sum.\r
// 3. When sum >= target, the current window is valid.\r
// 4. Update the minimum window length.\r
// 5. Shrink the window from the left while sum >= target\r
//    to find the smallest possible valid window.\r
// 6. Return 0 if no valid subarray exists.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MinSubArrayLen(int target, int[] nums)\r
    {\r
        int left = 0;\r
        int sum = 0;\r
        int minWindow = int.MaxValue;\r
\r
        for (int right = 0; right < nums.Length; right++)\r
        {\r
            sum += nums[right];\r
\r
            // Shrink the window while the sum is valid\r
            while (sum >= target)\r
            {\r
                minWindow = Math.Min(\r
                    minWindow,\r
                    right - left + 1\r
                );\r
\r
                sum -= nums[left];\r
                left++;\r
            }\r
        }\r
\r
        return minWindow == int.MaxValue ? 0 : minWindow;\r
    }\r
}`,lastModified:"2026-08-13T09:23:04.353Z",dateLabel:"",dateISO:"",leetcodeNumber:null},{id:"Hard/2213__daily",number:2213,title:"Problem 2213",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Build a Segment Tree where each node stores:\r
//    - Left character\r
//    - Right character\r
//    - Prefix length of equal characters\r
//    - Suffix length of equal characters\r
//    - Maximum repeating length\r
//    - Total segment length\r
// 2. Build the tree from the original string.\r
// 3. For every query, update only the changed index.\r
// 4. Merge the affected nodes while moving back to the root.\r
// 5. The root's max value gives the longest repeating substring.\r
//\r
// Time Complexity: O(n + q log n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    private struct Node\r
    {\r
        public char leftChar;\r
        public char rightChar;\r
\r
        public int length;\r
        public int prefix;\r
        public int suffix;\r
        public int maxLength;\r
    }\r
\r
    private Node[] tree;\r
    private char[] str;\r
\r
    public int[] LongestRepeating(\r
        string s,\r
        string queryCharacters,\r
        int[] queryIndices)\r
    {\r
        int n = s.Length;\r
\r
        str = s.ToCharArray();\r
        tree = new Node[4 * n];\r
\r
        // Build Segment Tree\r
        Build(1, 0, n - 1);\r
\r
        int[] answer = new int[queryIndices.Length];\r
\r
        for (int i = 0; i < queryIndices.Length; i++)\r
        {\r
            int index = queryIndices[i];\r
\r
            // Update the character\r
            str[index] = queryCharacters[i];\r
\r
            // Update only the affected path\r
            Update(1, 0, n - 1, index);\r
\r
            // Root contains the global maximum\r
            answer[i] = tree[1].maxLength;\r
        }\r
\r
        return answer;\r
    }\r
\r
    private void Build(int node, int left, int right)\r
    {\r
        if (left == right)\r
        {\r
            tree[node] = new Node\r
            {\r
                leftChar = str[left],\r
                rightChar = str[left],\r
                length = 1,\r
                prefix = 1,\r
                suffix = 1,\r
                maxLength = 1\r
            };\r
\r
            return;\r
        }\r
\r
        int mid = left + (right - left) / 2;\r
\r
        Build(node * 2, left, mid);\r
        Build(node * 2 + 1, mid + 1, right);\r
\r
        tree[node] = Merge(tree[node * 2], tree[node * 2 + 1]);\r
    }\r
\r
    private void Update(int node, int left, int right, int index)\r
    {\r
        if (left == right)\r
        {\r
            tree[node] = new Node\r
            {\r
                leftChar = str[index],\r
                rightChar = str[index],\r
                length = 1,\r
                prefix = 1,\r
                suffix = 1,\r
                maxLength = 1\r
            };\r
\r
            return;\r
        }\r
\r
        int mid = left + (right - left) / 2;\r
\r
        if (index <= mid)\r
        {\r
            Update(node * 2, left, mid, index);\r
        }\r
        else\r
        {\r
            Update(node * 2 + 1, mid + 1, right, index);\r
        }\r
\r
        tree[node] = Merge(tree[node * 2], tree[node * 2 + 1]);\r
    }\r
\r
    private Node Merge(Node left, Node right)\r
    {\r
        Node result = new Node();\r
\r
        result.length = left.length + right.length;\r
        result.leftChar = left.leftChar;\r
        result.rightChar = right.rightChar;\r
\r
        // Prefix\r
        result.prefix = left.prefix;\r
\r
        if (left.prefix == left.length &&\r
            left.rightChar == right.leftChar)\r
        {\r
            result.prefix = left.length + right.prefix;\r
        }\r
\r
        // Suffix\r
        result.suffix = right.suffix;\r
\r
        if (right.suffix == right.length &&\r
            left.rightChar == right.leftChar)\r
        {\r
            result.suffix = right.length + left.suffix;\r
        }\r
\r
        // Maximum repeating segment\r
        result.maxLength = Math.Max(\r
            left.maxLength,\r
            right.maxLength\r
        );\r
\r
        // Join suffix of left + prefix of right\r
        if (left.rightChar == right.leftChar)\r
        {\r
            result.maxLength = Math.Max(\r
                result.maxLength,\r
                left.suffix + right.prefix\r
            );\r
        }\r
\r
        return result;\r
    }\r
}`,lastModified:"2026-08-13T08:38:34.727Z",dateLabel:"13 August 2026",dateISO:"2026-08-13",leetcodeNumber:2213},{id:"Medium/2958__daily",number:2958,title:"Problem 2958",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Use a sliding window to maintain the longest valid subarray.\r
// 2. Store the frequency of each number inside the current window.\r
// 3. Expand the right pointer and increase the frequency.\r
// 4. If any number appears more than 2 times, move the left pointer\r
//    until the window becomes valid again.\r
// 5. Keep track of the maximum valid window length.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int MaxSubarrayLength(int[] nums, int k)\r
    {\r
        Dictionary<int, int> frequency = new Dictionary<int, int>();\r
\r
        int left = 0;\r
        int answer = 0;\r
\r
        for (int right = 0; right < nums.Length; right++)\r
        {\r
            if (!frequency.ContainsKey(nums[right]))\r
            {\r
                frequency[nums[right]] = 0;\r
            }\r
\r
            frequency[nums[right]]++;\r
\r
            // Shrink window if frequency exceeds k\r
            while (frequency[nums[right]] > k)\r
            {\r
                frequency[nums[left]]--;\r
                left++;\r
            }\r
\r
            // Update maximum window length\r
            answer = Math.Max(answer, right - left + 1);\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-08-13T06:18:34.169Z",dateLabel:"12 August 2026",dateISO:"2026-08-12",leetcodeNumber:2958},{id:"Medium/2996__daily",number:2996,title:"Problem 2996",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the longest consecutive prefix starting from nums[0].\r
// 2. Calculate the sum of this prefix.\r
// 3. Check whether the current sum exists anywhere in the array.\r
// 4. If it exists, increment the sum and check again.\r
// 5. Return the first missing integer.\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MissingInteger(int[] nums)\r
    {\r
        int n = nums.Length;\r
        int sum = nums[0];\r
\r
        // Calculate sum of the longest consecutive prefix\r
        for (int i = 1; i < n; i++)\r
        {\r
            if (nums[i] == nums[i - 1] + 1)\r
            {\r
                sum += nums[i];\r
            }\r
            else\r
            {\r
                break;\r
            }\r
        }\r
\r
        // Find the smallest missing integer >= sum\r
        while (true)\r
        {\r
            bool found = false;\r
\r
            for (int i = 0; i < n; i++)\r
            {\r
                if (nums[i] == sum)\r
                {\r
                    found = true;\r
                    break;\r
                }\r
            }\r
\r
            if (!found)\r
            {\r
                return sum;\r
            }\r
\r
            sum++;\r
        }\r
    }\r
}`,lastModified:"2026-08-11T16:13:59.484Z",dateLabel:"11 August 2026",dateISO:"2026-08-11",leetcodeNumber:2996},{id:"Easy/1180__daily",number:1180,title:"Problem 1180",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Calculate suffix sums so we can get the total stones\r
//    remaining from any index in O(1).\r
// 2. Let dp[i, m] represent the maximum stones the current\r
//    player can collect starting from index i with M = m.\r
// 3. If the player can take all remaining piles (2 * m >= remaining),\r
//    take all of them.\r
// 4. Otherwise, try taking x piles where 1 <= x <= 2 * m.\r
// 5. After taking x piles, the opponent's M becomes max(m, x).\r
// 6. Choose the maximum number of stones the current player can get.\r
//\r
// Time Complexity: O(n³)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    public int StoneGameII(int[] piles)\r
    {\r
        int n = piles.Length;\r
        int[,] dp = new int[n, n + 1];\r
        int[] suffixSum = new int[n];\r
\r
        // Calculate suffix sums\r
        suffixSum[n - 1] = piles[n - 1];\r
\r
        for (int i = n - 2; i >= 0; i--)\r
        {\r
            suffixSum[i] = suffixSum[i + 1] + piles[i];\r
        }\r
\r
        // Fill DP table from right to left\r
        for (int i = n - 1; i >= 0; i--)\r
        {\r
            for (int m = 1; m <= n; m++)\r
            {\r
                // Take all remaining piles\r
                if (i + 2 * m >= n)\r
                {\r
                    dp[i, m] = suffixSum[i];\r
                }\r
                else\r
                {\r
                    int maxStones = 0;\r
\r
                    // Try taking 1 to 2 * M piles\r
                    for (int x = 1; x <= 2 * m; x++)\r
                    {\r
                        int currentTake =\r
                            suffixSum[i] - dp[i + x, Math.Max(m, x)];\r
\r
                        maxStones = Math.Max(maxStones, currentTake);\r
                    }\r
\r
                    dp[i, m] = maxStones;\r
                }\r
            }\r
        }\r
\r
        return dp[0, 1];\r
    }\r
}`,lastModified:"2026-08-09T14:11:30.858Z",dateLabel:"9 August 2026",dateISO:"2026-08-09",leetcodeNumber:1180},{id:"Hard/3302__daily",number:3302,title:"Problem 3302",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Build a suffixMatch array by traversing word1 from right to left.\r
// 2. suffixMatch[i] stores the earliest unmatched index in word2\r
//    after processing word1 from index i.\r
// 3. Traverse word1 from left to right greedily.\r
// 4. If characters match, include the current index.\r
// 5. Otherwise, use the one allowed mismatch only if the remaining\r
//    suffix of word2 can still be matched.\r
// 6. Since we always choose the earliest valid index, the resulting\r
//    sequence is lexicographically smallest.\r
//\r
// Time Complexity: O(n + m)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int[] ValidSequence(string word1, string word2)\r
    {\r
        int n = word1.Length;\r
        int m = word2.Length;\r
\r
        // suffixMatch[i] = Earliest unmatched index in word2\r
        // after processing word1 from index i\r
        int[] suffixMatch = new int[n + 1];\r
        suffixMatch[n] = m;\r
\r
        int j = m - 1;\r
\r
        // Build suffix matching information\r
        for (int i = n - 1; i >= 0; i--)\r
        {\r
            if (j >= 0 && word1[i] == word2[j])\r
            {\r
                j--;\r
            }\r
\r
            suffixMatch[i] = j + 1;\r
        }\r
\r
        List<int> answer = new List<int>();\r
\r
        bool mismatchUsed = false;\r
        j = 0;\r
\r
        // Build the lexicographically smallest sequence\r
        for (int i = 0; i < n && j < m; i++)\r
        {\r
            // Characters match\r
            if (word1[i] == word2[j])\r
            {\r
                answer.Add(i);\r
                j++;\r
            }\r
            // Use the one allowed mismatch\r
            else if (!mismatchUsed &&\r
                     suffixMatch[i + 1] <= j + 1)\r
            {\r
                mismatchUsed = true;\r
                answer.Add(i);\r
                j++;\r
            }\r
        }\r
\r
        // Unable to build a valid sequence\r
        if (j != m)\r
        {\r
            return Array.Empty<int>();\r
        }\r
\r
        return answer.ToArray();\r
    }\r
}`,lastModified:"2026-08-08T07:26:46.338Z",dateLabel:"8 August 2026",dateISO:"2026-08-08",leetcodeNumber:3302},{id:"Hard/3345__daily",number:3345,title:"Problem 3345",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Start checking from the given number n.\r
// 2. Compute the product of all digits of the current number.\r
// 3. If the product is divisible by t, return the current number.\r
// 4. Otherwise, increment n and repeat the process.\r
//\r
// Time Complexity: O(k × d)\r
// Space Complexity: O(1)\r
//\r
// Where:\r
// k = Number of integers checked until the answer is found.\r
// d = Number of digits in the current number.\r
\r
public class Solution\r
{\r
    public int SmallestNumber(int n, int t)\r
    {\r
        while (true)\r
        {\r
            int product = 1;\r
            int m = n;\r
\r
            // Calculate the product of digits\r
            while (m > 0)\r
            {\r
                product *= m % 10;\r
                m /= 10;\r
            }\r
\r
            // Check divisibility\r
            if (product % t == 0)\r
            {\r
                return n;\r
            }\r
\r
            n++;\r
        }\r
    }\r
}`,lastModified:"2026-08-06T09:53:21.998Z",dateLabel:"6 August 2026",dateISO:"2026-08-06",leetcodeNumber:3345},{id:"Hard/3310__daily",number:3310,title:"Problem 3310",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Build two graphs:\r
//    - Directed graph for method invocations.\r
//    - Undirected graph for connectivity.\r
// 2. Run DFS from method k to mark all suspicious methods.\r
// 3. Start DFS from every non-suspicious method in the\r
//    undirected graph.\r
// 4. If any suspicious method is reachable from a\r
//    non-suspicious method, it cannot be removed.\r
// 5. Return all remaining non-suspicious methods.\r
//    Otherwise, return all methods.\r
//\r
// Time Complexity: O(n + m)\r
// Space Complexity: O(n + m)\r
\r
public class Solution\r
{\r
    private bool[] suspicious;\r
    private bool[] visited;\r
\r
    private List<int>[] directed;\r
    private List<int>[] undirected;\r
\r
    public IList<int> RemainingMethods(int n, int k, int[][] invocations)\r
    {\r
        suspicious = new bool[n];\r
        visited = new bool[n];\r
\r
        directed = new List<int>[n];\r
        undirected = new List<int>[n];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            directed[i] = new List<int>();\r
            undirected[i] = new List<int>();\r
        }\r
\r
        // Build graphs\r
        foreach (int[] edge in invocations)\r
        {\r
            int from = edge[0];\r
            int to = edge[1];\r
\r
            directed[from].Add(to);\r
\r
            undirected[from].Add(to);\r
            undirected[to].Add(from);\r
        }\r
\r
        // Mark suspicious methods\r
        MarkSuspicious(k);\r
\r
        // Check whether suspicious methods\r
        // are reachable from outside\r
        for (int i = 0; i < n; i++)\r
        {\r
            if (!suspicious[i] && !visited[i])\r
            {\r
                RestoreMethods(i);\r
            }\r
        }\r
\r
        List<int> answer = new List<int>();\r
\r
        // Return remaining methods\r
        for (int i = 0; i < n; i++)\r
        {\r
            if (!suspicious[i])\r
            {\r
                answer.Add(i);\r
            }\r
        }\r
\r
        return answer;\r
    }\r
\r
    // DFS to mark suspicious methods\r
    private void MarkSuspicious(int node)\r
    {\r
        suspicious[node] = true;\r
\r
        foreach (int next in directed[node])\r
        {\r
            if (!suspicious[next])\r
            {\r
                MarkSuspicious(next);\r
            }\r
        }\r
    }\r
\r
    // DFS from non-suspicious methods\r
    private void RestoreMethods(int node)\r
    {\r
        visited[node] = true;\r
        suspicious[node] = false;\r
\r
        foreach (int next in undirected[node])\r
        {\r
            if (!visited[next])\r
            {\r
                RestoreMethods(next);\r
            }\r
        }\r
    }\r
}`,lastModified:"2026-08-05T16:54:20.799Z",dateLabel:"5 August 2026",dateISO:"2026-08-05",leetcodeNumber:3310},{id:"Medium/3731__daily",number:3731,title:"Problem 3731",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the minimum and maximum elements in the array.\r
// 2. Store all elements in a HashSet for O(1) lookup.\r
// 3. Traverse every number between min and max.\r
// 4. If a number is not present in the HashSet,\r
//    add it to the answer list.\r
// 5. Return the sorted list of missing numbers.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public IList<int> FindMissingElements(int[] nums)\r
    {\r
        int min = int.MaxValue;\r
        int max = int.MinValue;\r
\r
        // Store all numbers and find min/max\r
        HashSet<int> seen = new HashSet<int>();\r
\r
        foreach (int num in nums)\r
        {\r
            min = Math.Min(min, num);\r
            max = Math.Max(max, num);\r
            seen.Add(num);\r
        }\r
\r
        List<int> answer = new List<int>();\r
\r
        // Find all missing numbers in the range\r
        for (int num = min + 1; num < max; num++)\r
        {\r
            if (!seen.Contains(num))\r
            {\r
                answer.Add(num);\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-08-05T12:00:38.175Z",dateLabel:"4 August 2026",dateISO:"2026-08-04",leetcodeNumber:3731},{id:"Medium/1506__daily",number:1506,title:"Problem 1506",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Let dp[i] represent the maximum score difference\r
//    (Current Player - Opponent) starting from index i.\r
// 2. From each position, try taking 1, 2, or 3 stones.\r
// 3. For each choice, calculate:\r
//      currentSum - dp[next]\r
// 4. Store the maximum score difference in dp[i].\r
// 5. If dp[0] > 0 -> Alice wins.\r
//    If dp[0] < 0 -> Bob wins.\r
//    Otherwise -> Tie.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public string StoneGameIII(int[] stoneValue)\r
    {\r
        int n = stoneValue.Length;\r
\r
        // dp[i] = Maximum score difference from index i\r
        int[] dp = new int[n + 1];\r
\r
        // Build DP from right to left\r
        for (int i = n - 1; i >= 0; i--)\r
        {\r
            dp[i] = int.MinValue;\r
            int currentSum = 0;\r
\r
            // Try taking 1, 2, or 3 stones\r
            for (int k = 0; k < 3 && i + k < n; k++)\r
            {\r
                currentSum += stoneValue[i + k];\r
\r
                // Choose the move that gives maximum score difference\r
                dp[i] = Math.Max(dp[i], currentSum - dp[i + k + 1]);\r
            }\r
        }\r
\r
        if (dp[0] > 0)\r
            return "Alice";\r
\r
        if (dp[0] < 0)\r
            return "Bob";\r
\r
        return "Tie";\r
    }\r
}`,lastModified:"2026-08-03T12:02:58.834Z",dateLabel:"3 August 2026",dateISO:"2026-08-03",leetcodeNumber:1506},{id:"Medium/877__daily",number:877,title:"Problem 877",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Let dp[i][j] represent the maximum score difference\r
//    (Current Player - Opponent) for piles from i to j.\r
// 2. If the current player picks the left pile,\r
//    the score difference becomes:\r
//      piles[i] - dp[i + 1][j]\r
// 3. If the current player picks the right pile,\r
//    the score difference becomes:\r
//      piles[j] - dp[i][j - 1]\r
// 4. Store the better of the two choices in dp[i][j].\r
// 5. If the final score difference is positive,\r
//    Alice can win.\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    public bool StoneGame(int[] piles)\r
    {\r
        int n = piles.Length;\r
\r
        // dp[i][j] = Maximum score difference for piles i to j\r
        int[,] dp = new int[n, n];\r
\r
        // Base case: Only one pile left\r
        for (int i = 0; i < n; i++)\r
        {\r
            dp[i, i] = piles[i];\r
        }\r
\r
        // Fill the DP table\r
        for (int length = 2; length <= n; length++)\r
        {\r
            for (int i = 0; i + length - 1 < n; i++)\r
            {\r
                int j = i + length - 1;\r
\r
                // Pick the left pile\r
                int pickLeft = piles[i] - dp[i + 1, j];\r
\r
                // Pick the right pile\r
                int pickRight = piles[j] - dp[i, j - 1];\r
\r
                // Choose the better option\r
                dp[i, j] = Math.Max(pickLeft, pickRight);\r
            }\r
        }\r
\r
        return dp[0, n - 1] > 0;\r
    }\r
}`,lastModified:"2026-08-03T12:07:05.435Z",dateLabel:"2 August 2026",dateISO:"2026-08-02",leetcodeNumber:877},{id:"Medium/486__daily",number:486,title:"Problem 486",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Let dp[i][j] represent the maximum score difference\r
//    (Current Player - Opponent) for numbers from i to j.\r
// 2. If the current player picks the left number,\r
//    the score difference becomes:\r
//      nums[i] - dp[i + 1][j]\r
// 3. If the current player picks the right number,\r
//    the score difference becomes:\r
//      nums[j] - dp[i][j - 1]\r
// 4. Store the better of the two choices in dp[i][j].\r
// 5. If the final score difference is non-negative,\r
//    Player 1 can win or tie.\r
//\r
// Time Complexity: O(n²)\r
// Space Complexity: O(n²)\r
\r
public class Solution\r
{\r
    public bool PredictTheWinner(int[] nums)\r
    {\r
        int n = nums.Length;\r
\r
        // dp[i][j] = Maximum score difference for nums i to j\r
        int[,] dp = new int[n, n];\r
\r
        // Base case: Only one number left\r
        for (int i = 0; i < n; i++)\r
        {\r
            dp[i, i] = nums[i];\r
        }\r
\r
        // Fill the DP table\r
        for (int length = 2; length <= n; length++)\r
        {\r
            for (int i = 0; i + length - 1 < n; i++)\r
            {\r
                int j = i + length - 1;\r
\r
                // Pick the left number\r
                int pickLeft = nums[i] - dp[i + 1, j];\r
\r
                // Pick the right number\r
                int pickRight = nums[j] - dp[i, j - 1];\r
\r
                // Choose the better option\r
                dp[i, j] = Math.Max(pickLeft, pickRight);\r
            }\r
        }\r
\r
        return dp[0, n - 1] >= 0;\r
    }\r
}`,lastModified:"2026-08-03T12:07:52.819Z",dateLabel:"1 August 2026",dateISO:"2026-08-01",leetcodeNumber:486},{id:"Medium/3016__daily",number:3016,title:"Problem 3016",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Count the frequency of each character.\r
// 2. Sort the frequencies in ascending order.\r
// 3. Traverse the array from the end (largest frequencies first).\r
// 4. Every group of 8 characters shares the same push count.\r
// 5. Add (frequency × push count) to the answer.\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MinimumPushes(string word)\r
    {\r
        int[] frequency = new int[26];\r
\r
        // Count frequency of each character\r
        foreach (char c in word)\r
        {\r
            frequency[c - 'a']++;\r
        }\r
\r
        // Sort in ascending order\r
        Array.Sort(frequency);\r
\r
        int answer = 0;\r
        int pushCount = 1;\r
        int assigned = 0;\r
\r
        // Traverse from largest frequency to smallest\r
        for (int i = 25; i >= 0; i--)\r
        {\r
            if (frequency[i] == 0)\r
                break;\r
\r
            answer += frequency[i] * pushCount;\r
            assigned++;\r
\r
            // After assigning 8 characters,\r
            // increase the number of pushes required\r
            if (assigned == 8)\r
            {\r
                pushCount++;\r
                assigned = 0;\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-31T11:56:52.418Z",dateLabel:"31 July 2026",dateISO:"2026-07-31",leetcodeNumber:3016},{id:"Medium/3014__daily",number:3014,title:"Problem 3014",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. The keyboard can assign at most 8 characters to each push count.\r
// 2. The first 8 characters require 1 push each.\r
// 3. The next 8 characters require 2 pushes each.\r
// 4. The following 8 characters require 3 pushes each.\r
// 5. Any remaining characters require 4 pushes each.\r
// 6. Compute the answer directly using the length of the word.\r
//\r
// Flow:\r
// Get Word Length\r
//        ↓\r
// Length ≤ 8 ?\r
//   ↓ Yes      ↓ No\r
// Return n     Length ≤ 16 ?\r
//               ↓ Yes      ↓ No\r
//          Return 2n-8    Length ≤ 24 ?\r
//                          ↓ Yes      ↓ No\r
//                     Return 3n-24   Return 4n-48\r
//\r
// Time Complexity: O(1)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MinimumPushes(string word)\r
    {\r
        int n = word.Length;\r
\r
        if (n <= 8)\r
            return n;\r
\r
        if (n <= 16)\r
            return 2 * n - 8;\r
\r
        if (n <= 24)\r
            return 3 * n - 24;\r
\r
        return 4 * n - 48;\r
    }\r
}`,lastModified:"2026-07-30T05:46:03.992Z",dateLabel:"30 July 2026",dateISO:"2026-07-30",leetcodeNumber:3014},{id:"Medium/3518__daily",number:3518,title:"Problem 3518",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Since the given string is already a palindrome, only the left half needs to be rearranged.\r
// 2. Count the frequency of each character in the left half.\r
// 3. Construct the k-th lexicographically smallest left half greedily.\r
// 4. For every position, try placing each character from 'a' to 'z'.\r
// 5. Count how many palindromic arrangements are possible after fixing the current character.\r
// 6. If the number of arrangements is less than k, skip them and move to the next character.\r
// 7. Otherwise, keep the character, continue building the left half, then mirror it to obtain the final palindrome.\r
//\r
// Flow:\r
// Count Left Half Frequencies\r
//            ↓\r
// Build k-th Left Half Greedily\r
//            ↓\r
// Try Characters ('a' → 'z')\r
//            ↓\r
// Count Remaining Arrangements\r
//            ↓\r
// Enough Arrangements?\r
//      ↓ Yes           ↓ No\r
// Keep Character   Skip & Update k\r
//            ↓\r
// Append Middle Character (if any)\r
//            ↓\r
// Mirror Left Half\r
//            ↓\r
// Return Result\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public string SmallestPalindrome(string s, long k)\r
    {\r
        int partition = s.Length / 2;\r
        int[] bucket = new int[26];\r
\r
        // Count the characters in the left half\r
        for (int i = 0; i < partition; i++)\r
        {\r
            bucket[s[i] - 'a']++;\r
        }\r
\r
        // Calculate nCr with early stopping\r
        long Combination(long n, long r)\r
        {\r
            long result = 1;\r
            r = Math.Min(r, n - r);\r
\r
            for (long i = 1; i <= r; i++)\r
            {\r
                result = result * (n - i + 1) / i;\r
\r
                if (result > k)\r
                {\r
                    return k + 1;\r
                }\r
            }\r
\r
            return result;\r
        }\r
\r
        // Count the number of valid permutations\r
        long CountPermutations(int remaining)\r
        {\r
            long ways = 1;\r
\r
            for (int i = 0; i < 26; i++)\r
            {\r
                if (bucket[i] == 0)\r
                {\r
                    continue;\r
                }\r
\r
                ways *= Combination(remaining, bucket[i]);\r
\r
                if (ways > k)\r
                {\r
                    break;\r
                }\r
\r
                remaining -= bucket[i];\r
            }\r
\r
            return ways;\r
        }\r
\r
        StringBuilder left = new StringBuilder();\r
        long currentRank = 1;\r
\r
        // Construct the k-th lexicographical left half\r
        for (int pos = 0; pos < partition; pos++)\r
        {\r
            for (int ch = 0; ch < 26; ch++)\r
            {\r
                if (bucket[ch] == 0)\r
                {\r
                    continue;\r
                }\r
\r
                bucket[ch]--;\r
\r
                long ways = CountPermutations(partition - pos - 1);\r
\r
                if (currentRank + ways > k)\r
                {\r
                    left.Append((char)(ch + 'a'));\r
                    break;\r
                }\r
\r
                bucket[ch]++;\r
                currentRank += ways;\r
            }\r
        }\r
\r
        // k is larger than the total number of palindromes\r
        if (left.Length < partition)\r
        {\r
            return "";\r
        }\r
\r
        // Append the middle character for odd-length strings\r
        if ((s.Length & 1) == 1)\r
        {\r
            left.Append(s[partition]);\r
        }\r
\r
        // Mirror the left half\r
        for (int i = partition - 1; i >= 0; i--)\r
        {\r
            left.Append(left[i]);\r
        }\r
\r
        return left.ToString();\r
    }\r
}`,lastModified:"2026-07-29T16:57:20.332Z",dateLabel:"29 July 2026",dateISO:"2026-07-29",leetcodeNumber:3518},{id:"Medium/3517__daily",number:3517,title:"Problem 3517",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Since the given string is already a palindrome, only the left half determines the entire palindrome.\r
// 2. Count the frequency of each character in the left half of the string.\r
// 3. Traverse the characters from 'a' to 'z' and place them in lexicographical order at both ends of the result.\r
// 4. If the string length is odd, keep the original middle character unchanged.\r
// 5. Return the constructed lexicographically smallest palindrome.\r
//\r
// Flow:\r
// Count Characters in Left Half\r
//            ↓\r
// Initialize Result Array\r
//            ↓\r
// Traverse Characters ('a' to 'z')\r
//            ↓\r
// Place Character at Left & Right Ends\r
//            ↓\r
// String Length is Odd?\r
//      ↓ Yes          ↓ No\r
// Place Middle      Skip\r
//            ↓\r
// Return Result\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public string SmallestPalindrome(string s)\r
    {\r
        int n = s.Length;\r
        int[] bucket = new int[26];\r
\r
        // Count the characters in the left half\r
        for (int i = 0; i < n / 2; i++)\r
        {\r
            bucket[s[i] - 'a']++;\r
        }\r
\r
        char[] result = new char[n];\r
        int left = 0;\r
        int right = n - 1;\r
\r
        // Construct the smallest palindrome\r
        for (int i = 0; i < 26; i++)\r
        {\r
            while (bucket[i] > 0)\r
            {\r
                char current = (char)('a' + i);\r
\r
                result[left++] = current;\r
                result[right--] = current;\r
\r
                bucket[i]--;\r
            }\r
        }\r
\r
        // Place the middle character for odd-length strings\r
        if ((n & 1) == 1)\r
        {\r
            result[left] = s[n / 2];\r
        }\r
\r
        return new string(result);\r
    }\r
}`,lastModified:"2026-07-28T15:25:23.458Z",dateLabel:"28 July 2026",dateISO:"2026-07-28",leetcodeNumber:3517},{id:"Easy/1464__daily",number:1464,title:"Problem 1464",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Traverse the array once while keeping track of the largest and second largest elements.\r
// 2. Update the largest value when a bigger element is found, and shift the previous largest to second largest.\r
// 3. Otherwise, update the second largest if the current element is greater than it.\r
// 4. After the traversal, compute the product of (largest - 1) and (secondLargest - 1).\r
//\r
// Flow:\r
// Initialize Largest & Second Largest\r
//              ↓\r
// Traverse Array\r
//              ↓\r
// Update Largest Two Elements\r
//              ↓\r
// Calculate\r
// (Largest - 1) × (Second Largest - 1)\r
//              ↓\r
// Return Result\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MaxProduct(int[] nums)\r
    {\r
        int highest = 0;\r
        int second = 0;\r
\r
        // Find the two largest elements\r
        foreach (int num in nums)\r
        {\r
            if (num > highest)\r
            {\r
                second = highest;\r
                highest = num;\r
            }\r
            else if (num > second)\r
            {\r
                second = num;\r
            }\r
        }\r
\r
        // Return the maximum product\r
        return (highest - 1) * (second - 1);\r
    }\r
}`,lastModified:"2026-07-27T09:31:03.310Z",dateLabel:"27 July 2026",dateISO:"2026-07-27",leetcodeNumber:1464},{id:"Easy/628__daily",number:628,title:"Problem 628",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. Traverse the array once while maintaining the three largest and two smallest numbers.\r
// 2. Update the three largest values whenever a larger element is found.\r
// 3. Simultaneously update the two smallest values for handling negative numbers.\r
// 4. The maximum product is either:\r
//    - Product of the three largest numbers.\r
//    - Product of the largest number and the two smallest numbers.\r
// 5. Return the greater of the two products.\r
//\r
// Flow:\r
// Initialize Largest & Smallest Values\r
//              ↓\r
// Traverse Array\r
//              ↓\r
// Update Top 3 Largest Numbers\r
//              ↓\r
// Update Bottom 2 Smallest Numbers\r
//              ↓\r
// Calculate:\r
// (Highest × Second × Third)\r
//          and\r
// (Highest × Lowest × SecondLowest)\r
//              ↓\r
// Return Maximum Product\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int MaximumProduct(int[] nums)\r
    {\r
        int highest = -1001;\r
        int second = -1001;\r
        int third = -1001;\r
\r
        int lowest = 1001;\r
        int secondLowest = 1001;\r
\r
        foreach (int num in nums)\r
        {\r
            // Update the three largest numbers\r
            if (num > highest)\r
            {\r
                third = second;\r
                second = highest;\r
                highest = num;\r
            }\r
            else if (num > second)\r
            {\r
                third = second;\r
                second = num;\r
            }\r
            else if (num > third)\r
            {\r
                third = num;\r
            }\r
\r
            // Update the two smallest numbers\r
            if (num < lowest)\r
            {\r
                secondLowest = lowest;\r
                lowest = num;\r
            }\r
            else if (num < secondLowest)\r
            {\r
                secondLowest = num;\r
            }\r
        }\r
\r
        // Return the maximum possible product\r
        return Math.Max(highest * second * third,\r
                        highest * lowest * secondLowest);\r
    }\r
}`,lastModified:"2026-07-26T06:53:53.280Z",dateLabel:"26 July 2026",dateISO:"2026-07-26",leetcodeNumber:628},{id:"Medium/3536__daily",number:3536,title:"Problem 3536",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Traverse all digits of the given number.\r
// 2. Keep track of the largest and second largest digits.\r
// 3. Update both values whenever a larger digit is found.\r
// 4. Return the product of the two largest digits.\r
//\r
// Flow:\r
// Extract Digits\r
//       ↓\r
// Track Largest & Second Largest\r
//       ↓\r
// Multiply Both Digits\r
//       ↓\r
// Return Answer\r
//\r
// Time Complexity: O(d)\r
// Space Complexity: O(1)\r
//\r
// Where:\r
// d = Number of digits in n\r
\r
public class Solution\r
{\r
    public int MaxProduct(int n)\r
    {\r
        int largest = 0;\r
        int secondLargest = 0;\r
\r
        // Find the largest and second largest digits\r
        while (n > 0)\r
        {\r
            int digit = n % 10;\r
\r
            if (digit > largest)\r
            {\r
                secondLargest = largest;\r
                largest = digit;\r
            }\r
            else if (digit > secondLargest)\r
            {\r
                secondLargest = digit;\r
            }\r
\r
            n /= 10;\r
        }\r
\r
        // Return the product of the two largest digits\r
        return largest * secondLargest;\r
    }\r
}`,lastModified:"2026-07-25T05:28:39.098Z",dateLabel:"25 July 2026",dateISO:"2026-07-25",leetcodeNumber:3536},{id:"Medium/3514__daily",number:3514,title:"Problem 3514",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the maximum value in the array and determine the XOR range.\r
// 2. Compute all possible XOR values of pairs (i <= j) and store them.\r
// 3. XOR each pair XOR value with every element in the array to generate all possible triplet XOR values.\r
// 4. Count the number of unique triplet XOR values.\r
//\r
// Flow:\r
// Find Maximum Value\r
//         ↓\r
// Determine XOR Range\r
//         ↓\r
// Generate Pair XOR Values\r
//         ↓\r
// Generate Triplet XOR Values\r
//         ↓\r
// Count Unique XOR Values\r
//         ↓\r
// Return Answer\r
//\r
// Time Complexity: O(n² + U × n)\r
// Space Complexity: O(U)\r
//\r
// Where:\r
// n = nums.Length\r
// U = Smallest power of 2 greater than max(nums)\r
\r
public class Solution\r
{\r
    public int UniqueXorTriplets(int[] nums)\r
    {\r
        int n = nums.Length;\r
\r
        int maximumValue = 0;\r
\r
        // Find the maximum value in the array\r
        foreach (int value in nums)\r
        {\r
            maximumValue = Math.Max(maximumValue, value);\r
        }\r
\r
        // Find the smallest power of two greater than the maximum value\r
        int xorLimit = 1;\r
        while (xorLimit <= maximumValue)\r
        {\r
            xorLimit <<= 1;\r
        }\r
\r
        // Store all possible XOR values of pairs\r
        bool[] pairXor = new bool[xorLimit];\r
\r
        for (int i = 0; i < n; i++)\r
        {\r
            for (int j = i; j < n; j++)\r
            {\r
                pairXor[nums[i] ^ nums[j]] = true;\r
            }\r
        }\r
\r
        // Store all possible XOR values of triplets\r
        bool[] tripletXor = new bool[xorLimit];\r
\r
        for (int xorValue = 0; xorValue < xorLimit; xorValue++)\r
        {\r
            if (!pairXor[xorValue])\r
            {\r
                continue;\r
            }\r
\r
            foreach (int value in nums)\r
            {\r
                tripletXor[xorValue ^ value] = true;\r
            }\r
        }\r
\r
        // Count unique triplet XOR values\r
        int answer = 0;\r
\r
        foreach (bool exists in tripletXor)\r
        {\r
            if (exists)\r
            {\r
                answer++;\r
            }\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-24T07:14:25.629Z",dateLabel:"24 July 2026",dateISO:"2026-07-24",leetcodeNumber:3514},{id:"Medium/3513__daily",number:3513,title:"Problem 3513",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. If the array contains fewer than 3 elements, every element itself is a unique XOR value.\r
// 2. For n ≥ 3, all XOR values from 0 to the next power of two minus one can be formed.\r
// 3. Find the smallest power of two greater than n.\r
// 4. Return that power of two.\r
//\r
// Flow:\r
// Check Array Size\r
//        ↓\r
// n < 3 ?\r
//   ↓ Yes        ↓ No\r
// Return n   Find Next Power of Two\r
//                  ↓\r
//             Return Answer\r
//\r
// Time Complexity: O(log n)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int UniqueXorTriplets(int[] nums)\r
    {\r
        int n = nums.Length;\r
\r
        // If fewer than 3 elements exist, return the array size\r
        if (n < 3)\r
        {\r
            return n;\r
        }\r
\r
        int nextPowerOfTwo = 1;\r
\r
        // Find the smallest power of two greater than n\r
        while (nextPowerOfTwo <= n)\r
        {\r
            nextPowerOfTwo <<= 1;\r
        }\r
\r
        return nextPowerOfTwo;\r
    }\r
}`,lastModified:"2026-07-23T14:05:58.949Z",dateLabel:"23 July 2026",dateISO:"2026-07-23",leetcodeNumber:3513},{id:"Medium/3501__daily",number:3501,title:"Problem 3501",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Build a Segment Tree where each node stores information about the substring:\r
//    - Length of the segment.\r
//    - Number of active ('1') sections.\r
//    - First and last few run lengths.\r
//    - Maximum gain obtainable by one valid trade.\r
// 2. Merge two child nodes by combining their run information and updating the best possible trade.\r
// 3. For each query, retrieve the corresponding segment tree node.\r
// 4. Compute the maximum active sections after the optimal trade inside the queried range.\r
// 5. Add the active sections outside the range to obtain the final answer.\r
//\r
// Flow:\r
// Build Segment Tree\r
//          ↓\r
// Store Run Information\r
//          ↓\r
// Merge Child Nodes\r
//          ↓\r
// Process Each Query\r
//          ↓\r
// Compute Best Trade\r
//          ↓\r
// Return Answers\r
//\r
// Time Complexity:\r
// Build: O(n)\r
// Each Query: O(log n)\r
// Total: O(n + q log n)\r
//\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    struct Node\r
    {\r
        public int Len;\r
        public int Ones;\r
\r
        // First up to 3 run lengths from the beginning\r
        public int SChar;\r
        public int[] S;\r
\r
        // First up to 3 run lengths from the end\r
        public int EChar;\r
        public int[] E;\r
\r
        // Maximum gain obtainable by one trade\r
        public int Best;\r
    }\r
\r
    private Node[] tree;\r
    private string s;\r
    private int n;\r
\r
    public IList<int> MaxActiveSectionsAfterTrade(string s, int[][] queries)\r
    {\r
        this.s = s;\r
        n = s.Length;\r
\r
        tree = new Node[4 * n];\r
\r
        // Build the segment tree\r
        Build(1, 0, n - 1);\r
\r
        int totalOnes = 0;\r
\r
        foreach (char ch in s)\r
        {\r
            if (ch == '1')\r
            {\r
                totalOnes++;\r
            }\r
        }\r
\r
        List<int> answer = new List<int>(queries.Length);\r
\r
        foreach (int[] query in queries)\r
        {\r
            int left = query[0];\r
            int right = query[1];\r
\r
            Node current = Query(1, 0, n - 1, left, right);\r
\r
            int onesInRange = current.Ones;\r
\r
            int bestInside =\r
                Math.Min(right - left + 1, onesInRange + current.Best);\r
\r
            answer.Add((totalOnes - onesInRange) + bestInside);\r
        }\r
\r
        return answer;\r
    }\r
\r
    // Build the segment tree\r
    private void Build(int index, int left, int right)\r
    {\r
        if (left == right)\r
        {\r
            int value = s[left] == '1' ? 1 : 0;\r
\r
            tree[index] = new Node\r
            {\r
                Len = 1,\r
                Ones = value,\r
                SChar = value,\r
                S = new int[] { 1, 0, 0 },\r
                EChar = value,\r
                E = new int[] { 1, 0, 0 },\r
                Best = 0\r
            };\r
\r
            return;\r
        }\r
\r
        int mid = (left + right) / 2;\r
\r
        Build(index * 2, left, mid);\r
        Build(index * 2 + 1, mid + 1, right);\r
\r
        tree[index] = Merge(tree[index * 2], tree[index * 2 + 1]);\r
    }\r
\r
    // Combine the first three runs of two adjacent segments\r
    private (int, int[]) CombineFront(\r
        int leftChar,\r
        int[] leftRuns,\r
        int leftLength,\r
        int rightChar,\r
        int[] rightRuns)\r
    {\r
        List<(int character, int length)> runs =\r
            new List<(int, int)>();\r
\r
        int consumed = 0;\r
        int currentChar = leftChar;\r
\r
        for (int i = 0; i < 3; i++)\r
        {\r
            if (leftRuns[i] == 0)\r
            {\r
                break;\r
            }\r
\r
            runs.Add((currentChar, leftRuns[i]));\r
            consumed += leftRuns[i];\r
            currentChar ^= 1;\r
        }\r
\r
        if (consumed == leftLength)\r
        {\r
            int nextChar = rightChar;\r
            int index = 0;\r
\r
            if (runs.Count > 0 &&\r
                runs[runs.Count - 1].character == rightChar)\r
            {\r
                var last = runs[runs.Count - 1];\r
\r
                runs[runs.Count - 1] =\r
                    (last.character, last.length + rightRuns[0]);\r
\r
                index = 1;\r
                nextChar ^= 1;\r
            }\r
\r
            while (runs.Count < 3 &&\r
                   index < 3 &&\r
                   rightRuns[index] > 0)\r
            {\r
                runs.Add((nextChar, rightRuns[index]));\r
                nextChar ^= 1;\r
                index++;\r
            }\r
        }\r
\r
        int[] result = new int[3];\r
\r
        for (int i = 0; i < runs.Count && i < 3; i++)\r
        {\r
            result[i] = runs[i].length;\r
        }\r
\r
        int firstCharacter =\r
            runs.Count > 0 ? runs[0].character : leftChar;\r
\r
        return (firstCharacter, result);\r
    }\r
\r
    // Merge two segment tree nodes\r
    private Node Merge(Node leftNode, Node rightNode)\r
    {\r
        Node result = new Node();\r
\r
        result.Len = leftNode.Len + rightNode.Len;\r
        result.Ones = leftNode.Ones + rightNode.Ones;\r
\r
        var (startChar, startRuns) =\r
            CombineFront(\r
                leftNode.SChar,\r
                leftNode.S,\r
                leftNode.Len,\r
                rightNode.SChar,\r
                rightNode.S);\r
\r
        result.SChar = startChar;\r
        result.S = startRuns;\r
\r
        var (endChar, endRuns) =\r
            CombineFront(\r
                rightNode.EChar,\r
                rightNode.E,\r
                rightNode.Len,\r
                leftNode.EChar,\r
                leftNode.E);\r
\r
        result.EChar = endChar;\r
        result.E = endRuns;\r
\r
        int bestGain = Math.Max(leftNode.Best, rightNode.Best);\r
\r
        int leftFirst = leftNode.E[0];\r
        int leftSecond = leftNode.E[1];\r
        int leftThird = leftNode.E[2];\r
\r
        int rightFirst = rightNode.S[0];\r
        int rightSecond = rightNode.S[1];\r
        int rightThird = rightNode.S[2];\r
\r
        if (leftNode.EChar != rightNode.SChar)\r
        {\r
            if (leftNode.EChar == 1 && leftSecond > 0)\r
            {\r
                bestGain = Math.Max(bestGain, leftSecond + rightFirst);\r
            }\r
\r
            if (rightNode.SChar == 1 && rightSecond > 0)\r
            {\r
                bestGain = Math.Max(bestGain, leftFirst + rightSecond);\r
            }\r
        }\r
        else\r
        {\r
            int merged = leftFirst + rightFirst;\r
\r
            if (leftNode.EChar == 1)\r
            {\r
                if (leftSecond > 0 && rightSecond > 0)\r
                {\r
                    bestGain =\r
                        Math.Max(bestGain, leftSecond + rightSecond);\r
                }\r
            }\r
            else\r
            {\r
                if (leftSecond > 0 && leftThird > 0)\r
                {\r
                    bestGain =\r
                        Math.Max(bestGain, leftThird + merged);\r
                }\r
\r
                if (rightSecond > 0 && rightThird > 0)\r
                {\r
                    bestGain =\r
                        Math.Max(bestGain, merged + rightThird);\r
                }\r
            }\r
        }\r
\r
        result.Best = bestGain;\r
\r
        return result;\r
    }\r
\r
    // Query the segment tree\r
    private Node Query(\r
        int index,\r
        int left,\r
        int right,\r
        int queryLeft,\r
        int queryRight)\r
    {\r
        if (queryLeft <= left && right <= queryRight)\r
        {\r
            return tree[index];\r
        }\r
\r
        int mid = (left + right) / 2;\r
\r
        if (queryRight <= mid)\r
        {\r
            return Query(index * 2, left, mid, queryLeft, queryRight);\r
        }\r
\r
        if (queryLeft > mid)\r
        {\r
            return Query(index * 2 + 1, mid + 1, right, queryLeft, queryRight);\r
        }\r
\r
        Node leftNode =\r
            Query(index * 2, left, mid, queryLeft, queryRight);\r
\r
        Node rightNode =\r
            Query(index * 2 + 1, mid + 1, right, queryLeft, queryRight);\r
\r
        return Merge(leftNode, rightNode);\r
    }\r
}`,lastModified:"2026-07-25T05:33:45.050Z",dateLabel:"22 July 2026",dateISO:"2026-07-22",leetcodeNumber:3501},{id:"Medium/3499__daily",number:3499,title:"Problem 3499",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Count the total number of active ('1') sections.\r
// 2. Treat the string as augmented with '1' at both ends.\r
// 3. Split the string into consecutive blocks of '0's and '1's.\r
// 4. For every '1' block surrounded by two '0' blocks, calculate the gain obtained by\r
//    merging the neighboring zero blocks.\r
// 5. Add the maximum gain to the original count of active sections.\r
//\r
// Flow:\r
// Count Total Ones\r
//        ↓\r
// Augment String\r
//        ↓\r
// Build Consecutive Segments\r
//        ↓\r
// Find Maximum Gain\r
//        ↓\r
// Return Total Ones + Gain\r
//\r
// Time Complexity: O(n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public int MaxActiveSectionsAfterTrade(string s)\r
    {\r
        int totalOnes = 0;\r
\r
        foreach (char ch in s)\r
        {\r
            if (ch == '1')\r
                totalOnes++;\r
        }\r
\r
        string t = "1" + s + "1";\r
\r
        List<char> segmentType = new List<char>();\r
        List<int> segmentLength = new List<int>();\r
\r
        int index = 0;\r
\r
        // Split into consecutive segments\r
        while (index < t.Length)\r
        {\r
            char current = t[index];\r
            int length = 0;\r
\r
            while (index < t.Length && t[index] == current)\r
            {\r
                length++;\r
                index++;\r
            }\r
\r
            segmentType.Add(current);\r
            segmentLength.Add(length);\r
        }\r
\r
        int maxGain = 0;\r
\r
        // Find the best surrounded '1' segment\r
        for (int i = 1; i + 1 < segmentType.Count; i++)\r
        {\r
            if (segmentType[i] == '1' &&\r
                segmentType[i - 1] == '0' &&\r
                segmentType[i + 1] == '0')\r
            {\r
                maxGain = Math.Max(maxGain,\r
                    segmentLength[i - 1] + segmentLength[i + 1]);\r
            }\r
        }\r
\r
        return totalOnes + maxGain;\r
    }\r
}`,lastModified:"2026-07-25T05:34:44.758Z",dateLabel:"21 July 2026",dateISO:"2026-07-21",leetcodeNumber:3499},{id:"Medium/1260__daily",number:1260,title:"Problem 1260",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Treat the 2D grid as a single 1D array.\r
// 2. For each element, calculate its new position after shifting by k.\r
// 3. Convert the new 1D position back to 2D indices.\r
// 4. Place the element in its new position.\r
// 5. Return the shifted grid.\r
//\r
// Flow:\r
// Traverse Grid\r
//      ↓\r
// Convert 2D Index → 1D Index\r
//      ↓\r
// Shift by k\r
//      ↓\r
// Convert 1D Index → 2D Index\r
//      ↓\r
// Place Element\r
//      ↓\r
// Return Result\r
//\r
// Time Complexity: O(m × n)\r
// Space Complexity: O(m × n)\r
\r
public class Solution\r
{\r
    public IList<IList<int>> ShiftGrid(int[][] grid, int k)\r
    {\r
        int rows = grid.Length;\r
        int cols = grid[0].Length;\r
        int total = rows * cols;\r
\r
        k %= total;\r
\r
        int[][] shiftedGrid = new int[rows][];\r
\r
        // Initialize the result grid\r
        for (int i = 0; i < rows; i++)\r
        {\r
            shiftedGrid[i] = new int[cols];\r
        }\r
\r
        // Place each element in its new position\r
        for (int row = 0; row < rows; row++)\r
        {\r
            for (int col = 0; col < cols; col++)\r
            {\r
                int currentIndex = row * cols + col;\r
                int newIndex = (currentIndex + k) % total;\r
\r
                int newRow = newIndex / cols;\r
                int newCol = newIndex % cols;\r
\r
                shiftedGrid[newRow][newCol] = grid[row][col];\r
            }\r
        }\r
\r
        IList<IList<int>> answer = new List<IList<int>>();\r
\r
        foreach (int[] row in shiftedGrid)\r
        {\r
            answer.Add(row.ToList());\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-20T10:19:11.998Z",dateLabel:"20 July 2026",dateISO:"2026-07-20",leetcodeNumber:1260},{id:"Hard/3312__daily",number:3312,title:"Problem 3312",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
// 1. Count the frequency of each number in the array.\r
// 2. For every possible GCD value, count how many numbers are divisible by it using a sieve-like traversal.\r
// 3. Use the Inclusion-Exclusion Principle to calculate the number of pairs having exactly each GCD.\r
// 4. Build a prefix sum array to represent the cumulative count of GCD pairs.\r
// 5. For each query, perform Binary Search on the prefix sum array to find the required GCD value.\r
//\r
// Flow:\r
// Count Frequency\r
//       ↓\r
// Count Divisible Numbers\r
//       ↓\r
// Inclusion-Exclusion\r
//       ↓\r
// Exact GCD Pair Count\r
//       ↓\r
// Prefix Sum\r
//       ↓\r
// Binary Search\r
//       ↓\r
// Return Answers\r
//\r
// Time Complexity: O(M log M + Q log M)\r
// Space Complexity: O(M)\r
//\r
// Where:\r
// M = Maximum value in nums\r
// Q = Number of queries\r
\r
public class Solution\r
{\r
    public int[] GcdValues(int[] nums, long[] queries)\r
    {\r
        int maxValue = 0;\r
\r
        // Find the maximum value in the array\r
        foreach (int num in nums)\r
        {\r
            if (num > maxValue)\r
                maxValue = num;\r
        }\r
\r
        // Store the frequency of each number\r
        long[] frequency = new long[maxValue + 1];\r
        foreach (int num in nums)\r
        {\r
            frequency[num]++;\r
        }\r
\r
        // Count how many numbers are divisible by each possible GCD\r
        long[] divisibleCount = new long[maxValue + 1];\r
\r
        for (int gcd = 1; gcd <= maxValue; gcd++)\r
        {\r
            long count = 0;\r
\r
            for (int multiple = gcd; multiple <= maxValue; multiple += gcd)\r
            {\r
                count += frequency[multiple];\r
            }\r
\r
            divisibleCount[gcd] = count;\r
        }\r
\r
        // Calculate the number of pairs having exactly each GCD\r
        long[] exactGcdPairs = new long[maxValue + 1];\r
\r
        for (int gcd = maxValue; gcd >= 1; gcd--)\r
        {\r
            long count = divisibleCount[gcd];\r
\r
            // Total pairs divisible by the current GCD\r
            long pairCount = count * (count - 1) / 2;\r
\r
            // Remove pairs already counted for multiples of the current GCD\r
            for (int multiple = gcd * 2; multiple <= maxValue; multiple += gcd)\r
            {\r
                pairCount -= exactGcdPairs[multiple];\r
            }\r
\r
            exactGcdPairs[gcd] = pairCount;\r
        }\r
\r
        // Build the prefix sum array\r
        long[] prefixPairs = new long[maxValue + 1];\r
\r
        for (int gcd = 1; gcd <= maxValue; gcd++)\r
        {\r
            prefixPairs[gcd] = prefixPairs[gcd - 1] + exactGcdPairs[gcd];\r
        }\r
\r
        int[] answer = new int[queries.Length];\r
\r
        // Process each query using Binary Search\r
        for (int i = 0; i < queries.Length; i++)\r
        {\r
            long query = queries[i];\r
\r
            int left = 1;\r
            int right = maxValue;\r
\r
            while (left < right)\r
            {\r
                int mid = left + (right - left) / 2;\r
\r
                if (prefixPairs[mid] > query)\r
                {\r
                    right = mid;\r
                }\r
                else\r
                {\r
                    left = mid + 1;\r
                }\r
            }\r
\r
            answer[i] = left;\r
        }\r
\r
        return answer;\r
    }\r
}`,lastModified:"2026-07-17T11:29:06.081Z",dateLabel:"17 July 2026",dateISO:"2026-07-17",leetcodeNumber:3312},{id:"Medium/3867__daily",number:3867,title:"Problem 3867",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
// 1. Find the maximum value seen so far while traversing the array.\r
// 2. Compute gcd(nums[i], currentMaximum) for every index and store it.\r
// 3. Sort the generated GCD array.\r
// 4. Pair the smallest and largest elements, compute their GCD, and add it to the answer.\r
//\r
// Flow:\r
// Traverse Array\r
//      ↓\r
// Build Prefix GCD Array\r
//      ↓\r
// Sort Prefix GCD Array\r
//      ↓\r
// Pair Smallest & Largest\r
//      ↓\r
// Compute GCD of Each Pair\r
//      ↓\r
// Sum All GCDs\r
//\r
// Time Complexity: O(n log n)\r
// Space Complexity: O(n)\r
\r
public class Solution\r
{\r
    public long SumOfGcdPairs(int[] nums)\r
    {\r
        int n = nums.Length;\r
        int[] prefixGcd = new int[n];\r
\r
        int currentMax = 0;\r
\r
        // Build the prefix GCD array\r
        for (int i = 0; i < n; i++)\r
        {\r
            currentMax = Math.Max(currentMax, nums[i]);\r
            prefixGcd[i] = GCD(nums[i], currentMax);\r
        }\r
\r
        // Sort the prefix GCD array\r
        Array.Sort(prefixGcd);\r
\r
        long answer = 0;\r
        int left = 0;\r
        int right = n - 1;\r
\r
        // Pair the smallest and largest elements\r
        while (left < right)\r
        {\r
            answer += GCD(prefixGcd[left], prefixGcd[right]);\r
            left++;\r
            right--;\r
        }\r
\r
        return answer;\r
    }\r
\r
    // Euclidean Algorithm to calculate GCD\r
    private int GCD(int a, int b)\r
    {\r
        while (b != 0)\r
        {\r
            int temp = a % b;\r
            a = b;\r
            b = temp;\r
        }\r
        return a;\r
    }\r
}`,lastModified:"2026-07-17T11:29:13.419Z",dateLabel:"16 July 2026",dateISO:"2026-07-16",leetcodeNumber:3867},{id:"Easy/3658__daily",number:3658,title:"Problem 3658",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
// 1. The sum of the first n odd numbers is n².\r
// 2. The sum of the first n even numbers is n × (n + 1).\r
// 3. GCD(n², n(n + 1)) = n because consecutive numbers are always coprime.\r
//\r
// Flow:\r
// Calculate Mathematical Observation\r
//          ↓\r
// GCD(n², n(n + 1))\r
//          ↓\r
// Simplifies to n\r
//          ↓\r
// Return n\r
//\r
// Time Complexity: O(1)\r
// Space Complexity: O(1)\r
\r
public class Solution\r
{\r
    public int GcdOfOddEvenSums(int n)\r
    {\r
        // Return the GCD using the mathematical observation\r
        return n;\r
    }\r
}`,lastModified:"2026-07-15T15:07:59.606Z",dateLabel:"15 July 2026",dateISO:"2026-07-15",leetcodeNumber:3658},{id:"Hard/3336__daily",number:3336,title:"Problem 3336",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-14T10:34:55.044Z",dateLabel:"14 July 2026",dateISO:"2026-07-14",leetcodeNumber:3336},{id:"Medium/1291__daily",number:1291,title:"Problem 1291",category:"Medium",difficulty:"Medium",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-13T15:11:09.585Z",dateLabel:"13 July 2026",dateISO:"2026-07-13",leetcodeNumber:1291},{id:"Easy/1331__daily",number:1331,title:"Problem 1331",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
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
`,lastModified:"2026-07-14T14:07:52.960Z",dateLabel:"11 July 2026",dateISO:"2026-07-11",leetcodeNumber:2685},{id:"Hard/3534__daily",number:3534,title:"Problem 3534",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-10T15:39:16.135Z",dateLabel:"10 July 2026",dateISO:"2026-07-10",leetcodeNumber:3534},{id:"Hard/3756__daily",number:3756,title:"Problem 3756",category:"Hard",difficulty:"Hard",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-08T15:08:17.270Z",dateLabel:"8 July 2026",dateISO:"2026-07-08",leetcodeNumber:3756},{id:"Easy/3754__daily",number:3754,title:"Problem 3754",category:"Easy",difficulty:"Easy",readme:"",solution:`// Approach:\r
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
}`,lastModified:"2026-07-01T15:19:31.981Z",dateLabel:"1 July 2026",dateISO:"2026-07-01",leetcodeNumber:2812}];function l(){return r}function u(n){return a.useMemo(()=>r.filter(e=>e.category===n),[n])}function d(){return a.useMemo(()=>({"Daily Problems":r.filter(n=>n.category==="Daily Problems").length,Easy:r.filter(n=>n.category==="Easy").length,Medium:r.filter(n=>n.category==="Medium").length,Hard:r.filter(n=>n.category==="Hard").length}),[])}function c(n,e){return a.useMemo(()=>{const i=n.trim().toLowerCase();return r.filter(t=>e==="All"||(e==="Daily"?t.category==="Daily Problems":t.difficulty===e)?i?t.title.toLowerCase().includes(i)||t.number!==null&&String(t.number).includes(i):!0:!1)},[n,e])}export{u as a,l as b,c,d as u};
