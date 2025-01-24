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
import StartExamButton from "@/client/components/features/exam-guidelines/start-exam-button/start-exam-button";
// import LoadingScreen from "@/client/components/shared/loading-screen/loading-screen";
// import LoadingScreenContextProvider, {LoadingScreenContext} from "@/client/context/loading-screen-context";
// import DynamicLoadingScreen from "@/client/components/shared/loading-screen/dynamic-loading-screen";

export const metadata = {
    title: "Exam Guidelines",
    description: "Read all the guidelines before the exam.",
}

function GuidelinesSection({subjectData, studentData}) {
    return <ContainerElement className={styles.guidelinesSection_guidelinesContainer} as={"article"}>
        <TextElement as={"h1"}>Exam Guidelines</TextElement>
        <ContainerElement className={styles.guidelinesSection_descriptionLabelContainer}>
            <TextElement
                className={styles.guidelinesSection_userNameText}>{studentData?.fullName ? studentData.fullName.split(" ")[0] : ""},</TextElement> you
            choose {subjectData.subjectName} for the test. Do you want to continue?
        </ContainerElement>
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

function FooterSection({subjectId, examGroup}) {
    return <ContainerElement className={styles.footerSection_guideLinesFooterContainer}>
        <ButtonElement as={'a'} href={`${routeConfig.pageRoutes.studentHome}`}
                       className={`${styles.footerSection_button} ${styles.footerSection_backButton}`}>BACK</ButtonElement>
        <StartExamButton subjectId={subjectId} examGroup={examGroup}/>
    </ContainerElement>
}

async function getSubjectData(subjectId, examGroup) {
    if (!subjectId || !examGroup) {
        return null;
    }
    return (await subjectModel.getSubjectById(subjectId, examGroup));
}

async function getStudentData(studentId) {
    return (await studentModel.getStudentDetailsById(studentId));
}

export default async function GuidelinesPage({params}) {
    const subjectId = (await params)["subject-id"];
    const allCookies = await cookies()
    const token = allCookies.get(cookieKeys.userAuth).value;
    const tokenData = jsonWebToken.decode(token)

    const studentData = await getStudentData(tokenData.id);

    const subjectData = await getSubjectData(subjectId, studentData.examGroup);

    if (!subjectData || !studentData) {
        notFound();
    }


    return <ContainerElement as={"main"} className={styles.guidelinesPage_mainContainer}>
        {/* NAVBAR */}
        <Navbar/>

        {/* CONTENTS */}
        {/*<LoadingScreenContextProvider>*/}
            <ContainerElement className={styles.guidelinesPage_mainWrapper}>
                <ContainerElement className={styles.guidelinesPage_guidelinesContainer}>
                    <GuidelinesSection subjectData={subjectData} studentData={studentData}/>
                    <AdSection/>
                </ContainerElement>
                <FooterSection subjectId={subjectId} examGroup={studentData.examGroup}/>
            </ContainerElement>
            {/*<DynamicLoadingScreen />*/}
        {/*</LoadingScreenContextProvider>*/}
    </ContainerElement>
}