import prismaClient from "@/server/lib/prisma-client";

function getStudentDetailsById(userId) {
    return prismaClient.student.findUnique({
        where: {
            studentId: userId,
        },
        select: {
            studentId: true,
            fullName: true,
            mobileNumber: true,
            examGroup: true,
        }
    });
}

export const studentModel = {
    getStudentDetailsById,
}

export default studentModel;