// LeetCode: Nodes Between Critical Points
//
// Approach:
// 1. Traverse the linked list while keeping track of the previous,
//    current, and next nodes.
// 2. A node is a critical point if it is either a local maximum or
//    a local minimum compared with its adjacent nodes.
// 3. Store the position of the first critical point and the previous
//    critical point.
// 4. For every new critical point, calculate the distance from the
//    previous critical point and update the minimum distance.
// 5. If there are fewer than two critical points, return [-1, -1].
// 6. The maximum distance is the difference between the first and
//    last critical point positions.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

public class Solution
{
    public int[] NodesBetweenCriticalPoints(ListNode head)
    {
        int first = -1;
        int previous = -1;
        int minDistance = int.MaxValue;

        ListNode prev = head;
        ListNode curr = head.next;

        int index = 1;

        while (curr != null && curr.next != null)
        {
            // Check if current node is a local maximum or minimum
            if ((curr.val > prev.val && curr.val > curr.next.val) ||
                (curr.val < prev.val && curr.val < curr.next.val))
            {
                if (first == -1)
                {
                    // First critical point
                    first = index;
                }
                else
                {
                    // Distance from previous critical point
                    minDistance = Math.Min(minDistance, index - previous);
                }

                previous = index;
            }

            prev = curr;
            curr = curr.next;
            index++;
        }

        // Fewer than two critical points
        if (first == -1 || first == previous)
        {
            return new int[] { -1, -1 };
        }

        // Maximum distance is between first and last critical points
        int maxDistance = previous - first;

        return new int[] { minDistance, maxDistance };
    }
}