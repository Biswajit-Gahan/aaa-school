import prisma from "@/server/lib/prisma-client";

function getSubjectById(subjectId, examGroup) {
    return prisma.subject.findUnique({
        where: {
            subjectId,
            examGroup,
        },
        select: {
            subjectId: true,
            subjectName: true,
        }
    })
}

function getAllSubjects(examGroup) {
    return prisma.subject.findMany({
        where: {
            examGroup,
        },
        select: {
            subjectId: true,
            subjectName: true,
        }
    })
}

const subjectModel = {
    getSubjectById,
    getAllSubjects,
}

export default subjectModel;