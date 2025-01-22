import regularExpressions from "@/client/utils/regular-expressions";
import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {
    LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/login-form-context";

export default function useFormOtpInput() {
    const {
        contextDispatch,
        otpNumberError,
    } = useLoginFormContext();

    return function (event) {
        event.preventDefault();

        let inputValue = event.target.value;
        let isValidNumberInput = regularExpressions.number.test(inputValue);
        let isValidOtpNumber = regularExpressions.otpNumber.test(inputValue);
        const OTP_NUMBER_LENGTH = 6;

        if(!isValidNumberInput && inputValue || inputValue.length > OTP_NUMBER_LENGTH) {
            if(inputValue.length > OTP_NUMBER_LENGTH) return;

            !otpNumberError && contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_OTP_NUMBER_ERROR,
            });

            return;
        }

        if(isValidOtpNumber) {
            otpNumberError && contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.RESET_OTP_NUMBER_ERROR
            })
        } else {
            !otpNumberError && contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_OTP_NUMBER_ERROR
            })
        }

        contextDispatch({
            type: LOGIN_FORM_CONTEXT_REDUCERS.SET_OTP_NUMBER,
            payload: inputValue,
        })
    }
}