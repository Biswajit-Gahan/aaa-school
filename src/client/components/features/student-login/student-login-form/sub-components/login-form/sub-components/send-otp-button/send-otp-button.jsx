"use client";

import styles from "./send-otp-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {Fragment} from "react";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";

export default function SendOtpButton() {
    const {
        mobileNumber,
        mobileNumberError,
        loading,
        otpGenerated,
        generateOtp,
    } = useLoginFormContext();

    if(otpGenerated) {
        return null;
    }

    return <ButtonElement
        className={styles.generateOtpButton_submitButton}
        type={'submit'}
        disabled={loading || mobileNumberError || !mobileNumber}
    >
        {
            loading || generateOtp
                ? <Fragment><LoadingSpinner/> SENDING...</Fragment>
                : "SEND"
        }
    </ButtonElement>
}