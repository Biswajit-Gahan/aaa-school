"use client";

import styles from "./start-exam-button.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useStartExamButtonHandler
    from "@/client/components/features/exam-guidelines/start-exam-button/hooks/use-start-exam-button-handler";

export default function StartExamButton({subjectId, examGroup}) {
    const startExamButtonHandler = useStartExamButtonHandler(subjectId, examGroup);

    return <ContainerElement>
        <ButtonElement onClick={startExamButtonHandler} className={styles.startExamButton_startButton}>LET&apos;S START</ButtonElement>
    </ContainerElement>
}