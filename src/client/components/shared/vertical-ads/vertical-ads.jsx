import styles from "./vertical-ads.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Image from "next/image";

export default function VerticalAds() {
    return <ContainerElement as={"aside"} className={styles.verticalAds_mainContainer}>
        <Image className={styles.verticalAds_adImage} src={"/default-vertical-ad.jpg"} alt={"vertical ad"} width={342} height={745} quality={100} draggable={false}/>
    </ContainerElement>
}