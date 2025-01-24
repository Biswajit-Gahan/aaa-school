"use client";

import styles from "./logout-button.module.css";
import {GrPowerShutdown} from "react-icons/gr";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import useUserLogout from "@/client/hooks/use-user-logout";

export default function LogoutButton() {
    const handleLogout = useUserLogout();

    return <ButtonElement onClick={handleLogout} className={`${styles.logoutButton_button}`}>
        <GrPowerShutdown /> LOGOUT
    </ButtonElement>
}