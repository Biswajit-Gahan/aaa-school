import styles from "./login-form.module.css";
import FormWrapper
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/form-wrapper/form-wrapper";
import FormMobileNumberInput
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/form-mobile-number-input/form-mobile-number-input";
import FormOtpNumberInput
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/form-otp-number-input/form-otp-number-input";
import SendOtpButton
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/send-otp-button/send-otp-button";
import VerifyOtpButton
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/verify-otp-button/verify-otp-button";
import LoginFormContextProvider
    from "@/client/components/features/student-login/student-login-form/context/login-form-context";
import ResendOtpContainer
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/resend-otp-container/resend-otp-container";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import FormError
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/form-error/form-error";

export default function LoginForm() {
    return <LoginFormContextProvider>
        <ContainerElement className={styles.loginForm_formContainer}>
            <FormWrapper>
                <FormMobileNumberInput />
                <FormOtpNumberInput />
                <ResendOtpContainer />
                <SendOtpButton />
                <VerifyOtpButton />
                <FormError />
            </FormWrapper>
        </ContainerElement>
    </LoginFormContextProvider>
}