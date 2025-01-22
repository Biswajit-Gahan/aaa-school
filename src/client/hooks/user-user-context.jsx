import {useContext} from "react";
import {UserContext} from "@/client/context/user-context";

export default function useUserContext() {
    const context = useContext(UserContext);

    if(!context){
        throw new Error("useUserContext must be used within the User context");
    }

    return {
        userId: context.userId,
        isAuthenticated: context.isAuthenticated,
        contextDispatch: context.dispatch,
    }
}