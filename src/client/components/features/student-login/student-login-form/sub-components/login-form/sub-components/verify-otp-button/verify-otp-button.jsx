"use client";

import styles from "./verify-otp-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {Fragment} from "react";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";

export default function VerifyOtpButton() {
    const {
        otpGenerated,
        loading,
        verifyOtp,
        otpNumberError,
        otpNumber
    } = useLoginFormContext();

    if(!otpGenerated) {
        return null;
    }

    return <ButtonElement
        className={styles.verifyOtpButton_submitButton}
        type={'submit'}
        disabled={loading || verifyOtp || !otpNumber || otpNumberError}
    >
        {
            verifyOtp
                ? <Fragment><LoadingSpinner/> VERIFYING...</Fragment>
                : "VERIFY"
        }
    </ButtonElement>
}