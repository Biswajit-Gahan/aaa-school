import {useEffect} from "react";

export default function useDisableBodyOverflowOnDemand(deps) {
    useEffect(() => {
        if(!deps) return;
        const bodyElement = document.getElementsByTagName("body");
        bodyElement[0].style.overflow = "hidden";

        return () => bodyElement[0].style.overflow = "auto";
    }, [deps]);
}