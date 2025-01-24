// import useToggleLoadingScreenContext from "@/client/hooks/use-toggle-loading-screen-context";
import routeConfig from "@/client/config/route-config";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import {useRouter} from "next/navigation";
import useLoadingScreen from "@/client/hooks/use-loading-screen";

export default function useStartExamButtonHandler(subjectId, examGroup) {
    // const {
    //     setIsLoading
    // } = useToggleLoadingScreenContext();

    const {
        enableLoadingScreen,
        disableLoadingScreen,
    } = useLoadingScreen();

    const router = useRouter();

    return async function(event) {
        try {
            event.preventDefault();

            // setIsLoading(true);
            enableLoadingScreen();

            const encryptedData = cryptoPublic.encryptObject({
                examGroup,
                subjectId,
            })

            const examResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.startExam}`,
                {
                    method: "POST",
                    body: JSON.stringify({encryptedData}),
                }
            )

            let examResponseData = await examResponse.json();

            if(showEncryptedData) {
                examResponseData = cryptoPublic.decryptObject(examResponseData);
            }

            if(!examResponse.ok) {
                throw new Error(examResponseData.message || examResponse.statusText)
            }

            sessionStorage.setItem("examId", examResponseData.data.examId);

            router.replace(`${routeConfig.pageRoutes.examStart}`)
        } catch(error) {
            console.log(error.message || "Something went wrong");
            // setIsLoading(false);
            disableLoadingScreen()
        }
    }
}