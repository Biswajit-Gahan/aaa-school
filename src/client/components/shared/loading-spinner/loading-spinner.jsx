import styles from "./loading-spinner.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";

export default function LoadingSpinner({size = 18, borderWidth = 3}) {

    const style = {
        width: `${size}px`,
        height: `${size}px`,

    }

    const spinnerStyle = {
        borderWidth,
    }

    return <ContainerElement className={styles.loadingSpinner_container} style={style}>
        <ContainerElement className={styles.loadingSpinner_spinnerBackground} style={spinnerStyle} />
        <ContainerElement className={styles.loadingSpinner_spinner} style={spinnerStyle} />
    </ContainerElement>
}