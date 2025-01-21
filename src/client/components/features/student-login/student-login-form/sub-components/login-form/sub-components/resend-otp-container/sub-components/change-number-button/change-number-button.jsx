import ButtonElement from "@/client/components/user-interfaces/button-element";
import styles
    from "./change-number-button.module.css";
import useChangeNumber from "@/client/components/features/student-login/student-login-form/hooks/use-change-number";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";

export default function ChangeNumberButton() {
    const [studentFormContext] = useStudentLoginFormContext();

    const changeNumberHandler = useChangeNumber();

    return <ButtonElement
        className={styles.changeNumberButton_button}
        onClick={changeNumberHandler}
        disabled={studentFormContext.isLoading}
    >
        Change Number
    </ButtonElement>
}