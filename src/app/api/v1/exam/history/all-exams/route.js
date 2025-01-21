import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import successMessages from "@/server/config/success-messages";
import ServerCustomError from "@/server/helpers/error";
import {errorMessageKeys} from "@/server/config/error-messages";
import regularExpressions from "@/client/utils/regular-expressions";

export async function POST(req) {
    // TRY BLOCK
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // VERIFY SESSION
        const userId = await verifySessionMiddleware();

        // PARSING ENCRYPTED DATA FROM REQUEST BODY
        const {encryptedData = undefined} = await request.json();

        // THROW ERROR IF NO ENCRYPTED DATA FOUND
        if(!encryptedData){
            throw new ServerCustomError(errorMessageKeys.invalidBody, responseStatus.badRequest);
        }

        // DECRYPT ENCRYPTED DATA
        const decryptedData = cryptoPublic.decryptObject(encryptedData);

        // THROW ERROR IF PAGINATION NOT FOUND
        if (!regularExpressions.number.test(decryptedData?.pagination)) {
            throw new ServerCustomError(errorMessageKeys.invalidPaginationNumber, responseStatus.badRequest);
        }

        // GET SUBJECTS FROM DATABASE
        const subjects = await prisma.subject.findMany({
            select: {
                subjectId: true,
                subjectName: true,
            }
        })

        // GET TOTAL EXAMS COUNT
        const totalExams = await prisma.exam.count({
            where: {
                studentId: userId,
            }
        })

        // FIXED LIST COUNT PER PAGE
        const LIST_COUNT_PER_PAGE = 10;

        // PAGE NUMBER
        const PAGE_NUMBER = decryptedData.pagination === 0 ? 0 : decryptedData.pagination - 1;

        // SKIP COUNT PER PAGE
        const SKIP_COUNT_PER_PAGE = LIST_COUNT_PER_PAGE * PAGE_NUMBER;

        // GET ALL EXAMS FORM DATABASE
        const exam = await prisma.exam.findMany({
            where: {
                studentId: userId
            },

            cursor: {
                id: totalExams,
            },

            skip: SKIP_COUNT_PER_PAGE,

            take: LIST_COUNT_PER_PAGE,

            orderBy: {
                createdAt: "desc",
            },

            select: {
                subjectId: true,
                examMark: 20,
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
            data: {
                totalPages: Math.ceil(totalExams / LIST_COUNT_PER_PAGE),
                exams: newExamData,
            },
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