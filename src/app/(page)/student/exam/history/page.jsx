import styles from "./page.module.css";
import VerticalAds from "@/client/components/shared/vertical-ads/vertical-ads";
import Navbar from "@/client/components/shared/navbar/navbar";
import {cookies} from "next/headers";
import cookieKeys from "@/server/config/cookie-keys";
import jsonWebToken from "@/server/lib/jwt";
import examModel from "@/server/models/exam-model";
import {errorMessageKeys} from "@/server/config/error-messages";
import {Fragment} from "react";

async function getExamData() {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get(cookieKeys.userAuth).value;

        const tokenData = jsonWebToken.verify(token)

        const examAnalyticsData = await examModel.getAggregatedMarks(tokenData.id)


        if(!examAnalyticsData._count || examAnalyticsData._count === 0){
            throw new Error(errorMessageKeys.notDataFound);
        }

        const allExams = await examModel.getAllExamsByStudentId(tokenData.id)
        const examCount = await examModel.getAllExamsCountByStudentId(tokenData.id);

        return {
            analytics: {
                totalRightAnswers: examAnalyticsData._sum.rightAnswers,
                totalWrongAnswers: examAnalyticsData._sum.wrongAnswers,
                totalExamMark: examAnalyticsData._sum.examMark
            },

            table: {
                count: examCount,
                data: allExams
            },
        }
    } catch(error) {
        return null
    }
}

const Page = async () => {
    const data = await getExamData();
    console.log(data)

    return (
        <div className={styles.start_quiz_container}>
            <Navbar />
            {/* Wrapper*/}
            <div className={styles.start_quiz_wrapper}>
                <div className={styles.start_quiz_top}>
                    {/*    Start quiz left section*/}
                    <div className={styles.start_quiz_left}>
                        {
                            data
                                ? <div>No data found</div>
                                : <Fragment>
                                    <p className={styles.table_history}>History</p>
                                    <table className={styles.content_table}>
                                        <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Category</th>
                                            <th>Date & Time</th>
                                            <th>Attempt Questions</th>
                                            <th>Your Strength</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td>English</td>
                                            <td>10 Jan, 2025, 12:22PM</td>
                                            <td>8 out of 10</td>
                                            <td>Medium</td>
                                        </tr>
                                        <tr className="active-row">
                                            <td>02</td>
                                            <td>Physics</td>
                                            <td>10 Jan, 2025, 12:22PM</td>
                                            <td>6 out of 10</td>
                                            <td>Low</td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>Math</td>
                                            <td>12 Jan, 2025, 12:22PM</td>
                                            <td>4 out of 10</td>
                                            <td>High</td>
                                        </tr>
                                        <tr>
                                            <td>04</td>
                                            <td>Math</td>
                                            <td>15 Jan, 2025, 12:22PM</td>
                                            <td>5 out of 10</td>
                                            <td>Low</td>
                                        </tr>
                                        <tr>
                                            <td>05</td>
                                            <td>Math</td>
                                            <td>17 Jan, 2025, 12:22PM</td>
                                            <td>4 out of 10</td>
                                            <td>Medium</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className={styles.table_button_wrapper}>
                                        <button className={styles.table_button_prev}>PREV</button>
                                        <button className={styles.table_button_next}>NEXT</button>
                                    </div>
                                    <div className={styles.exam_summery_middle}></div>
                                    <div className={styles.exam_summery_lower}>
                                        <div className={styles.score_header_wrapper}>
                                            <p className={styles.score_header}>Exam Range</p>
                                            <p className={styles.header_info}>Your attempt questions and scores</p>
                                        </div>
                                        {/*Score section*/}
                                        <div className={styles.score_wrapper}>
                                            {/*pie chart*/}
                                            <div className={styles.score_graph_chart}>
                                                {/*ENABLE IT*/}
                                                {/*<PieCharts/>*/}
                                            </div>
                                            <div className={styles.score_legend_container}>
                                                <div className={styles.score_legend_wrapper}>
                                                    <div className={styles.score_legend_right_correct}></div>
                                                    <p className={styles.score_legend_right}>Correct Answer</p>
                                                </div>
                                                <div className={styles.score_legend_wrapper}>
                                                    <div className={styles.score_legend_right_incorrect}></div>
                                                    <p className={styles.score_legend_right}>Incorrect Answer</p>
                                                </div>
                                                <div className={styles.score_legend_wrapper}>
                                                    <div className={styles.score_legend_left_not_attempt}></div>
                                                    <p className={styles.score_legend_right}>Not Attempt</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                        }


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
