"use client";

import {createContext, useState} from "react";

export const LoadingScreenContext = createContext(null);

export default function LoadingScreenContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    return <LoadingScreenContext.Provider value={{isLoading, setIsLoading}}>
        {children}
    </LoadingScreenContext.Provider>
}