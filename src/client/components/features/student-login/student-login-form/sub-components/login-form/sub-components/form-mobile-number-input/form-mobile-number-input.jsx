"use client";

import styles from "./form-mobile-number-input-styles.module.css";
import TextInputElement from "@/client/components/user-interfaces/text-input-element";
import {FiTablet} from "react-icons/fi";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useStudentLoginFormInputState
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-input-state";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";

export default function FormMobileNumberInput() {
    const [studentLoginFormContextState] = useStudentLoginFormContext();

    const [
        inputValue,
        error,
        handleInputChange,
    ] = useStudentLoginFormInputState('mobileNumber', studentLoginFormContextState.isResetMobileNumber);

    return <ContainerElement>
        <TextInputElement
            className={styles.formMobileNumberInput_formInput}
            placeholder={"Enter mobile number"}
            name="mobileNumber"
            value={inputValue}
            onChange={handleInputChange}
            disabled={studentLoginFormContextState.isLoading || studentLoginFormContextState.isOtpGenerated}
        >
            <FiTablet className={styles.formMobileNumberInput_inputIcons} size={18}/>
        </TextInputElement>
        {
            error && <TextElement className={styles.formMobileNumberInput_errorLabel}>
                * Please enter a valid 10 digit mobile number.
            </TextElement>
        }
    </ContainerElement>
}