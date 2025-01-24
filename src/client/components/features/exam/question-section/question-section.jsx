"use client";

import styles from "./question-section.module.css"
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Image from "next/image";
import DangerousElement from "@/client/components/user-interfaces/dangerous-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import dynamic from "next/dynamic";

const DynamicOptionList = dynamic(
    () => import("./sub-components/option-list/option-list"),
    {ssr: false}
)

const DynamicExamTimer = dynamic(
    () => import("./sub-components/exam-timer/exam-timer"),
    {ssr: false}
)


export default function QuestionSection() {
    const {
        exam: {
            question,
            questionImage,
        }
    } = useExamContext();

    return <ContainerElement as={"section"} className={styles.questionSection_questionContainer}>
        <DynamicExamTimer/>

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

        <DynamicOptionList />

    </ContainerElement>
}