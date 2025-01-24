import styles from "./form-error.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useUserRegistrationFormContext
    from "@/client/components/features/home/user-register-modal/hooks/use-user-registration-form-context";

export default function FormError() {
    const {
        error
    } = useUserRegistrationFormContext();

    return <ContainerElement>
        {
            error && <TextElement className={styles.formError_errorText}>! {error}.</TextElement>
        }
    </ContainerElement>
}