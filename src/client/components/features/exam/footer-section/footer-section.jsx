"use client"

import styles from "./footer-section.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import TextElement from "@/client/components/user-interfaces/text-element";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import ExamSubmitButton from "@/client/components/features/exam/footer-section/sub-components/exam-submit-button/exam-submit-button";
import NextQuestionButton
    from "@/client/components/features/exam/footer-section/sub-components/next-question-button/next-question-button";

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
            <ExamSubmitButton />
            <NextQuestionButton />
        </ContainerElement>
    </ContainerElement>
}