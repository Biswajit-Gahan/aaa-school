import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import successMessages from "@/server/config/success-messages";

export async function GET(req) {
    // TRY BLOCK
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // VERIFY SESSION
        const userId = await verifySessionMiddleware();

        // GET SUBJECTS FROM DATABASE
        const subjects = await prisma.subject.findMany({
            select: {
                subjectId: true,
                subjectName: true,
            }
        })

        // GET 5 RECENT EXAMS FORM DATABASE
        const exam = await prisma.exam.findMany({
            where: {
                studentId: userId
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            select: {
                subjectId: true,
                examMark: true,
                rightAnswers: true,
                createdAt: true,
                updatedAt: true
            },
        });

        // REFACTORING EXAM DATA
        const newExamData = exam.map(examItem => {
            const foundSubject = subjects.find(
                subjectItem => subjectItem.subjectId === examItem.subjectId
            )

            return {
                subjectName: foundSubject?.subjectName || null,
                totalExamMark: examItem?.examMark ?? null,
                correctAnswers: examItem?.rightAnswers ?? null,
                examDate: examItem?.createdAt || null,
            }
        });

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            data: newExamData,
            success: true,
        }

        // ENCRYPT THE RESPONSE DATA
        const encryptedResponseData = cryptoPublic.encryptObject(responseData)

        // RETURN RESPONSE
        return NextResponse.json(
            {
                ...(showEncryptedData ? {encryptedResponse: encryptedResponseData} : responseData)
            },
            {
                status: responseStatus.ok
            }
        );
    }
        // CATCH BLOCK
    catch (error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}