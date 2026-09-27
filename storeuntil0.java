import java.util.Scanner;

public class StoreNumbers {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double[] numbers = new double[10];
        int count = 0;

        while (count < 10) {
            double num = sc.nextDouble();

            if (num <= 0) {
                break;
            }

            numbers[count] = num;
            count++;
        }

        double sum = 0;

        for (int i = 0; i < count; i++) {
            sum += numbers[i];
        }

        System.out.println("Sum = " + sum);
    }
}