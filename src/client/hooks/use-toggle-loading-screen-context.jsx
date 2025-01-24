import {useContext} from "react";
import {LoadingScreenContext} from "@/client/context/loading-screen-context";

export default function useToggleLoadingScreenContext() {
    const context = useContext(LoadingScreenContext);

    if(!context){
        throw new Error("useToggleLoadingScreenContext must be used within the LoadingScreenContext context");
    }

    return {
        isLoading: context.isLoading,
        setIsLoading: context.setIsLoading,
    }
}