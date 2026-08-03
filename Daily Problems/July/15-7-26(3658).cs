// Approach:
// 1. The sum of the first n odd numbers is n².
// 2. The sum of the first n even numbers is n × (n + 1).
// 3. GCD(n², n(n + 1)) = n because consecutive numbers are always coprime.
//
// Flow:
// Calculate Mathematical Observation
//          ↓
// GCD(n², n(n + 1))
//          ↓
// Simplifies to n
//          ↓
// Return n
//
// Time Complexity: O(1)
// Space Complexity: O(1)

public class Solution
{
    public int GcdOfOddEvenSums(int n)
    {
        // Return the GCD using the mathematical observation
        return n;
    }
}