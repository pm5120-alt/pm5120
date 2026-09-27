public class GreetingApp {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Hello, World!");
            return;
        }

        String names = String.join(", ", args);
        System.out.println("Hello, " + names);
    }
}