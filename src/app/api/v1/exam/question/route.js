import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import ServerCustomError from "@/server/helpers/error";
import {errorMessageKeys} from "@/server/config/error-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import successMessages from "@/server/config/success-messages";
import examConfig from "@/server/config/exam-config";

function getNewQuestion(allAttemptedQuestionIds) {
    return prisma.question.findFirst({
        where: {
            questionId: {
                notIn: allAttemptedQuestionIds,
            },
        },

        select: {
            questionId: true,
            question: true,
            subjectId: true,
            image: true,
            optionA: true,
            optionB: true,
            optionC: true,
            optionD: true,
            answer: true,
        }

    });
}

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

        // THROW ERROR IF NO EXAM ID FOUND
        if (!decryptedData?.subjectId) {
            throw new ServerCustomError(errorMessageKeys.invalidExamDetails, responseStatus.badRequest);
        }

        // GET ALL ATTEMPTED QUESTION BY THE USER
        const attemptedQuestions = await prisma.attemptedQuestions.findMany({
            where: {
                subjectId: decryptedData.subjectId,
                studentId: userId
            },
            select: {
                attemptedQuestion: true
            }
        })

        let allAttemptedQuestionIds = attemptedQuestions.map(question => question.attemptedQuestion);

        // GET SUBJECT NAME FORM DATABASE
        let newQuestion = await getNewQuestion(allAttemptedQuestionIds);

        // THROW ERROR IF NO EXAM ID FOUND
        if(!newQuestion) {
            await prisma.attemptedQuestions.deleteMany({
                where: {
                    subjectId: decryptedData.subjectId,
                    studentId: userId,
                },
            })

            allAttemptedQuestionIds = [];
            newQuestion = await getNewQuestion(allAttemptedQuestionIds);
        }

        await prisma.attemptedQuestions.create({
            data: {
                subjectId: decryptedData.subjectId,
                studentId: userId,
                attemptedQuestion: newQuestion.questionId
            }
        })

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            data: {
                question: newQuestion.question,
                image: newQuestion.image,
                optionA: newQuestion.optionA,
                optionB: newQuestion.optionB,
                optionC: newQuestion.optionC,
                optionD: newQuestion.optionD,
                answer: newQuestion.answer,
            },
            success: true
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
    catch(error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}