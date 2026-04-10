public class GreetingApp {

    public static void main(String[] args) {

        // If no arguments → default greeting
        if (args.length == 0) {
            System.out.println("Hello, World!");
            return;
        }

        // Use String.join to combine names
        String names = String.join(", ", args);

        // Print greeting
        System.out.println("Hello, " + names);
    }
}
