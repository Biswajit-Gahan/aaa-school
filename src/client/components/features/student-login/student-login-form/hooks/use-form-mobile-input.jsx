import regularExpressions from "@/client/utils/regular-expressions";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {
    LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/login-form-context";

export default function useFormMobileInput() {
    const {
        contextDispatch,
        mobileNumberError,
    } = useLoginFormContext();

    return function (event) {
        event.preventDefault();

        let inputValue = event.target.value;
        let isValidNumberInput = regularExpressions.number.test(inputValue);
        let isValidMobileNumber = regularExpressions.mobileNumber.test(inputValue);
        const MOBILE_NUMBER_LENGTH = 10;

        if(!isValidNumberInput && inputValue || inputValue.length > MOBILE_NUMBER_LENGTH) {
            if(inputValue.length > MOBILE_NUMBER_LENGTH) return;

            !mobileNumberError && contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_MOBILE_NUMBER_ERROR,
            });

            return;
        }

        if(isValidMobileNumber) {
            mobileNumberError && contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.RESET_MOBILE_NUMBER_ERROR
            })
        } else {
            !mobileNumberError && contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_MOBILE_NUMBER_ERROR
            })
        }

        contextDispatch({
            type: LOGIN_FORM_CONTEXT_REDUCERS.SET_MOBILE_NUMBER,
            payload: inputValue,
        })
    }
}