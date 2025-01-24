import styles from "./user-logout-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useUserRegistrationFormContext
    from "@/client/components/features/home/user-register-modal/hooks/use-user-registration-form-context";
import useUserLogout from "@/client/hooks/use-user-logout";

export default function UserLogoutButton() {
    const logoutButtonHandler = useUserLogout();

    const {
        loading
    } = useUserRegistrationFormContext();

    return <ButtonElement
        className={styles.userLogoutButton_logoutButton}
        onClick={logoutButtonHandler}
        disabled={loading}
    >
        LOGOUT
    </ButtonElement>
}