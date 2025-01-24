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

function getAllExamsByStudentId(studentId, range, orderBy = "asc") {
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
        },

        take: range,

        orderBy: {
            createdAt: orderBy,
        }
    })
}

const getAllExamsCountByStudentId = (studentId) => {
    return prisma.exam.count({
        where: {
            studentId,
        }
    })
}

const examModel = {
    getAggregatedMarks,
    getAllExamsByStudentId,
    getAllExamsCountByStudentId,
}

export default examModel;