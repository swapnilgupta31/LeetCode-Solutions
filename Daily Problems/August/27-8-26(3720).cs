// LeetCode: Lexicographically Greater Permutation
//
// Approach:
// 1. Store the frequency of every character in s using a frequency array.
// 2. Try to match target from left to right using the available characters.
// 3. If a character cannot be matched, try to place the smallest character
//    greater than target[i] at the current position.
// 4. If no greater character is available at the current position, backtrack
//    to an earlier position and restore the character used there.
// 5. At the backtracked position, place the smallest available character
//    greater than target[j].
// 6. Once a greater character is fixed, append all remaining characters in
//    sorted order to obtain the lexicographically smallest valid permutation.
// 7. If no position can be made greater, return an empty string.
//
// Time Complexity: O(n + 26 * n)
// Space Complexity: O(n + 26)

public class Solution
{
    public string LexGreaterPermutation(string s, string target)
    {
        int n = s.Length;
        int[] freq = new int[26];

        foreach (char c in s)
        {
            freq[c - 'a']++;
        }

        // Try to match target
        int i = 0;

        for (; i < n; i++)
        {
            int x = target[i] - 'a';

            if (freq[x] == 0)
            {
                break;
            }

            freq[x]--;
        }

        // Try to make the current position greater
        if (i < n)
        {
            int x = target[i] - 'a';

            for (int c = x + 1; c < 26; c++)
            {
                if (freq[c] > 0)
                {
                    freq[c]--;

                    return target.Substring(0, i)
                         + (char)('a' + c)
                         + Build(freq);
                }
            }
        }

        // Backtrack to find an earlier position
        for (int j = i - 1; j >= 0; j--)
        {
            // Restore the character used at position j
            freq[target[j] - 'a']++;

            int x = target[j] - 'a';

            // Find the smallest character greater than target[j]
            for (int c = x + 1; c < 26; c++)
            {
                if (freq[c] > 0)
                {
                    freq[c]--;

                    return target.Substring(0, j)
                         + (char)('a' + c)
                         + Build(freq);
                }
            }
        }

        return "";
    }

    private string Build(int[] freq)
    {
        string result = "";

        for (int i = 0; i < 26; i++)
        {
            while (freq[i] > 0)
            {
                result += (char)('a' + i);
                freq[i]--;
            }
        }

        return result;
    }
}