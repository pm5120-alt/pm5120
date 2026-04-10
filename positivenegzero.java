public class NumberCheck {

    public static int checkNumber(int num) {
        if (num > 0) return 1;
        else if (num < 0) return -1;
        else return 0;
    }

    public static void main(String[] args) {
        System.out.println(checkNumber(-5));
    }
}
