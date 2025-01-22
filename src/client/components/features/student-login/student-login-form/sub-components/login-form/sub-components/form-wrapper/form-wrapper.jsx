"use client";

import styles from "./form-wrapper.module.css";
import useGenerateOtpSubmitHandler
    from "@/client/components/features/student-login/student-login-form/hooks/use-generate-otp-submit-handler";
import useVerifyOtpSubmitHandler
    from "@/client/components/features/student-login/student-login-form/hooks/use-verify-otp-submit-handler";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";

export default function FormWrapper({children}) {
    const {
        otpGenerated
    } = useLoginFormContext();

    const generateOtpHandler = useGenerateOtpSubmitHandler();
    const verifyOtpHandler = useVerifyOtpSubmitHandler();

    return <form
        className={styles.formWrapper_studentLoginForm}
        onSubmit={
            otpGenerated
                ? verifyOtpHandler
                : generateOtpHandler
        }
    >
        {children}
    </form>
}