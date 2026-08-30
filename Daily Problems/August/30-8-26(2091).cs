public class Solution {
    public int MinimumDeletions(int[] nums) {
        int max = int.MinValue;
        int min = int.MaxValue;
        int n = nums.Length;
        int maxIndex = -1;
        int minIndex = -1;
        for(int i = 0 ; i < n ; i++){
            if(nums[i] > max){
                max = nums[i];
                maxIndex = i;
            }
            if(nums[i] < min){
                min = nums[i];
                minIndex = i;
            }
           
        }
        int c1 = minIndex+1 + (n-maxIndex);
        int c2 = maxIndex+1 + (n-minIndex);
        int c3 = Math.Max(minIndex+1, maxIndex+1);
        int c4 = Math.Max(n-maxIndex, n-minIndex);
        return Math.Min(c1,Math.Min(c2,Math.Min(c3,c4)));
    }
}