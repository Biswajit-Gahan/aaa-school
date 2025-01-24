import styles from "./user-register-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useUserRegistrationFormContext
    from "@/client/components/features/home/user-register-modal/hooks/use-user-registration-form-context";
import {Fragment} from "react";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";

export default function UserRegisterButton() {
    const {
        fullName,
        loading,
        inputError
    } = useUserRegistrationFormContext();

    return <ButtonElement
        type={"submit"}
        className={styles.userRegisterButton_saveButton}
        disabled={loading || inputError || !fullName}
    >
        {
            loading
                ? <Fragment><LoadingSpinner/> REGISTERING</Fragment>
                : "REGISTER"
        }
    </ButtonElement>
}