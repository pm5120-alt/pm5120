public class Heights {

    public static int sum(int[] arr){
        int s=0;
        for(int x:arr) s+=x;
        return s;
    }

    public static double mean(int[] arr){
        return (double)sum(arr)/arr.length;
    }

    public static int min(int[] arr){
        int m=Integer.MAX_VALUE;
        for(int x:arr) m=Math.min(m,x);
        return m;
    }

    public static int max(int[] arr){
        int m=Integer.MIN_VALUE;
        for(int x:arr) m=Math.max(m,x);
        return m;
    }
}
