public class Heights {

    public static int sum(int[] arr) {
        int total = 0;

        for (int x : arr) {
            total += x;
        }

        return total;
    }

    public static double mean(int[] arr) {
        return (double) sum(arr) / arr.length;
    }

    public static int min(int[] arr) {
        int smallest = Integer.MAX_VALUE;

        for (int x : arr) {
            if (x < smallest) {
                smallest = x;
            }
        }

        return smallest;
    }

    public static int max(int[] arr) {
        int largest = Integer.MIN_VALUE;

        for (int x : arr) {
            if (x > largest) {
                largest = x;
            }
        }

        return largest;
    }
}