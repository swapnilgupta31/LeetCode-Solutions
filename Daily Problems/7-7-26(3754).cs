// Approach:
// 1. Convert the number into a string.
// 2. Ignore all zero digits while forming a new number.
// 3. Simultaneously calculate the sum of all non-zero digits.
// 4. Return the product of the new number and the calculated sum.
//
// Flow:
// Convert Number to String
//          ↓
// Traverse Each Digit
//          ↓
// Ignore Zero?
//      ↓         ↓
//    Yes        No
//     ↓          ↓
//   Skip   Add to New Number & Sum
//          ↓
// Multiply New Number × Sum
//          ↓
// Return Answer
//
// Time Complexity: O(d)
// Space Complexity: O(d)
// (d = Number of digits)

public class Solution {
    public long SumAndMultiply(int n) {

        // Edge case: if the number is 0
        if (n == 0)
            return 0;

        string str = n.ToString();
        string output = "";
        int sum = 0;

        // Build the new number and calculate the sum of non-zero digits
        foreach (char c in str) {
            if (c != '0') {
                output += c;
                sum += c - '0';
            }
        }

        // Return the required product
        return long.Parse(output) * sum;
    }
}