"use client";

import {useContext} from "react";
import {StudentLoginFormContext} from "@/client/components/features/student-login/student-login-form/context/student-login-form-context";

export default function useStudentLoginFormContext() {
    const context = useContext(StudentLoginFormContext);
    if(!context) {
        throw new Error("useStudentLoginFormContext must be used within the StudentLoginFormContext");
    }
    return [context.state, context.dispatch];
}