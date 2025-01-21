import {
    STUDENT_LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/student-login-form-context";
import cryptoPublic from "@/client/lib/crypto-public";
import routeConfig from "@/client/config/route-config";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import useStudentLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-student-login-form-context";

export default function useGenerateOtp(regenerate = false) {
    const [studentLoginFormContextState, studentLoginFormContextDispatch] = useStudentLoginFormContext();

    return async function handler(event) {
        try {
            event.preventDefault();

            if(regenerate) {
                studentLoginFormContextDispatch({
                    type: STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.RESET_OTP_NUMBER,
                });
            }

            // GENERATING OTP PAYLOADS
            studentLoginFormContextDispatch({
                type: STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.GENERATING_OTP,
            });

            // ENCRYPT REQUEST DATA
            const encryptedOtpRequestBody = cryptoPublic.encryptObject({
                mobileNumber: studentLoginFormContextState.mobileNumber,
            });

            // GENERATE OTP
            const otpResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.generateOtp}`,
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
            let otpResponseData = await otpResponse.json();

            // DECRYPT DATA IF PROD
            if(showEncryptedData) {
                otpResponseData = cryptoPublic.decryptObject(otpResponseData);
            }

            // THROW ERROR IF DATA
            if(!otpResponse.ok) {
                throw new Error(otpResponseData.message || "Something went wrong");
            }

            studentLoginFormContextDispatch({
                type: STUDENT_LOGIN_FORM_CONTEXT_REDUCERS.OTP_GENERATED,
            })

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