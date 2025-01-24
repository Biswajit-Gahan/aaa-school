import styles from "./form-wrapper.module.css";
import useDisableBodyOverflow
    from "@/client/hooks/use-disable-body-overflow";
import useRegisterFormSubmitHandler
    from "@/client/components/features/home/user-register-modal/hooks/use-register-form-submit-handler";

export default function FormWrapper({children}) {
    useDisableBodyOverflow();

    const formSubmitHandler = useRegisterFormSubmitHandler();

    return <form
        className={styles.formWrapper_formContainer}
        onSubmit={formSubmitHandler}
    >
        {children}
    </form>
}