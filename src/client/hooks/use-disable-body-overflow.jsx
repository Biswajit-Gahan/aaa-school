import {useEffect} from "react";

export default function useDisableBodyOverflow() {
    useEffect(() => {
        const bodyElement = document.getElementsByTagName("body");
        bodyElement[0].style.overflow = "hidden";

        return () => bodyElement[0].style.overflow = "auto";
    }, []);
}