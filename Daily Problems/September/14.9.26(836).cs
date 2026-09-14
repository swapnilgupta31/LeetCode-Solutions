// LeetCode: Rectangle Overlap
//
// Approach:
// 1. Two rectangles do NOT overlap if one is completely:
//    - Left of the other
//    - Right of the other
//    - Above the other
//    - Below the other
// 2. If none of these conditions is true, the rectangles overlap.
// 3. Touching edges/corners do not count as overlap.
//
// Time Complexity: O(1)
// Space Complexity: O(1)

public class Solution
{
    public bool IsRectangleOverlap(int[] rec1, int[] rec2)
    {
        // rec = [x1, y1, x2, y2]

        // rec1 is completely to the left of rec2
        if (rec1[2] <= rec2[0])
            return false;

        // rec2 is completely to the left of rec1
        if (rec2[2] <= rec1[0])
            return false;

        // rec1 is completely below rec2
        if (rec1[3] <= rec2[1])
            return false;

        // rec2 is completely below rec1
        if (rec2[3] <= rec1[1])
            return false;

        return true;
    }
}