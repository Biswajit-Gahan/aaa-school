import {useEffect, useRef} from "react";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import {EXAM_CONTEXT_REDUCERS} from "@/client/components/features/exam/context/exam-context";

export default function useExamTimer() {
    const {
        counters: {
            totalQuestionAttempted,
        },
        actions: {
            isSubmitted,
        },
        contextDispatch,
    } = useExamContext();

    const timerElementRef = useRef(null);
    const intervalRef = useRef(null)

    function startTimer() {
        timerElementRef.current.innerHTML = "02:00";
        let time = 120;
        intervalRef.current = setInterval(() => {
            time -= 1;

            if (time === 0) {
                timerElementRef.current.innerHTML = "00:00";
                clearInterval(intervalRef.current);
                contextDispatch({
                    type: EXAM_CONTEXT_REDUCERS.END_ANSWER_SUBMITTING
                });
                return;
            }

            let minute = Math.floor(time / 60);
            let second = Math.floor(time % 60);
            timerElementRef.current.innerHTML = `0${minute}:${second < 10 ? `0${second}` : second}`;
        }, 1000)
    }

    function endTimer() {
        clearInterval(intervalRef.current);
    }

    useEffect(() => {
        !isSubmitted && startTimer()

        return endTimer;
    }, [totalQuestionAttempted, isSubmitted])

    return timerElementRef
}