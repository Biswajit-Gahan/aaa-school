import {useContext} from "react";
import {ExamContext} from "@/client/components/features/exam/context/exam-context";

export default function useExamContext() {
    const context = useContext(ExamContext);

    if(!context) throw new Error('useExam context must be used within the Exam context!');

    return {
        actions: {
            isLoading: context.actions.isLoading,
            isError: context.actions.isError,
            isSubmitted: context.actions.isSubmitted,
            isQuestionFetched: context.actions.isQuestionFetched,
            isOptionSelected: context.actions.isOptionSelected,
        },
        exam: {
            examId: context.exam.examId,
            question: context.exam.question,
            options: {
                optionA: context.exam.options.optionA,
                optionB: context.exam.options.optionB,
                optionC: context.exam.options.optionC,
                optionD: context.exam.options.optionD,
            },
            answer: context.exam.answer,
            selectedAnswer: context.exam.selectedAnswer,
            questionImage: context.exam.questionImage,
        },
        counters: {
            totalQuestionCount: context.counters.totalQuestionCount,
            totalQuestionAttempted: context.counters.totalQuestionAttempted,
            timerId: context.counters.timerId,
            timerRef: context.counters.timerRef,
        },
        contextDispatch: context.dispatch
    }
}