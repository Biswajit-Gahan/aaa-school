import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import {EXAM_CONTEXT_REDUCERS} from "@/client/components/features/exam/context/exam-context";

export default function useQuestionOptionSelect() {
    const {
        contextDispatch
    } = useExamContext();

    return function (option) {
        contextDispatch({
            type: EXAM_CONTEXT_REDUCERS.SELECT_ANSWER,
            payload: option.toLowerCase()
        })
    }
}