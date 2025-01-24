import styles from "./exam-timer.module.css";
import TextElement from "@/client/components/user-interfaces/text-element";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import useExamTimer from "@/client/components/features/exam/hooks/use-exam-timer";

export default function ExamTimer() {
    const timerElementRef = useExamTimer()

    return <ContainerElement className={styles.examTimer_timerContainer}>
        <TextElement ref={timerElementRef} className={styles.examTimer_timer}>02:00</TextElement>
        <TextElement className={styles.examTimer_timerDescription}>Time Left</TextElement>
    </ContainerElement>
}