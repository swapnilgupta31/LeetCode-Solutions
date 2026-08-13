// Approach:
// 1. Build a Segment Tree where each node stores:
//    - Left character
//    - Right character
//    - Prefix length of equal characters
//    - Suffix length of equal characters
//    - Maximum repeating length
//    - Total segment length
// 2. Build the tree from the original string.
// 3. For every query, update only the changed index.
// 4. Merge the affected nodes while moving back to the root.
// 5. The root's max value gives the longest repeating substring.
//
// Time Complexity: O(n + q log n)
// Space Complexity: O(n)

public class Solution
{
    private struct Node
    {
        public char leftChar;
        public char rightChar;

        public int length;
        public int prefix;
        public int suffix;
        public int maxLength;
    }

    private Node[] tree;
    private char[] str;

    public int[] LongestRepeating(
        string s,
        string queryCharacters,
        int[] queryIndices)
    {
        int n = s.Length;

        str = s.ToCharArray();
        tree = new Node[4 * n];

        // Build Segment Tree
        Build(1, 0, n - 1);

        int[] answer = new int[queryIndices.Length];

        for (int i = 0; i < queryIndices.Length; i++)
        {
            int index = queryIndices[i];

            // Update the character
            str[index] = queryCharacters[i];

            // Update only the affected path
            Update(1, 0, n - 1, index);

            // Root contains the global maximum
            answer[i] = tree[1].maxLength;
        }

        return answer;
    }

    private void Build(int node, int left, int right)
    {
        if (left == right)
        {
            tree[node] = new Node
            {
                leftChar = str[left],
                rightChar = str[left],
                length = 1,
                prefix = 1,
                suffix = 1,
                maxLength = 1
            };

            return;
        }

        int mid = left + (right - left) / 2;

        Build(node * 2, left, mid);
        Build(node * 2 + 1, mid + 1, right);

        tree[node] = Merge(tree[node * 2], tree[node * 2 + 1]);
    }

    private void Update(int node, int left, int right, int index)
    {
        if (left == right)
        {
            tree[node] = new Node
            {
                leftChar = str[index],
                rightChar = str[index],
                length = 1,
                prefix = 1,
                suffix = 1,
                maxLength = 1
            };

            return;
        }

        int mid = left + (right - left) / 2;

        if (index <= mid)
        {
            Update(node * 2, left, mid, index);
        }
        else
        {
            Update(node * 2 + 1, mid + 1, right, index);
        }

        tree[node] = Merge(tree[node * 2], tree[node * 2 + 1]);
    }

    private Node Merge(Node left, Node right)
    {
        Node result = new Node();

        result.length = left.length + right.length;
        result.leftChar = left.leftChar;
        result.rightChar = right.rightChar;

        // Prefix
        result.prefix = left.prefix;

        if (left.prefix == left.length &&
            left.rightChar == right.leftChar)
        {
            result.prefix = left.length + right.prefix;
        }

        // Suffix
        result.suffix = right.suffix;

        if (right.suffix == right.length &&
            left.rightChar == right.leftChar)
        {
            result.suffix = right.length + left.suffix;
        }

        // Maximum repeating segment
        result.maxLength = Math.Max(
            left.maxLength,
            right.maxLength
        );

        // Join suffix of left + prefix of right
        if (left.rightChar == right.leftChar)
        {
            result.maxLength = Math.Max(
                result.maxLength,
                left.suffix + right.prefix
            );
        }

        return result;
    }
}