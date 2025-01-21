"use client";

import styles from "./form-error.module.css";
import TextElement from "@/client/components/user-interfaces/text-element";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";

export default function FormError() {
    const [studentLoginContext] = useStudentLoginFormContext();

    if(!studentLoginContext.isError) return null

    return <TextElement className={styles.formError_errorText}>! {studentLoginContext.errorMessage}</TextElement>
}