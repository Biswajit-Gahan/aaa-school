import styles from "./home-page.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Navbar from "@/client/components/shared/navbar/navbar";
import HorizontalAds from "@/client/components/shared/horizontal-ads/horizontal-ads";
import TextElement from "@/client/components/user-interfaces/text-element";
import Image from "next/image";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import {HiArrowLongRight} from "react-icons/hi2";
import routeConfig from "@/client/config/route-config";
import {cookies} from "next/headers";
import dateExtractor from "@/client/utils/date-extractor";
import cookieKeys from "@/server/config/cookie-keys";
import jsonWebToken from "@/server/lib/jwt";
import studentModel from "@/server/models/student-model";
import subjectModel from "@/server/models/subject-model";
import examModel from "@/server/models/exam-model";
import UserRegisterForm from "@/client/components/features/home/user-register-modal/user-register-form";

function AdSection() {
    return <ContainerElement as={"section"} className={styles.adSection_adContainer} shadow={true}>
        <HorizontalAds/>
    </ContainerElement>
}

function FooterSection() {
    return <ContainerElement as={"footer"} className={styles.footerSection_footerContainer}>
        <ContainerElement className={styles.footerSection_copyrightContainer}>
            Copyright Protected,&nbsp; <ButtonElement className={styles.footerSection_schoolLink} as={"a"} href="/">Araybrat
            Ancient Academy</ButtonElement>&nbsp; | 2025
        </ContainerElement>
        <TextElement className={styles.footerSection_footerText}>Crafted by Technology Innovation Hub
            (TIH)</TextElement>
    </ContainerElement>
}

function UserSection({student}) {
    const extractedDate = dateExtractor.isoDate(new Date().toISOString());
    const date = `${extractedDate.numericWeekDay} ${extractedDate.month}, ${extractedDate.year}`;

    return <ContainerElement as={"section"} className={styles.userSection_userContainer} shadow={true}>
        <ContainerElement>
            <TextElement className={styles.userSection_name}>Hey, {student?.name || "Brilliant"}</TextElement>
            <TextElement className={styles.userSection_greet}>Good morning dear! Hope you're doing well
                today.</TextElement>
        </ContainerElement>
        <ContainerElement className={styles.userSection_dateWrapper}>
            <TextElement className={styles.userSection_date}>{date}</TextElement>
            <TextElement>10:25 AM</TextElement>
        </ContainerElement>
    </ContainerElement>
}

function ExamSubjectsSection({subjects}) {
    return <ContainerElement as={"section"} className={styles.examSubjectsSection_subjectsContainer}>
        <TextElement as={"h2"} className={styles.examSubjectsSection_subjectsHeaderLabel}>Start Your Test</TextElement>
        <TextElement className={styles.examSubjectsSection_subjectsHeaderDescription}>Select a subject to start the
            test.</TextElement>
        <ContainerElement className={styles.examSubjectsSection_subjectsListContainer}>
            {
                subjects.map((subject, index) => <SubjectCard key={index} subject={subject}/>)
            }
        </ContainerElement>
    </ContainerElement>
}

function SubjectCard({subject}) {
    return <ContainerElement className={styles.subjectCard_cardContainer} shadow={true}>
        <ContainerElement>
            <ContainerElement className={styles.subjectCard_subjectIconContainer}>
                <Image className={styles.subjectCard_subjectIcon} src={"/subject-english-icon.png"} alt={"english"}
                       width={24} height={24} draggable={false}/>
            </ContainerElement>
            <TextElement as={"h3"} className={styles.subjectCard_subjectLabel}>{subject?.subjectName}</TextElement>
            <TextElement className={styles.subjectCard_subjectDescription}>Start
                your {subject?.subjectName} test.</TextElement>
        </ContainerElement>
        <ButtonElement as={"a"} href={`${routeConfig.pageRoutes.examGuidelines}/${subject?.subjectId}`}
                       className={styles.subjectCard_startTestButton}>START TEST <HiArrowLongRight/></ButtonElement>
    </ContainerElement>
}

function ExamHistorySection({examHistories}) {
    return <ContainerElement as={"section"} className={styles.examHistorySection_historyContainer} shadow={true}>
        <TextElement as={"h2"} className={styles.examHistorySection_historyHeaderLabel}>Recent Tests</TextElement>
        <TextElement className={styles.examHistorySection_historyHeaderDescription}>Your latest 5 test
            scores.</TextElement>
        <ContainerElement className={styles.examHistorySection_historyContentContainer}>
            {
                examHistories.length > 0 ? <ExamHistoryList examHistories={examHistories}/> : <NoExamHistory/>

            }
        </ContainerElement>
    </ContainerElement>
}

