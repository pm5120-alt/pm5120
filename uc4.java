public class uc4 {
    public static void main(String[] args) {

        String[] o = {
                " *** ",
                "*   *",
                "*   *",
                "*   *",
                " *** "
        };

        String[] p = {
                "**** ",
                "*   *",
                "**** ",
                "*    ",
                "*    "
        };

        for (int i = 0; i < o.length; i++) {
            // O
            System.out.print(o[i] + "  ");
            // O
            System.out.print(o[i] + "  ");
            // P
            System.out.print(p[i] + "  ");
            // S
            if (i == 0) System.out.print(" ****");
            else if (i == 1) System.out.print("*    ");
            else if (i == 2) System.out.print(" *** ");
            else if (i == 3) System.out.print("    *");
            else if (i == 4) System.out.print("**** ");

            System.out.println();
        }
    }
}
