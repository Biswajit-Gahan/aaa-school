import styles from "./user-name-input.module.css";
import TextInputElement from "@/client/components/user-interfaces/text-input-element";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useUserRegistrationFormContext
    from "@/client/components/features/home/user-register-modal/hooks/use-user-registration-form-context";
import useUserInputHandler from "@/client/components/features/home/user-register-modal/hooks/use-user-input-handler";

export default function UserNameInput() {
    const {
        inputError,
        loading,
        fullName
    } = useUserRegistrationFormContext();

    const inputHandler = useUserInputHandler();

    return <ContainerElement>
        <TextInputElement
            className={styles.userNameInput_textInput}
            placeholder={"Enter your full name"}
            disabled={loading}
            value={fullName}
            onChange={inputHandler}
        />
        {
            inputError && <TextElement className={styles.userNameInput_errorText}>! Please enter a valid name to continue.</TextElement>
        }
    </ContainerElement>
}