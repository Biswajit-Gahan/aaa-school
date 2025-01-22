"use client";

import {createContext, useReducer} from "react";

const INITIAL_STATE = {
    mobileNumber: "",
    mobileNumberError: false,

    otpNumber: "",
    otpNumberError: false,

    loading: false,
    error: "",

    generateOtp: false,
    verifyOtp: false,
    otpGenerated: false,
}

export const LoginFormContext = createContext(null);

export const LOGIN_FORM_CONTEXT_REDUCERS = {
    "SET_MOBILE_NUMBER": "SET_MOBILE_NUMBER",
    "SET_MOBILE_NUMBER_ERROR": "SET_MOBILE_NUMBER_ERROR",
    "RESET_MOBILE_NUMBER_ERROR": "RESET_MOBILE_NUMBER_ERROR",
    "SET_OTP_NUMBER": "SET_OTP_NUMBER",
    "SET_OTP_NUMBER_ERROR": "SET_OTP_NUMBER_ERROR",
    "RESET_OTP_NUMBER_ERROR": "RESET_OTP_NUMBER_ERROR",
    "SET_GENERATE_OTP": "SET_GENERATE_OTP",
    "SET_ERROR_AND_RESET_GENERATE_OTP": "SET_ERROR_AND_RESET_GENERATE_OTP",
    "SET_VERIFY_OTP": "SET_VERIFY_OTP",
    "SET_ERROR_AND_RESET_VERIFY_OTP": "SET_ERROR_AND_RESET_VERIFY_OTP",
    "SET_OTP_GENERATED": "SET_OTP_GENERATED",
    "REGENERATE_OTP": "REGENERATE_OTP",
    "RESET_ALL": "RESET_ALL",
}

let reducer = (state, action) => {
    switch (action.type) {
        case "SET_MOBILE_NUMBER":
            return {
                ...state,
                mobileNumber: action.payload,
            }
        case "RESET_ALL":
            return INITIAL_STATE;
        case "SET_MOBILE_NUMBER_ERROR":
            return {
                ...state,
                mobileNumberError: true,
            }
        case "RESET_MOBILE_NUMBER_ERROR":
            return {
                ...state,
                mobileNumberError: false,
            }

        case "SET_OTP_NUMBER":
            return {
                ...state,
                otpNumber: action.payload,
            }
        case "SET_OTP_NUMBER_ERROR":
            return {
                ...state,
                otpNumberError: true,
            }
        case "RESET_OTP_NUMBER_ERROR":
            return {
                ...state,
                otpNumberError: false,
            }
        case "SET_GENERATE_OTP":
            return {
                ...state,
                error: "",
                loading: true,
                generateOtp: true,
            }
        case "REGENERATE_OTP":
            return {
                ...state,
                error: "",
                loading: true,
                generateOtp: true,
                otpNumber: "",
                otpNumberError: false,
            }
        case "SET_ERROR_AND_RESET_GENERATE_OTP":
            return {
                ...state,
                generateOtp: false,
                error: action.payload,
                loading: false,
            }
        case "SET_VERIFY_OTP":
            return {
                ...state,
                error: "",
                loading: true,
                verifyOtp: true,
            }
        case "SET_ERROR_AND_RESET_VERIFY_OTP":
            return {
                ...state,
                verifyOtp: false,
                error: action.payload,
                loading: false,
            }
        case "SET_OTP_GENERATED":
            return {
                ...state,
                generateOtp: false,
                loading: false,
                otpGenerated: true,
            }
        default: return state;
    }
}

export default function LoginFormContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return <LoginFormContext.Provider value={{state, dispatch}}>
        {children}
    </LoginFormContext.Provider>
}