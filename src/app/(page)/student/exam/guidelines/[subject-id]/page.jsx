import styles from "./guidlines-page.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Navbar from "@/client/components/shared/navbar/navbar";
import VerticalAds from "@/client/components/shared/vertical-ads/vertical-ads";
import TextElement from "@/client/components/user-interfaces/text-element";
import {ListElement, ListItemElement} from "@/client/components/user-interfaces/list-element";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import routeConfig from "@/client/config/route-config";
import subjectModel from "@/server/models/subject-model";
import {notFound} from "next/navigation";
import {cookies} from "next/headers";
import cookieKeys from "@/server/config/cookie-keys";
import jsonWebToken from "@/server/lib/jwt";
import studentModel from "@/server/models/student-model";

export const metadata = {
    title: "Exam Guidelines",
    description: "Read all the guidelines before the exam.",
}

function GuidelinesSection({subjectData, studentData}) {
    return <ContainerElement className={styles.guidelinesSection_guidelinesContainer} as={"article"}>
        <TextElement as={"h1"}>Exam Guidelines</TextElement>
        <TextElement className={styles.guidelinesSection_descriptionLabel}>{studentData?.fullName ? studentData.fullName.split(" ")[0] : ""}, you choose {subjectData.subjectName} for
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
        <ButtonElement as={'a'} href={`${routeConfig.pageRoutes.studentHome}`} className={`${styles.footerSection_button} ${styles.footerSection_backButton}`}>BACK</ButtonElement>
        <ButtonElement className={`${styles.footerSection_button} ${styles.footerSection_startButton}`}>LET&apos;S START</ButtonElement>
    </ContainerElement>
}

async function getSubjectData(subjectId, examGroup) {
    if(!subjectId || !examGroup) {
        return null;
    }
    return (await subjectModel.getSubjectById(subjectId, examGroup));
}

async function getStudentData(studentId){
    return (await studentModel.getStudentDetailsById(studentId));
}

export default async function GuidelinesPage({params}) {
    const subjectId = (await params)["subject-id"];
    const allCookies = await cookies()
    const token = allCookies.get(cookieKeys.userAuth).value;
    const tokenData = jsonWebToken.decode(token)

    const studentData = await getStudentData(tokenData.id);

    const subjectData = await getSubjectData(subjectId, studentData.examGroup);

    if(!subjectData || !studentData) {
        notFound();
    }


    return <ContainerElement as={"main"} className={styles.guidelinesPage_mainContainer}>
        {/* NAVBAR */}
        <Navbar/>

        {/* CONTENTS */}
        <ContainerElement className={styles.guidelinesPage_mainWrapper}>
            <ContainerElement className={styles.guidelinesPage_guidelinesContainer}>
                <GuidelinesSection subjectData={subjectData} studentData={studentData} />
                <AdSection />
            </ContainerElement>
            <FooterSection />
        </ContainerElement>
    </ContainerElement>
}