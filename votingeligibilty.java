import java.util.Scanner;

public class VotingCheck {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] ages = new int[10];

        for (int i = 0; i < ages.length; i++) {
            System.out.print("Enter age: ");
            ages[i] = sc.nextInt();

            if (ages[i] < 0) {
                System.out.println("Invalid age.");
                return;
            }
        }

        for (int age : ages) {
            if (age >= 18) {
                System.out.println(age + " can vote");
            } else {
                System.out.println(age + " cannot vote");
            }
        }
    }
}