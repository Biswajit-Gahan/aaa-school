import styles from "./view-result-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import {Fragment} from "react";
import useViewResultButtonHandler from "@/client/components/features/exam/hooks/use-view-result-button-handler";

export default function ViewResultButton() {
    const {
        counters: {
            totalQuestionAttempted,
            totalQuestionCount
        },
        actions: {
            isSubmitted
        }
    } = useExamContext();

    const viewResultHandler = useViewResultButtonHandler();

    const isVisible = totalQuestionAttempted === totalQuestionCount && isSubmitted;

    return <Fragment>
        {
            isVisible && <ContainerElement>
                <ButtonElement
                    className={styles.viewResultButton_button}
                    onClick={viewResultHandler}
                >
                    VIEW RESULT
                </ButtonElement>
            </ContainerElement>
        }
    </Fragment>
}