// Approach:
// 1. Count the total number of active ('1') sections.
// 2. Treat the string as augmented with '1' at both ends.
// 3. Split the string into consecutive blocks of '0's and '1's.
// 4. For every '1' block surrounded by two '0' blocks, calculate the gain obtained by
//    merging the neighboring zero blocks.
// 5. Add the maximum gain to the original count of active sections.
//
// Flow:
// Count Total Ones
//        ↓
// Augment String
//        ↓
// Build Consecutive Segments
//        ↓
// Find Maximum Gain
//        ↓
// Return Total Ones + Gain
//
// Time Complexity: O(n)
// Space Complexity: O(n)

public class Solution
{
    public int MaxActiveSectionsAfterTrade(string s)
    {
        int totalOnes = 0;

        foreach (char ch in s)
        {
            if (ch == '1')
                totalOnes++;
        }

        string t = "1" + s + "1";

        List<char> segmentType = new List<char>();
        List<int> segmentLength = new List<int>();

        int index = 0;

        // Split into consecutive segments
        while (index < t.Length)
        {
            char current = t[index];
            int length = 0;

            while (index < t.Length && t[index] == current)
            {
                length++;
                index++;
            }

            segmentType.Add(current);
            segmentLength.Add(length);
        }

        int maxGain = 0;

        // Find the best surrounded '1' segment
        for (int i = 1; i + 1 < segmentType.Count; i++)
        {
            if (segmentType[i] == '1' &&
                segmentType[i - 1] == '0' &&
                segmentType[i + 1] == '0')
            {
                maxGain = Math.Max(maxGain,
                    segmentLength[i - 1] + segmentLength[i + 1]);
            }
        }

        return totalOnes + maxGain;
    }
}