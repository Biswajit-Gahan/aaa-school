import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {
    LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/login-form-context";

export default function useChangeNumber() {
    const {
        contextDispatch
    } = useLoginFormContext();

    return function () {
        contextDispatch({
            type: LOGIN_FORM_CONTEXT_REDUCERS.RESET_ALL,
        })
    }
}