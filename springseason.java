public class SpringSeason {

    public static boolean isSpring(int month, int day) {
        if (month == 3 && day >= 20) {
            return true;
        }

        if (month == 4 || month == 5) {
            return true;
        }

        return month == 6 && day <= 20;
    }

    public static void main(String[] args) {
        System.out.println(isSpring(4, 10));
    }
}