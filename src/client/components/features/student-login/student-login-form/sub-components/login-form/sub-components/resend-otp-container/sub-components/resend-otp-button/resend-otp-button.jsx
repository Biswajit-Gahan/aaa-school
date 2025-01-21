import styles from "./resend-otp-buttom.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import useGenerateOtp from "@/client/components/features/student-login/student-login-form/hooks/use-generate-otp";

export default function ResendOtpButton() {
    const [studentFormContext] = useStudentLoginFormContext();
    const changeOtpHandler = useGenerateOtp(true);

    return <ContainerElement className={styles.resendOtpButton_resendOtpWrapper}>
        <TextElement className={styles.resendOtpButton_resendOtpTitle}>{!studentFormContext.isOtpGenerating && "OTP not received?"}</TextElement>
        <ButtonElement
            onClick={changeOtpHandler}
            className={styles.resendOtpButton_button}
            disabled={studentFormContext.isLoading || studentFormContext.isOtpGenerating}
        >
            {
                studentFormContext.isOtpGenerating ? "Generating..." : "Resend"
            }
        </ButtonElement>
    </ContainerElement>
}