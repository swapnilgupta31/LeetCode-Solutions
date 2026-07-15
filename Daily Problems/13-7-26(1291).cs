// Approach:
// 1. Start BFS with single-digit numbers (1 to 9).
// 2. For each number, check if it lies within the given range.
// 3. Generate the next sequential number by appending the next digit.
// 4. Continue until no more valid sequential numbers can be formed.
//
// Flow:
// Initialize Queue (1-9)
//          ↓
// Dequeue Number
//          ↓
// In Range ?
//      ↓         ↓
//    Yes        No
//      ↓
// Add to Answer
//          ↓
// Last Digit < 9 ?
//      ↓         ↓
//    Yes        No
//      ↓
// Generate Next Number
//          ↓
// Enqueue
//
// Time Complexity: O(1)
// Space Complexity: O(1)

public class Solution
{
    public IList<int> SequentialDigits(int low, int high)
    {
        List<int> answer = new List<int>();
        Queue<int> queue = new Queue<int>();

        // Initialize the queue with single-digit numbers
        for (int i = 1; i <= 9; i++)
        {
            queue.Enqueue(i);
        }

        // BFS Traversal
        while (queue.Count > 0)
        {
            int current = queue.Dequeue();

            // Add the number if it lies within the range
            if (current >= low && current <= high)
            {
                answer.Add(current);
            }

            // Get the last digit
            int lastDigit = current % 10;

            // Generate the next sequential number
            if (lastDigit < 9)
            {
                int next = current * 10 + (lastDigit + 1);

                // Only enqueue if it can still produce a valid answer
                if (next <= high)
                {
                    queue.Enqueue(next);
                }
            }
        }

        return answer;
    }
}