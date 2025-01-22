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

function getAllExamsByStudentId(studentId) {
    return prisma.exam.findMany({
        where: {
            studentId,
        },
        select: {
            examGroup: true,
            examMark: true,
            rightAnswers: true,
            examId: true,
            wrongAnswers: true,
            subjectId: true,
        }
    })
}

const examModel = {
    getAggregatedMarks,
    getAllExamsByStudentId
}

export default examModel;