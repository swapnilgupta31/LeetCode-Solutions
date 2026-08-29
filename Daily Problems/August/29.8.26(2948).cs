public class Solution
{
    public int[] LexicographicallySmallestArray(int[] nums, int limit)
    {
        int n = nums.Length;

        List<(int val, int ind)> arr = new List<(int, int)>();

        for (int i = 0; i < n; i++)
        {
            arr.Add((nums[i], i));
        }

        arr.Sort((a, b) => a.val.CompareTo(b.val));

        int[] ans = new int[n];

        int start = 0;

        while (start < n)
        {
            int end = start + 1;

            while (end < n && arr[end].val - arr[end - 1].val <= limit)
            {
                end++;
            }

            List<int> ind = new List<int>();

            for (int k = start; k < end; k++)
            {
                ind.Add(arr[k].ind);
            }

            ind.Sort();

            for (int k = 0; k < ind.Count; k++)
            {
                ans[ind[k]] = arr[start + k].val;
            }

            start = end;
        }

        return ans;
    }
}