public class Solution
{
    public IList<string> MaxNumOfSubstrings(string s)
    {
        int n = s.Length;

        int[] first = new int[26];
        int[] last = new int[26];

        for (int i = 0; i < 26; i++)
        {
            first[i] = n;
            last[i] = -1;
        }

        for (int i = 0; i < n; i++)
        {
            int index = s[i] - 'a';

            first[index] = Math.Min(first[index], i);
            last[index] = i;
        }

        List<int[]> intervals = new List<int[]>();

        for (int i = 0; i < n; i++)
        {
            int index = s[i] - 'a';

            if (i != first[index])
            {
                continue;
            }

            int start = i;
            int end = last[index];
            bool valid = true;

            for (int j = start; j <= end; j++)
            {
                int current = s[j] - 'a';

                if (first[current] < start)
                {
                    valid = false;
                    break;
                }

                end = Math.Max(end, last[current]);
            }

            if (valid)
            {
                intervals.Add(new int[] { start, end });
            }
        }

        intervals.Sort((a, b) => a[1].CompareTo(b[1]));

        List<string> answer = new List<string>();
        int previousEnd = -1;

        foreach (int[] interval in intervals)
        {
            int start = interval[0];
            int end = interval[1];

            if (start > previousEnd)
            {
                answer.Add(s.Substring(start, end - start + 1));
                previousEnd = end;
            }
        }

        return answer;
    }
}