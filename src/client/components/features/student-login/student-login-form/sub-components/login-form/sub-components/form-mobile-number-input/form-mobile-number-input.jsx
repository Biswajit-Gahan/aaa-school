"use client";

import styles from "./form-mobile-number-input-styles.module.css";
import TextInputElement from "@/client/components/user-interfaces/text-input-element";
import {FiTablet} from "react-icons/fi";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import useFormMobileInput
    from "@/client/components/features/student-login/student-login-form/hooks/use-form-mobile-input";

export default function FormMobileNumberInput() {
    const {
        mobileNumber,
        loading,
        otpGenerated,
        mobileNumberError,
    } = useLoginFormContext();

    const inputHandler = useFormMobileInput();

    return <ContainerElement>
        <TextInputElement
            className={styles.formMobileNumberInput_formInput}
            placeholder={"Enter mobile number"}
            name="mobileNumber"
            value={mobileNumber}
            onChange={inputHandler}
            disabled={loading || otpGenerated}
        >
            <FiTablet className={styles.formMobileNumberInput_inputIcons} size={18}/>
        </TextInputElement>
        {
            mobileNumberError && <TextElement className={styles.formMobileNumberInput_errorLabel}>
                * Please enter a valid 10 digit mobile number.
            </TextElement>
        }
    </ContainerElement>
}