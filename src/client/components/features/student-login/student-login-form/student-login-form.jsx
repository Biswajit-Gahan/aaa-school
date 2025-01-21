import styles from "./student-login-form.module.css";
import Image from "next/image";
import TextElement from "@/client/components/user-interfaces/text-element";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import LoginForm from "@/client/components/features/student-login/student-login-form/sub-components/login-form/login-form";

export default function StudentLoginForm() {
    return <ContainerElement className={styles.studentLoginForm_mainContainer} as={'section'} shadow={true}>
        <ContainerElement className={styles.studentLoginForm_brandImageWrapper}>
            <Image className={styles.studentLoginForm_brandImage} src={'/brand-logo.png'} alt={'aryabhat ancient academy'} width={350} height={59.02} draggable={false}
                   loading={'lazy'}/>
        </ContainerElement>

        <ContainerElement className={styles.studentLoginForm_headingContainer}>
            <TextElement className={styles.studentLoginForm_headingTitle}>Student Login</TextElement>
            <TextElement className={styles.studentLoginForm_headingDescription}>Enter your credentials to continue</TextElement>
        </ContainerElement>

        <LoginForm />
    </ContainerElement>
}