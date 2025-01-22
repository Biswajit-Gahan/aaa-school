"use client";

import styles from "./form-error.module.css";
import TextElement from "@/client/components/user-interfaces/text-element";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";

export default function FormError() {
    const {
        error,
    } = useLoginFormContext();

    if(!error) {
        return null;
    }
    return <TextElement className={styles.formError_errorText}>{error} !</TextElement>
}