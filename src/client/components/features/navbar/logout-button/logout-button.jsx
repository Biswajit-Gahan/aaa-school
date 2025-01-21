"use client";

import styles from "./logout-button.module.css";
import {GrPowerShutdown} from "react-icons/gr";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import routeConfig from "@/client/config/route-config";
import {useRouter} from "next/navigation";


export default function LogoutButton() {
    const router = useRouter();
    async function handleLogout() {
        try {
            await fetch(`http://localhost:3000/${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.logout}`);
            router.replace(routeConfig.pageRoutes.studentLogin);
        } catch (error) {
            console.log(error)
        }
    }
    return <ButtonElement onClick={handleLogout} className={`${styles.logoutButton_button}`}>
        <GrPowerShutdown /> LOGOUT
    </ButtonElement>
}