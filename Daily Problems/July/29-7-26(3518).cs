// Approach:
// 1. Since the given string is already a palindrome, only the left half needs to be rearranged.
// 2. Count the frequency of each character in the left half.
// 3. Construct the k-th lexicographically smallest left half greedily.
// 4. For every position, try placing each character from 'a' to 'z'.
// 5. Count how many palindromic arrangements are possible after fixing the current character.
// 6. If the number of arrangements is less than k, skip them and move to the next character.
// 7. Otherwise, keep the character, continue building the left half, then mirror it to obtain the final palindrome.
//
// Flow:
// Count Left Half Frequencies
//            ↓
// Build k-th Left Half Greedily
//            ↓
// Try Characters ('a' → 'z')
//            ↓
// Count Remaining Arrangements
//            ↓
// Enough Arrangements?
//      ↓ Yes           ↓ No
// Keep Character   Skip & Update k
//            ↓
// Append Middle Character (if any)
//            ↓
// Mirror Left Half
//            ↓
// Return Result
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public string SmallestPalindrome(string s, long k)
    {
        int partition = s.Length / 2;
        int[] bucket = new int[26];

        // Count the characters in the left half
        for (int i = 0; i < partition; i++)
        {
            bucket[s[i] - 'a']++;
        }

        // Calculate nCr with early stopping
        long Combination(long n, long r)
        {
            long result = 1;
            r = Math.Min(r, n - r);

            for (long i = 1; i <= r; i++)
            {
                result = result * (n - i + 1) / i;

                if (result > k)
                {
                    return k + 1;
                }
            }

            return result;
        }

        // Count the number of valid permutations
        long CountPermutations(int remaining)
        {
            long ways = 1;

            for (int i = 0; i < 26; i++)
            {
                if (bucket[i] == 0)
                {
                    continue;
                }

                ways *= Combination(remaining, bucket[i]);

                if (ways > k)
                {
                    break;
                }

                remaining -= bucket[i];
            }

            return ways;
        }

        StringBuilder left = new StringBuilder();
        long currentRank = 1;

        // Construct the k-th lexicographical left half
        for (int pos = 0; pos < partition; pos++)
        {
            for (int ch = 0; ch < 26; ch++)
            {
                if (bucket[ch] == 0)
                {
                    continue;
                }

                bucket[ch]--;

                long ways = CountPermutations(partition - pos - 1);

                if (currentRank + ways > k)
                {
                    left.Append((char)(ch + 'a'));
                    break;
                }

                bucket[ch]++;
                currentRank += ways;
            }
        }

        // k is larger than the total number of palindromes
        if (left.Length < partition)
        {
            return "";
        }

        // Append the middle character for odd-length strings
        if ((s.Length & 1) == 1)
        {
            left.Append(s[partition]);
        }

        // Mirror the left half
        for (int i = partition - 1; i >= 0; i--)
        {
            left.Append(left[i]);
        }

        return left.ToString();
    }
}