function NoExamHistory() {
    return <ContainerElement className={styles.noExamHistory_container}>
        <Image className={styles.noExamHistory_listImage} src={'/list-image.png'} alt={"no list"} width={162}
               height={197} draggable={false} quality={100}/>
        <TextElement className={styles.noExamHistory_noListDescription}>No tests found. Please start a test to see the
            results.</TextElement>
    </ContainerElement>
}

function ExamHistoryList({examHistories}) {
    return <ContainerElement className={styles.examHistoryList_container}>
        {
            examHistories.map((exam, index) => <ExamHistoryCard key={index} exam={exam}/>)
        }
    </ContainerElement>
}

function ExamHistoryCard({exam}) {
    return <ContainerElement className={styles.examHistoryCard_container}>
        <ContainerElement className={styles.examHistoryCard_progressBarContainer}>
            <ContainerElement className={styles.examHistoryCard_progressBar}/>
        </ContainerElement>
        <ContainerElement className={styles.examHistoryCard_scoreDescriptionContainer}>
            <ContainerElement className={styles.examHistoryCard_scoreDescriptionWrapper}>
                <TextElement
                    className={styles.examHistoryCard_examHistoryCard_subject}>{exam?.subjectName || 'Subject'}</TextElement>
                <TextElement className={styles.examHistoryCard_examHistoryCard_level}>Medium</TextElement>
                <TextElement>10 Jan, 2025</TextElement>
            </ContainerElement>
            <TextElement
                className={styles.examHistoryCard_examHistoryCard_score}>{exam?.correctAnswers || '0'}/{exam?.totalExamMark || '0'}</TextElement>
        </ContainerElement>
    </ContainerElement>
}

function ModalRegisterForm() {
    return <ContainerElement className={styles.modalRegisterForm_mainContainer}>
        <ContainerElement className={styles.modalRegisterForm_mainWrapper}>
            <TextElement as={"h2"} className={styles.modalRegisterForm_greetText}>Hello Brilliant !</TextElement>
            <TextElement className={styles.modalRegisterForm_descriptionText}>Please register yourself by entering your full name.</TextElement>
            <UserRegisterForm />
        </ContainerElement>
    </ContainerElement>
}

async function getData() {
    let student = {};
    let subjects = [];
    let examHistories = [];

    const cookieStore = await cookies();
    const token = cookieStore.get(cookieKeys.userAuth).value;
    const tokenData = jsonWebToken.decode(token)

    const studentData = await studentModel.getStudentDetailsById(tokenData.id);

    if (studentData) {
        student = {
            name: studentData.fullName,
            mobileNumber: studentData.mobileNumber,
            examGroup: studentData.examGroup,
            isRegistered: !!studentData.fullName
        }
    }

    if (student.isRegistered && studentData.examGroup) {
        subjects = await subjectModel.getAllSubjects(studentData.examGroup)

        const exam = await examModel.getAllExamsByStudentId(tokenData.id, 5, "desc")

        if (!exam) {
            examHistories = []
        } else {
            examHistories = exam.map(examItem => {
                const foundSubject = subjects.find(
                    subjectItem => subjectItem.subjectId === examItem.subjectId
                )

                return {
                    subjectName: foundSubject.subjectName,
                    totalExamMark: examItem.examMark,
                    correctAnswers: examItem.rightAnswers,
                    examDate: examItem.createdAt,
                }
            });
        }
    }

    return {student, subjects, examHistories}
}

export default async function HomePage() {
    const {student, subjects, examHistories} = await getData();

    return <ContainerElement as={"main"} className={styles.homePage_mainContainer}>
        <Navbar/>
        <ContainerElement className={styles.homePage_mainWrapper}>
            <AdSection/>
            <ContainerElement className={styles.homePage_mainContentContainer}>
                <ContainerElement className={styles.homePage_examContentWrapper}>
                    <UserSection student={student}/>
                    <ExamSubjectsSection subjects={subjects}/>
                </ContainerElement>
                <ExamHistorySection examHistories={examHistories}/>
            </ContainerElement>
            <FooterSection/>
        </ContainerElement>
        {
            !student?.isRegistered && <ModalRegisterForm/>
        }
    </ContainerElement>
}