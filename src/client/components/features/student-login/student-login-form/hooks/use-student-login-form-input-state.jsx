import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import {useEffect, useMemo, useState} from "react";
import regularExpressions from "@/client/utils/regular-expressions";
import {
    STUDENT_LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/student-login-form-context";

export default function useStudentLoginFormInputState(inputName, isReset) {
    const [studentLoginFormContextState, studentLoginFormContextDispatch] = useStudentLoginFormContext();
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);

    const INPUT_NAMES = ['mobileNumber', 'otpNumber'];

    if(!INPUT_NAMES.includes(inputName)) {
        throw new Error(`Input names must be ${INPUT_NAMES.join(', ')}`);
    }

    const IS_MOBILE_NUMBER = inputName === 'mobileNumber';

    useEffect(() => {
        if(isReset) {
            const setNumber = IS_MOBILE_NUMBER
                ? STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.SET_MOBILE_NUMBER
                : STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.SET_OTP_NUMBER;

            studentLoginFormContextDispatch({
                type: setNumber,
                payload: ""
            });

            setInputValue("")
        }
    }, [isReset]);

    function handleInputChange(event) {
        event.preventDefault();

        const value = event.target.value;
        const MOBILE_NUMBER_LENGTH = 10;
        const OTP_NUMBER_LENGTH = 6;
        const isValidValue = IS_MOBILE_NUMBER
            ? regularExpressions.mobileNumber.test(value)
            : regularExpressions.otpNumber.test(value);
        const isValidValueType = regularExpressions.number.test(value);
        const valueValidLength = IS_MOBILE_NUMBER
            ? MOBILE_NUMBER_LENGTH
            : OTP_NUMBER_LENGTH;
        const setNumber = IS_MOBILE_NUMBER
            ? STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.SET_MOBILE_NUMBER
            : STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.SET_OTP_NUMBER;
        const contextState = IS_MOBILE_NUMBER
            ? studentLoginFormContextState.mobileNumber
            : studentLoginFormContextState.otpNumber;

        if(!isValidValueType && value) {
            setError(true);
            return;
        }

        if(value.length > valueValidLength) return;

        if(!isValidValue) {
            if(contextState) {
                studentLoginFormContextDispatch({
                    type: setNumber,
                    payload: ""
                });
            }

            setError(true);
        } else {
            studentLoginFormContextDispatch({
                type: setNumber,
                payload: value,
            });

            setError(false);
        }

        setInputValue(value);
    }

    return [inputValue, error, handleInputChange ];
}