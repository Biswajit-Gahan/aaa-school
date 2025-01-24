"use client";

import styles from "./loading-screen.module.css";

import ContainerElement from "@/client/components/user-interfaces/container-element";
import LoadingSpinner from "@/client/components/shared/loading-spinner/loading-spinner";
import TextElement from "@/client/components/user-interfaces/text-element";
import {Fragment, useEffect} from "react";
import useToggleLoadingScreenContext from "@/client/hooks/use-toggle-loading-screen-context";
import useDisableBodyOverflowOnDemand from "@/client/hooks/use-disable-body-overflow-on-demand";

export default function LoadingScreen() {
    const {
        isLoading
    } = useToggleLoadingScreenContext();

    useDisableBodyOverflowOnDemand(isLoading);

    return <Fragment>
        {
            isLoading && <ContainerElement className={styles.loadingScreen_mainContainer}>
                <ContainerElement className={styles.loadingScreen_mainWrapper}>
                    <LoadingSpinner size={30}/>
                    <TextElement>Please wait while fetching data.</TextElement>
                </ContainerElement>
            </ContainerElement>
        }
    </Fragment>
}