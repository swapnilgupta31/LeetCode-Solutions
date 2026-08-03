// Approach:
// 1. Sort intervals by start in ascending order.
// 2. If two intervals have the same start, sort by end in descending order.
// 3. Traverse the sorted intervals while keeping track of the maximum ending point seen so far.
// 4. If the current interval's end is less than or equal to maxEnd, it is covered.
// 5. Otherwise, count it and update maxEnd.
//
// Flow:
// Sort Intervals
//        ↓
// Start ↑, End ↓
//        ↓
// Traverse Intervals
//        ↓
// Current End <= maxEnd ?
//        ↓
// Yes → Covered (Ignore)
// No  → Count++ & Update maxEnd
//
// Time Complexity: O(n log n)
// Space Complexity: O(1)

public class Solution {
    public int RemoveCoveredIntervals(int[][] intervals) {

        // Sort by start ascending, and end descending if starts are equal
        Array.Sort(intervals, (a, b) =>
        {
            if (a[0] == b[0])
                return b[1].CompareTo(a[1]);

            return a[0].CompareTo(b[0]);
        });

        int count = 1;
        int maxEnd = intervals[0][1];

        // Traverse the sorted intervals
        for (int i = 1; i < intervals.Length; i++)
        {
            // If current interval is not covered
            if (intervals[i][1] > maxEnd)
            {
                count++;
                maxEnd = intervals[i][1];
            }
        }

        return count;
    }
}