public class Factors {

    public static int[] getFactors(int n) {
        int count = 0;

        for (int i = 1; i <= n; i++) {
            if (n % i == 0) {
                count++;
            }
        }

        int[] factors = new int[count];
        int index = 0;

        for (int i = 1; i <= n; i++) {
            if (n % i == 0) {
                factors[index] = i;
                index++;
            }
        }

        return factors;
    }

    public static int sum(int[] arr) {
        int total = 0;

        for (int x : arr) {
            total += x;
        }

        return total;
    }

    public static int product(int[] arr) {
        int result = 1;

        for (int x : arr) {
            result *= x;
        }

        return result;
    }
}