import styles from "./guidlines-page.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Navbar from "@/client/components/shared/navbar/navbar";
import VerticalAds from "@/client/components/shared/vertical-ads/vertical-ads";
import TextElement from "@/client/components/user-interfaces/text-element";
import {ListElement, ListItemElement} from "@/client/components/user-interfaces/list-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";

export const metadata = {
    title: "Exam Guidelines",
    description: "Read all the guidelines before the exam.",
}

function GuidelinesSection() {
    return <ContainerElement className={styles.guidelinesSection_guidelinesContainer} as={"article"}>
        <TextElement as={"h1"}>Exam Guidelines</TextElement>
        <TextElement className={styles.guidelinesSection_descriptionLabel}>Sweta, you choose mathematics for
            your test. Do you want to continue?</TextElement>
        <TextElement as={"h2"} className={styles.guidelinesSection_guidelinesLabel}>Please read all the rules and
            regulations of the exam.</TextElement>
        <ListElement type={"ul"} className={styles.guidelinesSection_listContent}>
            <ListItemElement>This test will be 2 minutes per questions.</ListItemElement>
            <ListItemElement>Total 10 questions for your test.</ListItemElement>
            <ListItemElement>Everything Should be multiple type of questions.</ListItemElement>
            <ListItemElement>Every question after your answer automatic right answer showed you.</ListItemElement>
            <ListItemElement>No Skip options will be there.</ListItemElement>
        </ListElement>
    </ContainerElement>
}

function AdSection() {
    return <ContainerElement>
        <VerticalAds/>
    </ContainerElement>
}

function FooterSection() {
    return <ContainerElement className={styles.footerSection_guideLinesFooterContainer}>
        <ButtonElement className={`${styles.footerSection_button} ${styles.footerSection_backButton}`}>BACK</ButtonElement>
        <ButtonElement className={`${styles.footerSection_button} ${styles.footerSection_startButton}`}>LET&apos;S START</ButtonElement>
    </ContainerElement>
}

export default async function GuidelinesPage() {
    return <ContainerElement as={"main"} className={styles.guidelinesPage_mainContainer}>
        {/* NAVBAR */}
        <Navbar/>

        {/* CONTENTS */}
        <ContainerElement className={styles.guidelinesPage_mainWrapper}>
            <ContainerElement className={styles.guidelinesPage_guidelinesContainer}>
                <GuidelinesSection />
                <AdSection />
            </ContainerElement>
            <FooterSection />
        </ContainerElement>
    </ContainerElement>
}