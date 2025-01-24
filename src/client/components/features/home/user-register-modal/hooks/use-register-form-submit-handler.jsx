import cryptoPublic from "@/client/lib/crypto-public";
import useUserRegistrationFormContext
    from "@/client/components/features/home/user-register-modal/hooks/use-user-registration-form-context";
import {
    USER_REGISTER_FORM_CONTEXT_REDUCERS
} from "@/client/components/features/home/user-register-modal/context/user-register-form-context";
import routeConfig from "@/client/config/route-config";
import {useRouter} from "next/navigation";

export default function useRegisterFormSubmitHandler() {
    const {
        fullName,
        contextDispatch,
    } = useUserRegistrationFormContext();

    const router = useRouter();

    return async function(event) {
        try {
            event.preventDefault();

            contextDispatch({
                type: USER_REGISTER_FORM_CONTEXT_REDUCERS.SET_LOADING_AND_RESET_ERROR
            })

            const DEFAULT_EXAM_GROUP = "10";

            const encryptedData = cryptoPublic.encryptObject({
                examGroup: DEFAULT_EXAM_GROUP,
                fullName,
            })

            const registerNameResponse = await fetch(
                `${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.studentRegistration}`,
                {
                    method: "POST",
                    body: JSON.stringify({encryptedData})
                }
            )

            const response = await registerNameResponse.json()

            if(!registerNameResponse.ok) {
                throw new Error(response?.message || registerNameResponse.statusText)
            }

            router.refresh();

        } catch(error) {
            contextDispatch({
                type: USER_REGISTER_FORM_CONTEXT_REDUCERS.SET_ERROR_AND_RESET_LOADING,
                payload: error.message || "Something went wrong"
            })
        }
    }
};