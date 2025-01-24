"use client";

import styles from "./question-option.module.css";
import DangerousElement from "@/client/components/user-interfaces/dangerous-element";
import Image from "next/image";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import useQuestionOptionSelect from "@/client/components/features/exam/hooks/use-question-option-select";
import ContainerElement from "@/client/components/user-interfaces/container-element";

export default function QuestionOption({option, optionName}) {
    const {
        exam: {
            selectedAnswer,
            answer
        },
        actions: {
            isSubmitted
        }
    } = useExamContext();

    const selectOptionHandler = useQuestionOptionSelect();

    const isCorrectAnswer = answer.toLowerCase() === optionName.toLowerCase()
    const isSelectedAnswer = selectedAnswer.toLowerCase() === optionName.toLowerCase()
    const isQualified = isSubmitted && ( isCorrectAnswer || isSelectedAnswer)

    return <ButtonElement
        className={`
            ${styles.questionOption_optionContainer} 
            ${isSelectedAnswer && styles.questionOption_selected} 
            ${isQualified ? isCorrectAnswer ? styles.questionOption_rightOption : styles.questionOption_wrongOption : ""}
        `}
        onClick={() => selectOptionHandler(optionName)}
        disabled={isSubmitted}
    >
        <DangerousElement className={styles.questionOption_optionText} html={`${optionName}. ${option || " "}`} />

        {
            isQualified && <ContainerElement>
                {
                    isCorrectAnswer
                        ? <Image className={styles.questionOption_answerTypeImage} src={"/right-answer-icon.png"} alt={"right answer"} width={30} height={30} draggable={false} />
                        : <Image className={styles.questionOption_answerTypeImage} src={"/wrong-answer-icon.png"} alt={"right answer"} width={30} height={30} draggable={false} />
                }
            </ContainerElement>
        }
    </ButtonElement>
}