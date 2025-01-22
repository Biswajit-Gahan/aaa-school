"use client";

import {createContext, useEffect, useReducer} from "react";
import cryptoPublic from "@/client/lib/crypto-public";

export const UserContext = createContext(null);

const INITIAL_STATE = {
    userId: "",
    isAuthenticated: false,
};

export const USER_CONTEXT_REDUCER_KEYS = {
    "SAVE_USER": "SAVE_USER",
    "UPDATE_USER": "UPDATE_USER",
}

function saveUserData(state, action) {
    const data = {
        userId: action.payload,
        isAuthenticated: true,
    }
    const encryptedData = cryptoPublic.encryptObject(data)

    sessionStorage.setItem("user", encryptedData);

    return data;
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SAVE_USER":
            return saveUserData(state, action);
        case "UPDATE_USER":
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                userId: action.payload.userId,
            }
    }
};

export default function UserContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        const user = sessionStorage.getItem("user") || null;

        if(!user) return;

        const decryptedData = cryptoPublic.decryptObject(user);

        dispatch({
            type: USER_CONTEXT_REDUCER_KEYS.SAVE_USER,
            payload: {...decryptedData},
        })
    }, [])

    return <UserContext.Provider value={{...state, dispatch}}>
        {children}
    </UserContext.Provider>;
}