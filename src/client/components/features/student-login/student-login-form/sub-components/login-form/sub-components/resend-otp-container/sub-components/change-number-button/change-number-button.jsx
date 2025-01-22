import ButtonElement from "@/client/components/user-interfaces/button-element";
import styles
    from "./change-number-button.module.css";
import useChangeNumber from "@/client/components/features/student-login/student-login-form/hooks/use-change-number";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";

export default function ChangeNumberButton() {
    const {
        loading
    } = useLoginFormContext();

    const changeNumberHandler = useChangeNumber();

    return <ButtonElement
        className={styles.changeNumberButton_button}
        onClick={changeNumberHandler}
        disabled={loading}
    >
        Change Number
    </ButtonElement>
}