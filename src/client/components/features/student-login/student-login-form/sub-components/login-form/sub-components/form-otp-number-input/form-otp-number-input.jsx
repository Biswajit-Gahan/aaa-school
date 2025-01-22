"use client";

import styles from "./form-otp-number-input-styles.module.css";
import TextInputElement from "@/client/components/user-interfaces/text-input-element";
import {HiOutlineKey} from "react-icons/hi2";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import useFormOtpInput from "@/client/components/features/student-login/student-login-form/hooks/use-form-otp-input";

export default function FormOtpNumberInput() {
    const {
        otpNumber,
        loading,
        otpNumberError,
        otpGenerated,
    } = useLoginFormContext();

    const inputHandler = useFormOtpInput();

    if(!otpGenerated) {
        return null;
    }

    return <ContainerElement>
        <TextInputElement
            className={styles.formOtpNumberInput_formInput}
            placeholder={"Enter OTP"}
            name="otpNumber"
            value={otpNumber}
            onChange={inputHandler}
            disabled={loading}
        >
            <HiOutlineKey className={styles.formOtpNumberInput_inputIcons} size={18}/>
        </TextInputElement>

        {
            otpNumberError && <TextElement className={styles.formOtpNumberInput_errorLabel}>
                * Please enter a valid 6 digit OTP number.
            </TextElement>
        }
    </ContainerElement>
}