public class Solution {
    public string LexPalindromicPermutation(string s, string target) {
        int n = s.Length;
        int[] counts = new int[26];
        foreach (char c in s) counts[c - 'a']++;

        int oddCount = 0, oddChar = -1;
        for (int i = 0; i < 26; i++)
            if (counts[i] % 2 == 1) { oddCount++; oddChar = i; }

        if ((n % 2 == 0 && oddCount != 0) || (n % 2 == 1 && oddCount != 1))
            return "";

        int[] halfCount = new int[26];
        for (int i = 0; i < 26; i++) halfCount[i] = counts[i] / 2;

        int h = n / 2;
        char mid = n % 2 == 1 ? (char)('a' + oddChar) : '\0';

        string T1 = target.Substring(0, h);
        string Tsuffix = target.Substring(h);

        int[] countsT1 = new int[26];
        foreach (char c in T1) countsT1[c - 'a']++;

        bool exact = true;
        for (int i = 0; i < 26; i++) if (countsT1[i] != halfCount[i]) { exact = false; break; }

        if (exact) {
            char[] revT1 = T1.ToCharArray();
            Array.Reverse(revT1);
            string Psuffix = (n % 2 == 1 ? mid.ToString() : "") + new string(revT1);
            if (string.CompareOrdinal(Psuffix, Tsuffix) > 0)
                return T1 + Psuffix;
        }

        // Find smallest H > T1 using halfCount multiset
        int[][] snapshots = new int[h + 1][];
        int[] remaining = (int[])halfCount.Clone();
        snapshots[0] = (int[])remaining.Clone();
        int L = 0;
        for (int i = 0; i < h; i++) {
            int idx = T1[i] - 'a';
            if (remaining[idx] > 0) {
                remaining[idx]--;
                snapshots[i + 1] = (int[])remaining.Clone();
                L = i + 1;
            } else break;
        }

        int startI = Math.Min(L, h - 1);
        for (int i = startI; i >= 0; i--) {
            int[] snap = snapshots[i];
            int tChar = T1[i] - 'a';
            int found = -1;
            for (int c = tChar + 1; c < 26; c++)
                if (snap[c] > 0) { found = c; break; }

            if (found != -1) {
                int[] rem2 = (int[])snap.Clone();
                rem2[found]--;
                var sb = new System.Text.StringBuilder();
                sb.Append(T1.Substring(0, i));
                sb.Append((char)('a' + found));
                for (int c = 0; c < 26; c++)
                    for (int k = 0; k < rem2[c]; k++) sb.Append((char)('a' + c));

                string H = sb.ToString();
                char[] revH = H.ToCharArray();
                Array.Reverse(revH);
                return H + (n % 2 == 1 ? mid.ToString() : "") + new string(revH);
            }
        }

        return "";
    }
}