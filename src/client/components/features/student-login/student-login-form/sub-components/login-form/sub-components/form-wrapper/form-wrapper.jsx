"use client";

import styles from "./form-wrapper.module.css";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import useGenerateOtp from "@/client/components/features/student-login/student-login-form/hooks/use-generate-otp";
import useVerifyOtp from "@/client/components/features/student-login/student-login-form/hooks/use-verify-otp";

export default function FormWrapper({children}) {
    const [studentLoginFormContextState] = useStudentLoginFormContext();
    const handleSendOtpSubmit = useGenerateOtp();
    const handleVerifySubmit = useVerifyOtp();

    return <form
        className={styles.formWrapper_studentLoginForm}
        onSubmit={studentLoginFormContextState.isOtpGenerated ? handleVerifySubmit : handleSendOtpSubmit}
    >
        {children}
    </form>
}