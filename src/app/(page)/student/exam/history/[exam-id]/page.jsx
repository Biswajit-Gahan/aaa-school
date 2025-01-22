import styles from "./page.module.css";
import Image from "next/image";
import VerticalAds from "@/client/components/shared/vertical-ads/vertical-ads";
import {notFound} from "next/navigation";
import Navbar from "@/client/components/shared/navbar/navbar";
import {cookies} from "next/headers";
import cookieKeys from "@/server/config/cookie-keys";
import jsonWebToken from "@/server/lib/jwt";
import examModel from "@/server/models/exam-model";
import {errorMessageKeys} from "@/server/config/error-messages";

async function getExamData(examId) {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get(cookieKeys.userAuth).value;

        const tokenData = jsonWebToken.verify(token)

        const exam = await examModel.getAggregatedMarks(tokenData.id, examId);

        if(!exam._count || exam._count === 0){
            throw new Error(errorMessageKeys.notDataFound);
        }

        return {
            totalRightAnswers: exam._sum.rightAnswers,
            totalWrongAnswers: exam._sum.wrongAnswers,
            totalExamMark: exam._sum.examMark
        }
    } catch(error) {
        return null
    }
}


const Page = async ({params}) => {
    const examId = (await params)["exam-id"];
    const data = await getExamData(examId);

    if(!data){
        notFound()
    }

    return (
        <div className={styles.start_quiz_container}>
            <Navbar />
            {/* Wrapper*/}
            <div className={styles.start_quiz_wrapper}>
                <div className={styles.start_quiz_top}>
                    {/*    Start quiz left section*/}
                    <div className={styles.start_quiz_left}>
                        <div className={styles.exam_summery_top}>
                            <Image src={"/success-icon.svg"} alt={"icon"} width={50} height={50} draggable={false}/>
                            <div className={styles.exam_summery_info}>
                                <p className={styles.text_info}><span
                                    style={{color: "rgba(91, 193, 133, 1)"}}>Hola! </span> that was sweet. You
                                    have successfully</p>
                                <p className={styles.text_info}>answered all the questions.</p>
                            </div>
                            <button className={styles.button_submit} type={"submit"}>BACK TO HOME</button>
                        </div>
                        <div className={styles.exam_summery_middle}></div>
                        <div className={styles.exam_summery_lower}>
                            <div className={styles.score_header_wrapper}>
                                <p className={styles.score_header}>Your Score</p>
                                <p className={styles.header_info}>Your attempt questions and scores</p>
                            </div>
                            {/*Score section*/}
                            <div className={styles.score_wrapper}>
                                <div className={styles.score_graph_chart}>chart</div>
                                <div className={styles.score_legend_container}>
                                    <div className={styles.score_legend_wrapper}>
                                        <div className={styles.score_legend_right_correct}>{data.totalRightAnswers}</div>
                                        <p className={styles.score_legend_right}>Correct Answer</p>
                                    </div>
                                    <div className={styles.score_legend_wrapper}>
                                        <div className={styles.score_legend_right_incorrect}>{data.totalWrongAnswers}</div>
                                        <p className={styles.score_legend_right}>Incorrect Answer</p>
                                    </div>
                                    <div className={styles.score_legend_wrapper}>
                                        <div className={styles.score_legend_left_not_attempt}>{data.totalExamMark - (data.totalWrongAnswers + data.totalRightAnswers)}</div>
                                        <p className={styles.score_legend_right}>Not Attempt</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*    Start quiz right section*/}
                    <div className={styles.start_quiz_right}>
                        <VerticalAds />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page
