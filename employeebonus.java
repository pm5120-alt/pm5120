import java.util.Scanner;

public class EmployeeBonus {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double[] salary = new double[10];
        int[] years = new int[10];
        double totalBonus = 0;

        for (int i = 0; i < 10; i++) {
            salary[i] = sc.nextDouble();
            years[i] = sc.nextInt();

            if (salary[i] < 0 || years[i] < 0) {
                System.err.println("Invalid");
                i--;
            }
        }

        for (int i = 0; i < 10; i++) {
            double bonus = (years[i] > 5) ? salary[i]*0.05 : salary[i]*0.02;
            totalBonus += bonus;
        }

        System.out.println("Total Bonus = " + totalBonus);
    }
}
