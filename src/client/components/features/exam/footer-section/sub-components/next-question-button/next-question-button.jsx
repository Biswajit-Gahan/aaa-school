import styles from "./next-question-button.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useGetNewQuestion from "@/client/components/features/exam/hooks/use-get-new-question";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import {Fragment} from "react";

export default function NextQuestionButton() {
    const {
        getQuestionHandler
    } = useGetNewQuestion();

    const {
        actions: {
            isLoading,
            isSubmitted,
        },
        counters: {
            totalQuestionAttempted,
            totalQuestionCount
        }
    } = useExamContext();

    const isLastQuestion = totalQuestionCount === totalQuestionAttempted

    console.log("server-logged")

    return <Fragment>
        {
            isSubmitted && !isLastQuestion && <ContainerElement>
                <ButtonElement
                    onClick={getQuestionHandler}
                    className={styles.nextQuestionButton_button}
                    disabled={isLoading}
                >
                    NEXT
                </ButtonElement>
            </ContainerElement>
        }
    </Fragment>
}