public class OTP {

    public static int generateOTP(){
        return (int)(Math.random()*900000)+100000;
    }
}
