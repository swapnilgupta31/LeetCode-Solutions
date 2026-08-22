// LeetCode: Cinema Seat Allocation
//
// Approach:
// 1. Initially assume every row can accommodate 2 families.
// 2. Store the reserved seats row by row.
// 3. For each reserved row, check three possible groups:
//    - Left group:   seats 2,3,4,5
//    - Right group:  seats 6,7,8,9
//    - Middle group: seats 4,5,6,7
// 4. If both left and right groups are free, the row can still fit 2 families.
// 5. If one outer group is blocked, only 1 family can be placed.
// 6. If both outer groups are blocked, check the middle group.
// 7. Rows without any reserved seats can always fit 2 families.
//
// Time Complexity: O(m log m)
// Space Complexity: O(1)
// where m is the number of reserved seats.

public class Solution
{
    public int MaxNumberOfFamilies(int n, int[][] reservedSeats)
    {
        int ans = 2 * n;

        Array.Sort(reservedSeats, (a, b) =>
            a[0] != b[0]
                ? a[0].CompareTo(b[0])
                : a[1].CompareTo(b[1]));

        int i = 0;

        while (i < reservedSeats.Length)
        {
            int row = reservedSeats[i][0];

            bool left = false;   // Seats 2,3,4,5
            bool right = false;  // Seats 6,7,8,9
            bool middle = false; // Seats 4,5,6,7

            while (i < reservedSeats.Length &&
                   reservedSeats[i][0] == row)
            {
                int seat = reservedSeats[i][1];

                if (seat >= 2 && seat <= 5)
                    left = true;

                if (seat >= 6 && seat <= 9)
                    right = true;

                if (seat >= 4 && seat <= 7)
                    middle = true;

                i++;
            }

            // Both outer groups are free.
            // The row can still accommodate 2 families.
            if (!left && !right)
            {
                continue;
            }

            // Both outer groups are blocked.
            if (left && right)
            {
                if (!middle)
                {
                    // Middle group can accommodate 1 family.
                    ans--;
                }
                else
                {
                    // No group is available.
                    ans -= 2;
                }
            }
            else
            {
                // One outer group is blocked.
                // The other outer group can accommodate 1 family.
                ans--;
            }
        }

        return ans;
    }
}