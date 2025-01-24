"use client"

import styles from "./footer-section.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import dynamic from "next/dynamic";

const DynamicExamSubmitButton = dynamic(
    () => import("./sub-components/exam-submit-button/exam-submit-button"),
    {ssr: false}
)

const DynamicNextQuestionButton = dynamic(
    () => import("./sub-components/next-question-button/next-question-button"),
    {ssr: false}
)

const DynamicViewResultButton = dynamic(
    () => import("./sub-components/view-result-button/view-result-button"),
    {ssr: false}
)

export default function FooterSection() {
    const {
        counters: {
            totalQuestionCount,
            totalQuestionAttempted
        }
    } = useExamContext();

    return <ContainerElement as={"section"} className={styles.footerSection_footerContainer} shadow={true} shadowPosition={"up"}>
        <ContainerElement className={styles.footerSection_scoreContainer}>
            <TextElement as={"span"} className={styles.footerSection_score}>{totalQuestionAttempted}</TextElement>
            <TextElement as={"span"}>/{totalQuestionCount}</TextElement>
        </ContainerElement>

        <ContainerElement className={styles.footerSection_buttonsContainer}>
            <DynamicExamSubmitButton />
            <DynamicNextQuestionButton />
            <DynamicViewResultButton />
        </ContainerElement>
    </ContainerElement>
}