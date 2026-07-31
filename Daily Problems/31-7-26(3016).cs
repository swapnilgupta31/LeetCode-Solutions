// Approach:
// 1. Count the frequency of each character.
// 2. Sort the frequencies in ascending order.
// 3. Traverse the array from the end (largest frequencies first).
// 4. Every group of 8 characters shares the same push count.
// 5. Add (frequency × push count) to the answer.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int MinimumPushes(string word)
    {
        int[] frequency = new int[26];

        // Count frequency of each character
        foreach (char c in word)
        {
            frequency[c - 'a']++;
        }

        // Sort in ascending order
        Array.Sort(frequency);

        int answer = 0;
        int pushCount = 1;
        int assigned = 0;

        // Traverse from largest frequency to smallest
        for (int i = 25; i >= 0; i--)
        {
            if (frequency[i] == 0)
                break;

            answer += frequency[i] * pushCount;
            assigned++;

            // After assigning 8 characters,
            // increase the number of pushes required
            if (assigned == 8)
            {
                pushCount++;
                assigned = 0;
            }
        }

        return answer;
    }
}