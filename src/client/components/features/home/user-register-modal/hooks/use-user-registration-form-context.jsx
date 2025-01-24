import {
    UserRegisterFormContext
} from "@/client/components/features/home/user-register-modal/context/user-register-form-context";
import {useContext} from "react";

export default function useUserRegistrationFormContext() {
    const context = useContext(UserRegisterFormContext);

    if(!context) {
        throw new Error("useUserRegistrationFormContext must be used within the UserRegisterForm context!");
    }

    return {
        fullName: context.fullName,
        inputError: context.inputError,
        loading: context.loading,
        contextDispatch: context.dispatch,
        error: context.error,
    }
}