import styles from "./start-page.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Navbar from "@/client/components/shared/navbar/navbar";
import VerticalAds from "@/client/components/shared/vertical-ads/vertical-ads";
import FooterSection from "@/client/components/features/exam/footer-section/footer-section";
import ExamContextProvider from "@/client/components/features/exam/context/exam-context";
import DynamicQuestionSection from "@/client/components/features/exam/question-section/dynamic-question-section";
import DynamicFooterSection from "@/client/components/features/exam/footer-section/dynamic-footer-section";

export const metadata = {
    title: "Exam Guidelines",
    description: "Read all the guidelines before the exam.",
}

function AdSection() {
    return <ContainerElement as={"aside"}>
        <VerticalAds />
    </ContainerElement>
}

export default async function StartPage() {
    return <ContainerElement className={styles.startPage_mainContainer} as={"main"}>
        <Navbar />
        <ExamContextProvider>
            <ContainerElement className={styles.startPage_mainWrapper}>
                <ContainerElement className={styles.startPage_contentContainer}>
                    <DynamicQuestionSection />
                    <AdSection />
                </ContainerElement>
                <DynamicFooterSection />
            </ContainerElement>
        </ExamContextProvider>
    </ContainerElement>
}