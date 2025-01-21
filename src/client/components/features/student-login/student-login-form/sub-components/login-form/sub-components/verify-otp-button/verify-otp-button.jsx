"use client";

import styles from "./verify-otp-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useStudentLoginFormContext from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import {Fragment} from "react";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";

export default function VerifyOtpButton() {
    const [studentLoginFormContextState] = useStudentLoginFormContext();

    if(!studentLoginFormContextState.isOtpGenerated) {
        return null;
    }

    return <ButtonElement
        disabled={
            !studentLoginFormContextState.otpNumber
            || studentLoginFormContextState.isLoading
            || studentLoginFormContextState.isOtpVerifying
        }
        className={styles.verifyOtpButton_submitButton}
        type={'submit'}
    >
        {
            studentLoginFormContextState.isOtpVerifying
                ? <Fragment><LoadingSpinner /> VERIFYING...</Fragment>
                : "VERIFY"
        }
    </ButtonElement>
}