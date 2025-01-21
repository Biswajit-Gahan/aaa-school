import styles from "./home-page.module.css";
import ContainerElement from "@/client/components/user-interfaces/container-element";
import Navbar from "@/client/components/shared/navbar/navbar";
import HorizontalAds from "@/client/components/shared/horizontal-ads/horizontal-ads";
import TextElement from "@/client/components/user-interfaces/text-element";
import Image from "next/image";
import ButtonElement from "@/client/components/user-interfaces/button-element";
import { HiArrowLongRight } from "react-icons/hi2";
import routeConfig from "@/client/config/route-config";
import {cookies} from "next/headers";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import cryptoPublic from "@/client/lib/crypto-public";
import dateExtractor from "@/client/utils/date-extractor";

function AdSection() {
    return <ContainerElement as={"section"} className={styles.adSection_adContainer} shadow={true}>
        <HorizontalAds />
    </ContainerElement>
}

function FooterSection() {
    return <ContainerElement as={"footer"} className={styles.footerSection_footerContainer}>
        <ContainerElement className={styles.footerSection_copyrightContainer}>
            Copyright Protected,&nbsp; <ButtonElement className={styles.footerSection_schoolLink} as={"a"} href="/">Araybrat Ancient Academy</ButtonElement>&nbsp; | 2025
        </ContainerElement>
        <TextElement className={styles.footerSection_footerText}>Crafted by Technology Innovation Hub (TIH)</TextElement>
    </ContainerElement>
}

function UserSection({studentName}) {
    const extractedDate = dateExtractor.isoDate(new Date().toISOString());
    const date = `${extractedDate.numericWeekDay} ${extractedDate.month}, ${extractedDate.year}`;

    return <ContainerElement as={"section"} className={styles.userSection_userContainer} shadow={true}>
        <ContainerElement>
            <TextElement className={styles.userSection_name}>Hey, {studentName || "Brilliant"}</TextElement>
            <TextElement className={styles.userSection_greet}>Good morning dear! Hope you're doing well today.</TextElement>
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
        <TextElement className={styles.examSubjectsSection_subjectsHeaderDescription}>Select a subject to start the test.</TextElement>
        <ContainerElement className={styles.examSubjectsSection_subjectsListContainer}>
            {
                subjects.map((subject) => <SubjectCard key={subject.subjectId} subject={subject} />)
            }
        </ContainerElement>
    </ContainerElement>
}

function SubjectCard({subject}) {
    return <ContainerElement className={styles.subjectCard_cardContainer} shadow={true}>
        <ContainerElement>
            <ContainerElement className={styles.subjectCard_subjectIconContainer}>
                <Image className={styles.subjectCard_subjectIcon} src={"/subject-english-icon.png"} alt={"english"} width={24} height={24} draggable={false}/>
            </ContainerElement>
            <TextElement as={"h3"} className={styles.subjectCard_subjectLabel}>{subject.subjectName}</TextElement>
            <TextElement className={styles.subjectCard_subjectDescription}>Start your {subject.subjectName} test.</TextElement>
        </ContainerElement>
        <ButtonElement as={"a"} className={styles.subjectCard_startTestButton}>START TEST <HiArrowLongRight /></ButtonElement>
    </ContainerElement>
}

function ExamHistorySection({examHistory}) {
    return <ContainerElement as={"section"} className={styles.examHistorySection_historyContainer} shadow={true}>
        <TextElement as={"h2"} className={styles.examHistorySection_historyHeaderLabel}>Recent Tests</TextElement>
        <TextElement className={styles.examHistorySection_historyHeaderDescription}>Your latest 5 test scores.</TextElement>
        <ContainerElement className={styles.examHistorySection_historyContentContainer}>
            {
                examHistory.length > 0 ? <ExamHistoryList list={examHistory} /> : <NoExamHistory />

            }
        </ContainerElement>
    </ContainerElement>
}

function NoExamHistory() {
    return <ContainerElement className={styles.noExamHistory_container}>
        <Image className={styles.noExamHistory_listImage} src={'/list-image.png'} alt={"no list"} width={162} height={197} draggable={false} quality={100} />
        <TextElement className={styles.noExamHistory_noListDescription}>No tests found. Please start a test to see the results.</TextElement>
    </ContainerElement>
}

function ExamHistoryList({list}) {
    return <ContainerElement className={styles.examHistoryList_container}>
        {
            list.map((exam, index) => <ExamHistoryCard key={index} exam={exam} />)
        }
    </ContainerElement>
}

function ExamHistoryCard({exam}) {
    return <ContainerElement className={styles.examHistoryCard_container}>
        <ContainerElement className={styles.examHistoryCard_progressBarContainer}>
            <ContainerElement className={styles.examHistoryCard_progressBar} />
        </ContainerElement>
        <ContainerElement className={styles.examHistoryCard_scoreDescriptionContainer}>
            <ContainerElement className={styles.examHistoryCard_scoreDescriptionWrapper}>
                <TextElement className={styles.examHistoryCard_examHistoryCard_subject} >{exam.subjectName}</TextElement>
                <TextElement className={styles.examHistoryCard_examHistoryCard_level}>Medium</TextElement>
                <TextElement className={styles.examHistoryCard_examHistoryCard_date}>10 Jan, 2025</TextElement>
            </ContainerElement>
            <TextElement className={styles.examHistoryCard_examHistoryCard_score}>{exam.correctAnswers}/{exam.totalExamMark}</TextElement>
        </ContainerElement>
    </ContainerElement>
}

async function getData() {
    const allCookies = await cookies();
    const studentDetailsResponse = await fetch(`http://localhost:3000/${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.studentDetails}`, {
        headers: {
            Cookie: allCookies.toString()
        }
    })

    let studentDetails = await studentDetailsResponse.json();

    if(showEncryptedData) {
        studentDetails = cryptoPublic.decryptObject(studentDetails);
    }

    const encryptedData = cryptoPublic.encryptObject({
        examGroup: studentDetails.data.examGroup
    });

    const subjectResponse = await fetch(`http://localhost:3000/${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.allSubjects}`, {
        method: "POST",
        body: JSON.stringify({encryptedData}),
        headers: {
            Cookie: allCookies.toString()
        }
    })

    let subjectDetails = await subjectResponse.json();

    if(showEncryptedData) {
        subjectDetails = cryptoPublic.decryptObject(subjectDetails);
    }

    const examHistoryResponse = await fetch(`http://localhost:3000/${routeConfig.apiRoutes.v1.baseUrl}${routeConfig.apiRoutes.v1.endpoints.recentExams}`, {
        headers: {
            Cookie: allCookies.toString()
        }
    });

    let examHistoryDetails = await examHistoryResponse.json();

    if(showEncryptedData) {
        examHistoryDetails = cryptoPublic.decryptObject(examHistoryDetails);
    }

    return {studentDetails, subjectDetails, examHistoryDetails}
}

export default async function HomePage() {
    const homePageData = await getData();

    return <ContainerElement as={"main"} className={styles.homePage_mainContainer}>
        <Navbar />
        <ContainerElement className={styles.homePage_mainWrapper}>
            <AdSection />
            <ContainerElement className={styles.homePage_mainContentContainer}>
                <ContainerElement className={styles.homePage_examContentWrapper}>
                    <UserSection studentName={homePageData.studentDetails.data.name} />
                    <ExamSubjectsSection subjects={homePageData.subjectDetails.data} />
                </ContainerElement>
                <ExamHistorySection examHistory={homePageData.examHistoryDetails.data}/>
            </ContainerElement>
            <FooterSection />
        </ContainerElement>
    </ContainerElement>
}