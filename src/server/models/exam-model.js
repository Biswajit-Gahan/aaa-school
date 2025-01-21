import prisma from "@/server/lib/prisma-client";

function getAggregatedMarks(studentId = undefined, examId = undefined) {
    return prisma.exam.aggregate({
        _sum: {
            rightAnswers: true,
            wrongAnswers: true,
            examMark: true,
        },
        where: {
            ...(studentId && {studentId}),
            ...(examId && {examId}),
        },
        _count: true,
    })
}

const examModel = {
    getAggregatedMarks,
}

export default examModel;