"use client";

import styles from "./question-section.module.css"
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import Image from "next/image";
import DangerousElement from "@/client/components/user-interfaces/dangerous-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import OptionList from "@/client/components/features/exam/question-section/sub-components/option-list/option-list";


export default function QuestionSection() {
    const {
        exam: {
            question,
            questionImage,
        }
    } = useExamContext();

    return <ContainerElement as={"section"} className={styles.questionSection_questionContainer}>
        <ContainerElement className={styles.questionSection_timerContainer}>
            <TextElement className={styles.questionSection_timer}>01:38</TextElement>
            <TextElement className={styles.questionSection_timerDescription}>Time Left</TextElement>
        </ContainerElement>
        {
            questionImage && <Image
                className={styles.questionSection_questionImage}
                src={"/question-image.jpg"}
                alt={"question-image"}
                width={528}
                height={630}
                quality={100}
                draggable={false}
            />
        }
        <DangerousElement
            className={styles.questionSection_question}
            html={`<strong>Question:</strong> ${question || " "}`}
        />

        <OptionList />

    </ContainerElement>
}