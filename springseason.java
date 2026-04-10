public class SpringSeason {

    public static boolean isSpring(int month, int day) {
        return (month == 3 && day >= 20) ||
               (month == 4 || month == 5) ||
               (month == 6 && day <= 20);
    }

    public static void main(String[] args) {
        System.out.println(isSpring(4, 10));
    }
}
