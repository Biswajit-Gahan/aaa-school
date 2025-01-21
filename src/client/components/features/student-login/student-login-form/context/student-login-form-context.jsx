"use client";

import {createContext, useReducer} from "react";

const INITIAL_STATE = {
    isLoading: false,
    mobileNumber: "",
    isResetMobileNumber: false,
    otpNumber: "",
    isResetOtpNumber: false,
    isOtpGenerating: false,
    isOtpVerifying: false,
    isOtpGenerated: false,
    isError: false,
    errorMessage: "",
    // isResendOtp: false,
}

export const StudentLoginFormContext = createContext(null);

export const STUDENT_LOGIN_FORM_CONTEXT_REDUCERS = {
    "START_LOADING": 'START_LOADING',
    "END_LOADING": 'END_LOADING',
    "SHOW_ERROR": 'SHOW_ERROR',
    "HIDE_ERROR": 'HIDE_ERROR',
    'SET_MOBILE_NUMBER': 'SET_MOBILE_NUMBER',
    'RESET_MOBILE_NUMBER': 'RESET_MOBILE_NUMBER',
    'SET_OTP_NUMBER': 'SET_OTP_NUMBER',
    'RESET_OTP_NUMBER': 'RESET_OTP_NUMBER',
    'GENERATING_OTP': 'GENERATING_OTP',
    "VERIFYING_OTP": "VERIFYING_OTP",
    'OTP_GENERATED': 'OTP_GENERATED',
    "RESET_ALL": "RESET_ALL",
}

let reducer = (state, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: "",
            }
        case 'END_LOADING':
            return {
                ...state,
                isLoading: false,
            }
        case 'SHOW_ERROR':
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.errorMessage,
                isLoading: false,
                isOtpVerifying: false,
                isOtpGenerating: false
            }
        case 'HIDE_ERROR':
            return {
                ...state,
                isError: false,
                errorMessage: "",
            }
        case 'SET_MOBILE_NUMBER':
            return {
                ...state,
                mobileNumber: action.payload,
                isResetMobileNumber: false,
            }
        case "RESET_MOBILE_NUMBER":
            return {
                ...state,
                ...INITIAL_STATE,
                isResetMobileNumber: true,
            }
        case 'SET_OTP_NUMBER':
            return {
                ...state,
                otpNumber: action.payload,
                isResetOtpNumber: false
            }
        case "RESET_OTP_NUMBER":
            return {
                ...state,
                isResetOtpNumber: true,
                otpNumber: ""
            }
        case 'GENERATING_OTP':
            return {
                ...state,
                isLoading: true,
                isOtpGenerating: true,
            }
        case 'OTP_GENERATED':
            return {
                ...state,
                isOtpGenerating: false,
                isOtpGenerated: true,
                isLoading: false,
            }
        case "VERIFYING_OTP":
            return {
                ...state,
                isLoading: true,
                isOtpVerifying: true,
            }
        case "RESET_ALL":
            return INITIAL_STATE;
        default:
            return state
    }
}

export default function StudentLoginFormContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return <StudentLoginFormContext.Provider value={{state, dispatch}}>
        {children}
    </StudentLoginFormContext.Provider>
}