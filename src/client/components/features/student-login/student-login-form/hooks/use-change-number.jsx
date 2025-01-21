import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import {
    STUDENT_LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/student-login-form-context";

export default function useChangeNumber() {
    const [_, studentFormContextDispatch] = useStudentLoginFormContext();

    return function handler(event) {
        event.preventDefault();

        studentFormContextDispatch({
            type: STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.RESET_MOBILE_NUMBER,
        });
    }
}