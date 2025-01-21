import styles from "./login-page.module.css";
import StudentLoginForm from "@/client/components/features/student-login/student-login-form/student-login-form";
import ContainerElement from "@/client/components/user-interfaces/container-element";

export const metadata = {
    title: "Student Login",
    description: "Student login page",
}

export default function Login() {

    return <ContainerElement className={styles.mainContainer} as={'main'}>
        <ContainerElement className={styles.mainWrapper}>
            <StudentLoginForm/>
        </ContainerElement>
    </ContainerElement>
}