// Approach:
// 1. Build a Segment Tree where each node stores information about the substring:
//    - Length of the segment.
//    - Number of active ('1') sections.
//    - First and last few run lengths.
//    - Maximum gain obtainable by one valid trade.
// 2. Merge two child nodes by combining their run information and updating the best possible trade.
// 3. For each query, retrieve the corresponding segment tree node.
// 4. Compute the maximum active sections after the optimal trade inside the queried range.
// 5. Add the active sections outside the range to obtain the final answer.
//
// Flow:
// Build Segment Tree
//          ↓
// Store Run Information
//          ↓
// Merge Child Nodes
//          ↓
// Process Each Query
//          ↓
// Compute Best Trade
//          ↓
// Return Answers
//
// Time Complexity:
// Build: O(n)
// Each Query: O(log n)
// Total: O(n + q log n)
//
// Space Complexity: O(n)

public class Solution
{
    struct Node
    {
        public int Len;
        public int Ones;

        // First up to 3 run lengths from the beginning
        public int SChar;
        public int[] S;

        // First up to 3 run lengths from the end
        public int EChar;
        public int[] E;

        // Maximum gain obtainable by one trade
        public int Best;
    }

    private Node[] tree;
    private string s;
    private int n;

    public IList<int> MaxActiveSectionsAfterTrade(string s, int[][] queries)
    {
        this.s = s;
        n = s.Length;

        tree = new Node[4 * n];

        // Build the segment tree
        Build(1, 0, n - 1);

        int totalOnes = 0;

        foreach (char ch in s)
        {
            if (ch == '1')
            {
                totalOnes++;
            }
        }

        List<int> answer = new List<int>(queries.Length);

        foreach (int[] query in queries)
        {
            int left = query[0];
            int right = query[1];

            Node current = Query(1, 0, n - 1, left, right);

            int onesInRange = current.Ones;

            int bestInside =
                Math.Min(right - left + 1, onesInRange + current.Best);

            answer.Add((totalOnes - onesInRange) + bestInside);
        }

        return answer;
    }

    // Build the segment tree
    private void Build(int index, int left, int right)
    {
        if (left == right)
        {
            int value = s[left] == '1' ? 1 : 0;

            tree[index] = new Node
            {
                Len = 1,
                Ones = value,
                SChar = value,
                S = new int[] { 1, 0, 0 },
                EChar = value,
                E = new int[] { 1, 0, 0 },
                Best = 0
            };

            return;
        }

        int mid = (left + right) / 2;

        Build(index * 2, left, mid);
        Build(index * 2 + 1, mid + 1, right);

        tree[index] = Merge(tree[index * 2], tree[index * 2 + 1]);
    }

    // Combine the first three runs of two adjacent segments
    private (int, int[]) CombineFront(
        int leftChar,
        int[] leftRuns,
        int leftLength,
        int rightChar,
        int[] rightRuns)
    {
        List<(int character, int length)> runs =
            new List<(int, int)>();

        int consumed = 0;
        int currentChar = leftChar;

        for (int i = 0; i < 3; i++)
        {
            if (leftRuns[i] == 0)
            {
                break;
            }

            runs.Add((currentChar, leftRuns[i]));
            consumed += leftRuns[i];
            currentChar ^= 1;
        }

        if (consumed == leftLength)
        {
            int nextChar = rightChar;
            int index = 0;

            if (runs.Count > 0 &&
                runs[runs.Count - 1].character == rightChar)
            {
                var last = runs[runs.Count - 1];

                runs[runs.Count - 1] =
                    (last.character, last.length + rightRuns[0]);

                index = 1;
                nextChar ^= 1;
            }

            while (runs.Count < 3 &&
                   index < 3 &&
                   rightRuns[index] > 0)
            {
                runs.Add((nextChar, rightRuns[index]));
                nextChar ^= 1;
                index++;
            }
        }

        int[] result = new int[3];

        for (int i = 0; i < runs.Count && i < 3; i++)
        {
            result[i] = runs[i].length;
        }

        int firstCharacter =
            runs.Count > 0 ? runs[0].character : leftChar;

        return (firstCharacter, result);
    }

    // Merge two segment tree nodes
    private Node Merge(Node leftNode, Node rightNode)
    {
        Node result = new Node();

        result.Len = leftNode.Len + rightNode.Len;
        result.Ones = leftNode.Ones + rightNode.Ones;

        var (startChar, startRuns) =
            CombineFront(
                leftNode.SChar,
                leftNode.S,
                leftNode.Len,
                rightNode.SChar,
                rightNode.S);

        result.SChar = startChar;
        result.S = startRuns;

        var (endChar, endRuns) =
            CombineFront(
                rightNode.EChar,
                rightNode.E,
                rightNode.Len,
                leftNode.EChar,
                leftNode.E);

        result.EChar = endChar;
        result.E = endRuns;

        int bestGain = Math.Max(leftNode.Best, rightNode.Best);

        int leftFirst = leftNode.E[0];
        int leftSecond = leftNode.E[1];
        int leftThird = leftNode.E[2];

        int rightFirst = rightNode.S[0];
        int rightSecond = rightNode.S[1];
        int rightThird = rightNode.S[2];

        if (leftNode.EChar != rightNode.SChar)
        {
            if (leftNode.EChar == 1 && leftSecond > 0)
            {
                bestGain = Math.Max(bestGain, leftSecond + rightFirst);
            }

            if (rightNode.SChar == 1 && rightSecond > 0)
            {
                bestGain = Math.Max(bestGain, leftFirst + rightSecond);
            }
        }
        else
        {
            int merged = leftFirst + rightFirst;

            if (leftNode.EChar == 1)
            {
                if (leftSecond > 0 && rightSecond > 0)
                {
                    bestGain =
                        Math.Max(bestGain, leftSecond + rightSecond);
                }
            }
            else
            {
                if (leftSecond > 0 && leftThird > 0)
                {
                    bestGain =
                        Math.Max(bestGain, leftThird + merged);
                }

                if (rightSecond > 0 && rightThird > 0)
                {
                    bestGain =
                        Math.Max(bestGain, merged + rightThird);
                }
            }
        }

        result.Best = bestGain;

        return result;
    }

    // Query the segment tree
    private Node Query(
        int index,
        int left,
        int right,
        int queryLeft,
        int queryRight)
    {
        if (queryLeft <= left && right <= queryRight)
        {
            return tree[index];
        }

        int mid = (left + right) / 2;

        if (queryRight <= mid)
        {
            return Query(index * 2, left, mid, queryLeft, queryRight);
        }

        if (queryLeft > mid)
        {
            return Query(index * 2 + 1, mid + 1, right, queryLeft, queryRight);
        }

        Node leftNode =
            Query(index * 2, left, mid, queryLeft, queryRight);

        Node rightNode =
            Query(index * 2 + 1, mid + 1, right, queryLeft, queryRight);

        return Merge(leftNode, rightNode);
    }
}