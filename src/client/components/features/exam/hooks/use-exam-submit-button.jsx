import useLoadingScreen from "@/client/hooks/use-loading-screen";
import cryptoPublic from "@/client/lib/crypto-public";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import routeConfig from "@/client/config/route-config";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import {EXAM_CONTEXT_REDUCERS} from "@/client/components/features/exam/context/exam-context";

export default function useExamSubmitButton() {
    const {
        enableLoadingScreen,
        disableLoadingScreen,
    } = useLoadingScreen();

    const {
        exam: {
            examId,
            selectedAnswer,
            answer,
        },
        contextDispatch,
    } = useExamContext();

    return async function(event) {
        try {
            event.preventDefault();

            enableLoadingScreen();

            contextDispatch({
                type: EXAM_CONTEXT_REDUCERS.START_LOADING,
            })

            const encryptedData = cryptoPublic.encryptObject({
                examId,
                isCorrectAnswer: selectedAnswer.toLowerCase() === answer.toLowerCase(),
            })

            const submitAnswerResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.submitAnswer}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({encryptedData}),
                }
            )

            let submitAnswerResponseData = await submitAnswerResponse.json();

            if(showEncryptedData) {
                submitAnswerResponseData = cryptoPublic.decryptObject(submitAnswerResponseData)
            }

            if(!submitAnswerResponse.ok) {
                throw new Error(submitAnswerResponseData?.message || submitAnswerResponse.statusText)
            }

            contextDispatch({
                type: EXAM_CONTEXT_REDUCERS.END_ANSWER_SUBMITTING,
            });

            disableLoadingScreen();
        } catch(error) {
            console.log(error.message || "Something went wrong");

            contextDispatch({
                type: EXAM_CONTEXT_REDUCERS.SET_FETCHING_ERROR,
            })

            disableLoadingScreen()
        }
    }
}