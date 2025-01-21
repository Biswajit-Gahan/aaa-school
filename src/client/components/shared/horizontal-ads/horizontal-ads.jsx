import styles from "./horizontal-ads.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Image from "next/image";

export default function HorizontalAds() {
    return <ContainerElement as={"aside"} className={styles.horizontalAds_mainContainer}>
        <Image className={styles.horizontalAds_adImage} src={"/default-horizontal-ad.jpg"} alt={"horizontal ad"} width={1267} height={245} quality={100} draggable={false}/>
    </ContainerElement>
}