import styles from "./resend-otp-buttom.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useGenerateOtpSubmitHandler
    from "@/client/components/features/student-login/student-login-form/hooks/use-generate-otp-submit-handler";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";

export default function ResendOtpButton() {
    const {
        loading,
        generateOtp
    } = useLoginFormContext();

    const resendOtpHandler = useGenerateOtpSubmitHandler(true);

    return <ContainerElement className={styles.resendOtpButton_resendOtpWrapper}>
        <TextElement className={styles.resendOtpButton_resendOtpTitle}>{!generateOtp && "OTP not received?"}</TextElement>
        <ButtonElement
            className={styles.resendOtpButton_button}
            onClick={resendOtpHandler}
            disabled={loading}
        >
            {
                generateOtp
                    ? "Resending"
                    : "Resend"
            }
        </ButtonElement>
    </ContainerElement>
}