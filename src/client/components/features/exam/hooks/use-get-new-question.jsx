import {useEffect} from "react";
import useLoadingScreen from "@/client/hooks/use-loading-screen";
import useExamContext from "@/client/components/features/exam/hooks/use-exam-context";
import {EXAM_CONTEXT_REDUCERS} from "@/client/components/features/exam/context/exam-context";
import cryptoPublic from "@/client/lib/crypto-public";
import routeConfig from "@/client/config/route-config";
import {showEncryptedData} from "@/client/utils/enivorment-type";

export default function useGetNewQuestion() {
    const {
        disableLoadingScreen,
        enableLoadingScreen
    } = useLoadingScreen();

    const {
        exam: {
            examId,
        },
        counters: {
            totalQuestionAttempted
        },
        contextDispatch,
    } = useExamContext();

    async function getQuestionHandler() {
        try {
            console.log("called")
            enableLoadingScreen();

            contextDispatch({
                type: EXAM_CONTEXT_REDUCERS.START_LOADING,
            })

            const encryptedData = cryptoPublic.encryptObject({
                examId
            })

            const questionResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.newQuestion}`,
                {
                    method: "POST",
                    body: JSON.stringify({encryptedData}),
                }
            )

            let questionResponseData = await questionResponse.json()

            if(showEncryptedData) {
                questionResponseData = cryptoPublic.decryptObject(questionResponseData)
            }

            if(!questionResponse.ok) {
                throw new Error(questionResponseData?.message || questionResponse.statusText);
            }

            contextDispatch({
                type: EXAM_CONTEXT_REDUCERS.END_FETCHING_QUESTION,
                payload: {
                    question: questionResponseData.data.question,
                    optionA: questionResponseData.data.optionA,
                    optionB: questionResponseData.data.optionB,
                    optionC: questionResponseData.data.optionC,
                    optionD: questionResponseData.data.optionD,
                    answer: questionResponseData.data.answer,
                    questionImage: questionResponseData.data.image || "",
                    totalQuestionAttempted: totalQuestionAttempted + 1,
                }
            });

            disableLoadingScreen();
        } catch(error) {
            contextDispatch({
                type: EXAM_CONTEXT_REDUCERS.SET_FETCHING_ERROR
            });

            console.log(error?.message || "Something went wrong");

            disableLoadingScreen();
        }
    }

    useEffect(() => {
        examId && getQuestionHandler();
    }, [])

    return {
        getQuestionHandler,
    }
}