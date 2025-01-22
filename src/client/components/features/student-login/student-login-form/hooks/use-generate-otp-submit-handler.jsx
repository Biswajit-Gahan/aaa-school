import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {
    LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/login-form-context";
import routeConfig from "@/client/config/route-config";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";

export default function useGenerateOtpSubmitHandler(regenerate = false) {
    const {
        contextDispatch,
        mobileNumber
    } = useLoginFormContext();

    return async function (event) {
        try {
            event.preventDefault();

            if(regenerate) {
                contextDispatch({
                    type: LOGIN_FORM_CONTEXT_REDUCERS.REGENERATE_OTP
                });
            } else {
                contextDispatch({
                    type: LOGIN_FORM_CONTEXT_REDUCERS.SET_GENERATE_OTP
                });
            }

            const encryptedData = cryptoPublic.encryptObject({
                mobileNumber,
            })

            const generateOtpResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.generateOtp}`,
                {
                    method: "POST",
                    body: JSON.stringify({encryptedData}),
                }
            );

            if(!generateOtpResponse.ok) {
                let otpResponseData = await generateOtpResponse.json();

                if(showEncryptedData) {
                    otpResponseData = cryptoPublic.decryptObject(otpResponseData);
                }
                throw new Error(otpResponseData?.message || generateOtpResponse.errorText);
            }

            contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_OTP_GENERATED
            })
        } catch (error) {
            contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_ERROR_AND_RESET_GENERATE_OTP,
                payload: error.message || "Something went wrong."
            })
        }
    }
}
