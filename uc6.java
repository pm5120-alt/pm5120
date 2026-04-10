public class GreetingApp {

    public static void main(String[] args) {

        // If no arguments → default message
        if (args.length == 0) {
            System.out.println("Hello, World!");
            return;
        }

        // Build names string
        String names = "";

        // Enhanced for loop
        for (String name : args) {
            names += name + ", ";
        }

        // Remove last comma and space using substring
        names = names.substring(0, names.length() - 2);

        // Final output
        System.out.println("Hello, " + names);
    }
}
