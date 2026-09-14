// LeetCode: Image Overlap
//
// Approach:
// 1. Store coordinates of all 1s in both images.
// 2. For every pair of 1s (one from img1 and one from img2),
//    calculate the translation vector (dx, dy).
// 3. Count how frequently each translation occurs.
// 4. The maximum frequency is the maximum possible overlap.
//
// Time Complexity: O(N^4), where N is the image dimension.
// Space Complexity: O(N^2)

public class Solution
{
    public int LargestOverlap(int[][] img1, int[][] img2)
    {
        int n = img1.Length;

        List<(int r, int c)> ones1 = new();
        List<(int r, int c)> ones2 = new();

        // Store coordinates of 1s in img1
        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (img1[r][c] == 1)
                    ones1.Add((r, c));

                if (img2[r][c] == 1)
                    ones2.Add((r, c));
            }
        }

        Dictionary<(int dr, int dc), int> count = new();

        int answer = 0;

        // Try every possible translation
        foreach (var p1 in ones1)
        {
            foreach (var p2 in ones2)
            {
                int dr = p2.r - p1.r;
                int dc = p2.c - p1.c;

                var shift = (dr, dc);

                if (!count.ContainsKey(shift))
                    count[shift] = 0;

                count[shift]++;

                answer = Math.Max(answer, count[shift]);
            }
        }

        return answer;
    }
}