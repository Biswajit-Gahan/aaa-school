import styles from "./navbar.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Image from "next/image";
import {LuUserRoundCheck} from "react-icons/lu";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import routeConfig from "@/client/config/route-config";
import LogoutButton from "@/client/components/features/navbar/logout-button/logout-button";

export default function Navbar() {
    // RETURN NAVBAR CONTAINER
    return <ContainerElement className={styles.navbar_mainContainer} as={"nav"} shadow={true}>
        {/* MAIN WRAPPER */}
        <ContainerElement className={styles.navbar_mainWrapper}>
            {/* LOGO CONTAINER */}
            <ButtonElement className={styles.navbar_button} as={"a"} href={routeConfig.pageRoutes.studentHome}>
                <Image className={styles.navbar_brandLogoImage} src={"/brand-logo.png"} alt={"Aryabhat Ancient Academy"} width={300} height={50.59} quality={100} draggable={false} />
            </ButtonElement>

            {/* NAVIGATION CONTAINER */}
            <ContainerElement className={styles.navbar_navigationContainer}>
                <ButtonElement className={styles.navbar_button} as={"a"} href={routeConfig.pageRoutes.studentHistory}>
                    <LuUserRoundCheck color={"#7C0F1C"} /> MY HISTORY
                </ButtonElement>

                <LogoutButton />

                {/*<ButtonElement className={`${styles.navbar_button} ${styles.navbar_logoutButton}`}>*/}
                {/*    <GrPowerShutdown /> LOGOUT*/}
                {/*</ButtonElement>*/}
            </ContainerElement>
        </ContainerElement>
    </ContainerElement>
}