"use client";

import styles from "./form-otp-number-input-styles.module.css";
import TextInputElement from "@/client/components/user-interfaces/text-input-element";
import {HiOutlineKey} from "react-icons/hi2";
import useStudentLoginFormContext from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import useStudentLoginFormInputState
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-input-state";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";

export default function FormOtpNumberInput() {
    const [studentLoginFormContextState] = useStudentLoginFormContext();

    const [
        inputValue,
        error,
        handleInputChange,
    ] = useStudentLoginFormInputState('otpNumber', studentLoginFormContextState.isResetOtpNumber);

    if(!studentLoginFormContextState.isOtpGenerated) {
        return null;
    }

    return <ContainerElement>
        <TextInputElement
            className={styles.formOtpNumberInput_formInput}
            placeholder={"Enter OTP"}
            name="otpNumber"
            value={inputValue}
            onChange={handleInputChange}
            disabled={studentLoginFormContextState.isLoading || studentLoginFormContextState.isOtpVerifying}
        >
            <HiOutlineKey className={styles.formOtpNumberInput_inputIcons} size={18}/>
        </TextInputElement>

        {
            error && <TextElement className={styles.formOtpNumberInput_errorLabel}>
                * Please enter a valid 6 digit OTP number.
            </TextElement>
        }
    </ContainerElement>
}