import styles from "./start-page.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Navbar from "@/client/components/shared/navbar/navbar";
import VerticalAds from "@/client/components/shared/vertical-ads/vertical-ads";
import Image from "next/image";
import TextElement from "@/client/components/user-interfaces/text-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import DangerousElement from "@/client/components/user-interfaces/dangerous-element";

export const metadata = {
    title: "Exam Guidelines",
    description: "Read all the guidelines before the exam.",
}

function AdSection() {
    return <ContainerElement as={"aside"}>
        <VerticalAds />
    </ContainerElement>
}

function QuestionSection({children}) {
    return <ContainerElement as={"section"} className={styles.questionSection_questionContainer}>
        <Image className={styles.questionSection_questionImage} src={"/question-image.jpg"} alt={"question-image"} width={528} height={630} quality={100} draggable={false} />
        <DangerousElement
            className={styles.questionSection_question}
            html={"<strong>Question:</strong> What is the difference between the total number of visas issued for Country A and Country B together in April and the total number of visas issued for both the countries together in June?"}
        />
        <ContainerElement>
            {children}
        </ContainerElement>
    </ContainerElement>
}

function QuestionOption() {
    return <ContainerElement className={styles.questionOptionSection_optionContainer}>
        <DangerousElement className={styles.questionOptionSection_optionText} html={"A. 70"} />
        <Image className={styles.questionOptionSection_answerTypeImage} src={"/right-answer-icon.png"} alt={"right answer"} width={30} height={30} draggable={false} />
    </ContainerElement>
}

function FooterSection() {
    return <ContainerElement as={"section"} className={styles.footerSection_footerContainer} shadow={true} shadowPosition={"up"}>
        <ContainerElement className={styles.footerSection_scoreContainer}>
            <TextElement as={"span"} className={styles.footerSection_score}>03</TextElement>
            <TextElement as={"span"}>/10</TextElement>
        </ContainerElement>

        <ContainerElement className={styles.footerSection_buttonsContainer}>
            <ButtonElement className={styles.footerSection_button}>SUBMIT</ButtonElement>
            <ButtonElement className={styles.footerSection_button}>NEXT</ButtonElement>
        </ContainerElement>
    </ContainerElement>
}

export default async function StartPage() {
    return <ContainerElement className={styles.startPage_mainContainer} as={"main"}>
        <Navbar />
        <ContainerElement className={styles.startPage_mainWrapper}>
            <ContainerElement className={styles.startPage_contentContainer}>
                <QuestionSection>
                    <QuestionOption />
                    <QuestionOption />
                    <QuestionOption />
                    <QuestionOption />
                </QuestionSection>
                <AdSection />
            </ContainerElement>
            <FooterSection />
        </ContainerElement>
    </ContainerElement>
}