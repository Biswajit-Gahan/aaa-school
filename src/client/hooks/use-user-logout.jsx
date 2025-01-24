import routeConfig from "@/client/config/route-config";
import {useRouter} from "next/navigation";

export default function useUserLogout() {
    const router = useRouter();

    return async function() {
        try {
            await fetch(`http://localhost:3000/${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.logout}`);
            router.replace(routeConfig.pageRoutes.studentLogin);
        } catch (error) {
            console.log(error)
        }
    }
}