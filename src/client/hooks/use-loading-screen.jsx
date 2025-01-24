import {useEffect, useRef} from "react";

export default function useLoadingScreen() {
    const loadingScreen = useRef(null);
    const body = useRef(null);

    useEffect(() => {
        loadingScreen.current = document.getElementById("loading-screen");
        body.current = document.getElementsByTagName('body')[0];

        return () => disableLoadingScreen();
    }, []);

    function enableLoadingScreen() {
        loadingScreen.current.style.display = "flex";
        body.current.style.overflow = "hidden";
    }

    function disableLoadingScreen() {
        loadingScreen.current.style.display = "none";
        body.current.style.overflow = "auto";
    }

    return {
        enableLoadingScreen,
        disableLoadingScreen,
    }
}