// Approach: By HASHMAP
// 1. Count the frequency of each character in the magazine using a HashMap.
// 2. Traverse the ransom note one character at a time.
// 3. If a character is not present in the HashMap, return false.
// 4. Decrease the frequency of the matched character.
// 5. If the frequency becomes negative, return false.
// 6. If all characters are successfully matched, return true.
//
// Flow:
// Create HashMap
//        ↓
// Count Characters in Magazine
//        ↓
// Traverse Ransom Note
//        ↓
// Character Exists?
//   ↓ No         ↓ Yes
// Return False   Decrease Frequency
//                     ↓
//             Frequency < 0 ?
//               ↓ Yes      ↓ No
//          Return False   Continue
//                     ↓
//            All Characters Checked
//                     ↓
//                Return True
//
// Time Complexity: O(n + m)
// Space Complexity: O(k)
//
// Where:
// n = Length of ransomNote
// m = Length of magazine
// k = Number of distinct characters (at most 26 for this problem)

public class Solution
{
    public bool CanConstruct(string ransomNote, string magazine)
    {
        Dictionary<char, int> magz = new Dictionary<char, int>();

        // Count the frequency of each character in the magazine
        foreach (char c in magazine)
        {
            if (magz.ContainsKey(c))
            {
                magz[c]++;
            }
            else
            {
                magz[c] = 1;
            }
        }

        // Check if the ransom note can be constructed
        foreach (char c in ransomNote)
        {
            if (!magz.ContainsKey(c))
            {
                return false;
            }

            magz[c]--;

            if (magz[c] < 0)
            {
                return false;
            }
        }

        return true;
    }
}