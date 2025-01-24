import styles from "./exam-submit-button.module.css";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import useExamSubmitButton from "@/client/components/features/exam/hooks/use-exam-submit-button";
import {Fragment} from "react";

export default function ExamSubmitButton() {
    const {
        actions: {
            isLoading,
            isSubmitted,
        },
        exam: {
            selectedAnswer
        },
        counters: {
            totalQuestionCount,
            totalQuestionAttempted
        }
    } = useExamContext();

    const submitAnswerHandler = useExamSubmitButton();

    const triggerDisable =
        selectedAnswer
            ? isLoading || isSubmitted
            : true;

    const isHidden = totalQuestionAttempted === totalQuestionCount && isSubmitted;

    return <Fragment>
        {
            !isHidden && <ContainerElement>
                <ButtonElement
                    className={styles.examSubmitButton_button}
                    disabled={triggerDisable}
                    onClick={submitAnswerHandler}
                >
                    SUBMIT
                </ButtonElement>
            </ContainerElement>
        }
    </Fragment>
}