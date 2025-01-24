import regularExpressions from "@/client/utils/regular-expressions";
import useUserRegistrationFormContext
    from "@/client/components/features/home/user-register-modal/hooks/use-user-registration-form-context";
import {
    USER_REGISTER_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/home/user-register-modal/context/user-register-form-context";

export default function useUserInputHandler() {
    const {
        contextDispatch,
        inputError
    } = useUserRegistrationFormContext();

    return function(event) {
        event.preventDefault();

        const inputValue = event.target.value;
        const isValidCharacter = regularExpressions.alphabetic.test(inputValue);
        const isValidName = regularExpressions.fullName.test(inputValue);
        const maxNameLength = 20;

        if(!isValidCharacter && inputValue || inputValue.length > maxNameLength) {
            if (inputValue.length > maxNameLength) return;

            !inputError && contextDispatch({
                type: USER_REGISTER_FORM_CONTEXT_REDUCERS.SET_INPUT_ERROR
            })
        }

        if(isValidName) {
            inputError && contextDispatch({
                type: USER_REGISTER_FORM_CONTEXT_REDUCERS.RESET_INPUT_ERROR
            })
        } else {
            !inputError && contextDispatch({
                type: USER_REGISTER_FORM_CONTEXT_REDUCERS.SET_INPUT_ERROR
            })
        }

        contextDispatch({
            type: USER_REGISTER_FORM_CONTEXT_REDUCERS.SET_NAME,
            payload: inputValue
        })
    }
}