public class NumberChecker {

    public static int countDigits(int n){
        return String.valueOf(n).length();
    }

    public static boolean isArmstrong(int n){
        int sum=0, temp=n;
        int d = countDigits(n);

        while(temp>0){
            int r = temp%10;
            sum += Math.pow(r,d);
            temp/=10;
        }
        return sum==n;
    }
}
