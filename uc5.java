package github.pm5120;

public class OOPSJoin {
    public static void main(String[] args) {

        String[] pattern = {
                String.join("  ",
                        " *** ",
                        " *** ",
                        "**** ",
                        " ****"),
                String.join("  ",
                        "*   *",
                        "*   *",
                        "*   *",
                        "*    "),
                String.join("  ",
                        "*   *",
                        "*   *",
                        "**** ",
                        " *** "),
                String.join("  ",
                        "*   *",
                        "*   *",
                        "*    ",
                        "    *"),
                String.join("  ",
                        " *** ",
                        " *** ",
                        "*    ",
                        "**** ")
        };

        for (String row : pattern) {
            System.out.println(row);
        }
    }
}
