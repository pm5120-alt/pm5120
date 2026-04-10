import java.util.Scanner;

public class NumberAnalysis {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[5];

        for (int i = 0; i < arr.length; i++)
            arr[i] = sc.nextInt();

        for (int num : arr) {
            if (num > 0) {
                if (num % 2 == 0)
                    System.out.println(num + " Positive Even");
                else
                    System.out.println(num + " Positive Odd");
            } else if (num < 0)
                System.out.println(num + " Negative");
            else
                System.out.println("Zero");
        }

        if (arr[0] > arr[4]) System.out.println("First > Last");
        else if (arr[0] < arr[4]) System.out.println("First < Last");
        else System.out.println("Equal");
    }
}
