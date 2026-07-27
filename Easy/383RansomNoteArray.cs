// Approach: ARRAY APPROACH
// 1. Create a frequency array of size 26 to store the count of each lowercase letter in the magazine.
// 2. Traverse the magazine and increment the count for each character.
// 3. Traverse the ransom note and decrement the corresponding character count.
// 4. If any character's count becomes negative, the magazine doesn't contain enough occurrences, so return false.
// 5. If all characters are successfully matched, return true.
//
// Flow:
// Initialize Frequency Array
//            ↓
// Count Characters in Magazine
//            ↓
// Traverse Ransom Note
//            ↓
// Decrease Character Frequency
//            ↓
// Frequency < 0 ?
//      ↓ Yes       ↓ No
// Return False   Continue
//            ↓
// All Characters Processed
//            ↓
// Return True
//
// Time Complexity: O(n + m)
// Space Complexity: O(1)
//
// Where:
// n = Length of ransomNote
// m = Length of magazine

public class Solution
{
    public bool CanConstruct(string ransomNote, string magazine)
    {
        int[] count = new int[26];

        // Count the frequency of each character in the magazine
        foreach (char c in magazine)
        {
            count[c - 'a']++;
        }

        // Check if the ransom note can be constructed
        foreach (char c in ransomNote)
        {
            if (--count[c - 'a'] < 0)
            {
                return false;
            }
        }

        return true;
    }
}