import {
    STUDENT_LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/student-login-form-context";
import cryptoPublic from "@/client/lib/crypto-public";
import routeConfig from "@/client/config/route-config";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";
import {useRouter} from "next/navigation";

export default function useVerifyOtp() {
    const [studentLoginFormContextState, studentLoginFormContextDispatch] = useStudentLoginFormContext();
    const router = useRouter();

    return async function handler(event) {
        try {
            event.preventDefault();

            // ENABLE LOADING
            studentLoginFormContextDispatch({
                type: STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.VERIFYING_OTP,
            });

            // ENCRYPT REQUEST DATA
            const encryptedOtpRequestBody = cryptoPublic.encryptObject({
                mobileNumber: studentLoginFormContextState.mobileNumber,
                otpNumber: studentLoginFormContextState.otpNumber,
            });

            // VERIFY OTP
            const verifyResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.verifyOtp}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        encryptedData: encryptedOtpRequestBody
                    })
                }
            )

            // GET RESPONSE DATA
            let verifyOtpResponseData = await verifyResponse.json();

            // DECRYPT DATA IF PROD
            if(showEncryptedData) {
                verifyOtpResponseData = cryptoPublic.decryptObject(verifyOtpResponseData);
            }

            // THROW ERROR IF DATA
            if(!verifyResponse.ok) {
                throw new Error(verifyOtpResponseData.message || "Something went wrong");
            }

            router.replace(routeConfig.pageRoutes.studentHome);
        } catch (error) {
            studentLoginFormContextDispatch({
                type: STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.SHOW_ERROR,
                payload: {
                    errorMessage: error.message,
                }
            })
        }
    }
}