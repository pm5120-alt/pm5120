import java.util.Scanner;

public class NumberAnalysis {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] numbers = new int[5];

        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = sc.nextInt();
        }

        for (int num : numbers) {
            if (num > 0) {
                if (num % 2 == 0) {
                    System.out.println(num + " Positive Even");
                } else {
                    System.out.println(num + " Positive Odd");
                }
            } else if (num < 0) {
                System.out.println(num + " Negative");
            } else {
                System.out.println("Zero");
            }
        }

        if (numbers[0] > numbers[4]) {
            System.out.println("First > Last");
        } else if (numbers[0] < numbers[4]) {
            System.out.println("First < Last");
        } else {
            System.out.println("Equal");
        }
    }
}