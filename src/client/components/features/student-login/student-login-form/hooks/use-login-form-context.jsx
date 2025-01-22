import {useContext} from "react";
import {
    LoginFormContext
} from "@/client/components/features/student-login/student-login-form/context/login-form-context";

export default function useLoginFormContext() {
    const context = useContext(LoginFormContext);

    if (!context) {
        throw new Error("useLoginFormContext must be used within the Login Form context!");
    }

    return {
        mobileNumber: context.state.mobileNumber,
        mobileNumberError: context.state.mobileNumberError,
        otpNumber: context.state.otpNumber,
        otpNumberError: context.state.otpNumberError,
        loading: context.state.loading,
        error: context.state.error,
        generateOtp: context.state.generateOtp,
        verifyOtp: context.state.verifyOtp,
        otpGenerated: context.state.otpGenerated,
        contextDispatch: context.dispatch
    }
}