"use client";

import {createContext, useReducer} from "react";

export const UserRegisterFormContext = createContext(null);

const INITIAL_STATE = {
    fullName: "",
    inputError: false,
    loading: false,
    error: "",
}

export const USER_REGISTER_FORM_CONTEXT_REDUCERS = {
    "SET_INPUT_ERROR": 'SET_INPUT_ERROR',
    "RESET_INPUT_ERROR": 'RESET_INPUT_ERROR',
    "SET_NAME": "SET_NAME",
    "SET_ERROR_AND_RESET_LOADING": "SET_ERROR_AND_RESET_LOADING",
    "SET_LOADING_AND_RESET_ERROR": "SET_LOADING_AND_RESET_ERROR",
}

function reducer (state, action) {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                fullName: action.payload,
            };
        case "SET_INPUT_ERROR":
            return {
                ...state,
                inputError: true,
            };
        case "RESET_INPUT_ERROR":
            return {
                ...state,
                inputError: false,
            };
        case "SET_LOADING_AND_RESET_ERROR":
            return {
                ...state,
                error: "",
                loading: true
            };
        case "SET_ERROR_AND_RESET_LOADING":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default: return state;
    }
}

export default function UserRegisterFormContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return <UserRegisterFormContext.Provider value={{...state, dispatch}}>
        {children}
    </UserRegisterFormContext.Provider>
}