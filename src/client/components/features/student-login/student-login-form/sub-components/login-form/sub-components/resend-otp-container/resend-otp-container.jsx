"use client";

import styles from "./resend-otp-container-styles.module.css";
import ChangeNumberButton
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/resend-otp-container/sub-components/change-number-button/change-number-button";
import ResendOtpButton
    from "@/client/components/features/student-login/student-login-form/sub-components/login-form/sub-components/resend-otp-container/sub-components/resend-otp-button/resend-otp-button";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import useStudentLoginFormContext from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";

export default function ResendOtpContainer() {
    const [studentLoginFormContextState] = useStudentLoginFormContext();

    if(!studentLoginFormContextState.isOtpGenerated) {
        return null;
    }

    return <ContainerElement className={styles.resendOtpContainer_container}>
        <ChangeNumberButton/>
        <ResendOtpButton/>
    </ContainerElement>
}