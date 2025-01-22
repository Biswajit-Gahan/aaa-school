import useLoginFormContext
    from "@/client/components/features/student-login/student-login-form/hooks/use-login-form-context";
import {
    LOGIN_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/student-login/student-login-form/context/login-form-context";
import cryptoPublic from "@/client/lib/crypto-public";
import routeConfig from "@/client/config/route-config";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import {useRouter} from "next/navigation";
import useUserContext from "@/client/hooks/user-user-context";
import {USER_CONTEXT_REDUCER_KEYS} from "@/client/context/user-context";

export default function useVerifyOtpSubmitHandler() {
    const {
        contextDispatch,
        otpNumber,
        mobileNumber
    } = useLoginFormContext();

    const {
        contextDispatch: userContextDispatch,
    } = useUserContext();

    const router = useRouter();

    return async function (event) {
        try {
            event.preventDefault();

            contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_VERIFY_OTP,
            })

            const encryptedData = cryptoPublic.encryptObject({
                mobileNumber,
                otpNumber,
            })

            const verifyOtpResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.verifyOtp}`,
                {
                    method: "POST",
                    body: JSON.stringify({encryptedData}),
                }
            )

            let verifyOtpResponseData = await verifyOtpResponse.json();

            if (!verifyOtpResponse.ok) {

                if (showEncryptedData) {
                    verifyOtpResponseData = cryptoPublic.decryptObject(verifyOtpResponseData);
                }

                throw new Error(verifyOtpResponseData?.message || verifyOtpResponse.statusText);
            }

            if (showEncryptedData) {
                verifyOtpResponseData = cryptoPublic.decryptObject(verifyOtpResponseData);
            }

            // SET USER ID IN CONTEXT
            userContextDispatch({
                type: USER_CONTEXT_REDUCER_KEYS.SAVE_USER,
                payload: verifyOtpResponseData.data.userId
            })

            router.replace(routeConfig.pageRoutes.studentHome);
        } catch (error) {
            contextDispatch({
                type: LOGIN_FORM_CONTEXT_REDUCERS.SET_ERROR_AND_RESET_VERIFY_OTP,
                payload: error.message || "Something went wrong."
            })
        }
    }
}