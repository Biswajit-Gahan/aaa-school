"use client";

import styles from "./send-otp-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";
import {Fragment} from "react";

export default function SendOtpButton() {
    const [studentLoginFormContextState] = useStudentLoginFormContext();

    if(studentLoginFormContextState.isOtpGenerated) {
        return null;
    }

    return <ButtonElement
        disabled={
        !studentLoginFormContextState.mobileNumber
            || studentLoginFormContextState.isLoading
            || studentLoginFormContextState.isOtpGenerating
        }
        className={styles.generateOtpButton_submitButton}
        type={'submit'}
    >
        {
            studentLoginFormContextState.isOtpGenerating
                ? <Fragment><LoadingSpinner /> SENDING...</Fragment>
                : "SEND OTP"
        }
    </ButtonElement>
}