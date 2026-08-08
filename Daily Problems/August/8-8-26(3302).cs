// Approach:
// 1. Build a suffixMatch array by traversing word1 from right to left.
// 2. suffixMatch[i] stores the earliest unmatched index in word2
//    after processing word1 from index i.
// 3. Traverse word1 from left to right greedily.
// 4. If characters match, include the current index.
// 5. Otherwise, use the one allowed mismatch only if the remaining
//    suffix of word2 can still be matched.
// 6. Since we always choose the earliest valid index, the resulting
//    sequence is lexicographically smallest.
//
// Time Complexity: O(n + m)
// Space Complexity: O(n)

public class Solution
{
    public int[] ValidSequence(string word1, string word2)
    {
        int n = word1.Length;
        int m = word2.Length;

        // suffixMatch[i] = Earliest unmatched index in word2
        // after processing word1 from index i
        int[] suffixMatch = new int[n + 1];
        suffixMatch[n] = m;

        int j = m - 1;

        // Build suffix matching information
        for (int i = n - 1; i >= 0; i--)
        {
            if (j >= 0 && word1[i] == word2[j])
            {
                j--;
            }

            suffixMatch[i] = j + 1;
        }

        List<int> answer = new List<int>();

        bool mismatchUsed = false;
        j = 0;

        // Build the lexicographically smallest sequence
        for (int i = 0; i < n && j < m; i++)
        {
            // Characters match
            if (word1[i] == word2[j])
            {
                answer.Add(i);
                j++;
            }
            // Use the one allowed mismatch
            else if (!mismatchUsed &&
                     suffixMatch[i + 1] <= j + 1)
            {
                mismatchUsed = true;
                answer.Add(i);
                j++;
            }
        }

        // Unable to build a valid sequence
        if (j != m)
        {
            return Array.Empty<int>();
        }

        return answer.ToArray();
    }
}