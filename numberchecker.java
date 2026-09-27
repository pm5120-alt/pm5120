public class NumberChecker {

    public static int countDigits(int n) {
        return String.valueOf(n).length();
    }

    public static boolean isArmstrong(int n) {
        int digits = countDigits(n);
        int sum = 0;
        int temp = n;

        while (temp > 0) {
            int digit = temp % 10;
            sum += (int) Math.pow(digit, digits);
            temp /= 10;
        }

        return sum == n;
    }
}