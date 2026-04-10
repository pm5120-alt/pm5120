public class AthleteRun {

    public static double calculateRounds(double a, double b, double c) {
        double perimeter = a + b + c;
        return 5000 / perimeter;
    }

    public static void main(String[] args) {
        System.out.println(calculateRounds(100, 150, 200));
    }
}
