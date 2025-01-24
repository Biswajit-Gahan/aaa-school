"use client";

import styles from "./loading-screen.module.css";

import ContainerElement from "@/client/components/user-interfaces/container-element";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";
import TextElement from "@/client/components/user-interfaces/text-element";

export default function LoadingScreen() {

    return <ContainerElement
        className={`${styles.loadingScreen_mainContainer} ${styles.loadingScreen_hide}`}
        id={"loading-screen"}
    >
        <ContainerElement className={styles.loadingScreen_mainWrapper}>
            <LoadingSpinner size={30}/>
            <TextElement>Please wait while fetching data.</TextElement>
        </ContainerElement>
    </ContainerElement>
}