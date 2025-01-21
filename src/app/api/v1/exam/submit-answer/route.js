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

export async function PATCH(req) {
    // TRY BLOCK
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // VERIFY SESSION
        await verifySessionMiddleware();

        // PARSING ENCRYPTED DATA FROM REQUEST BODY
        const {encryptedData = undefined} = await request.json();

        // THROW ERROR IF NO ENCRYPTED DATA FOUND
        if(!encryptedData){
            throw new ServerCustomError(errorMessageKeys.invalidBody, responseStatus.badRequest);
        }

        // DECRYPT ENCRYPTED DATA
        const decryptedData = cryptoPublic.decryptObject(encryptedData);

        // THROW ERROR IF NO EXAM ID FOUND
        if (!decryptedData?.examId) {
            throw new ServerCustomError(errorMessageKeys.invalidExamDetails, responseStatus.badRequest);
        }

        // THROW ERROR IF NO IS CORRECT ANSWER FOUND
        if (typeof decryptedData?.isCorrectAnswer !== "boolean") {
            throw new ServerCustomError(errorMessageKeys.invalidExamDetails, responseStatus.badRequest);
        }

        // GET SUBJECT NAME FORM DATABASE
        const exam = await prisma.exam.findUnique({
            where: {
                examId: decryptedData.examId
            },
            select: {
                examId: true,
                rightAnswers: true,
                wrongAnswers: true,
                examMark: true,
            }
        });

        // THROW ERROR IF NO EXAM ID FOUND
        if(!exam?.examId) {
            throw new ServerCustomError(errorMessageKeys.invalidExamDetails, responseStatus.badRequest);
        }

        // UPDATE WRIGHT ANSWERS
        const updatedRightAnswers = decryptedData.isCorrectAnswer
            ? (exam.rightAnswers + examConfig.markPerQuestion)
            : (exam.rightAnswers + 0)

        // UPDATE WRONG ANSWERS
        const updatedWrongAnswers = decryptedData.isCorrectAnswer
            ? (exam.wrongAnswers + 0)
            : (exam.wrongAnswers + examConfig.markPerQuestion)

        // VALIDATE UPDATED MARK
        const isValidUpdatedMarks = (updatedRightAnswers + updatedWrongAnswers) <= exam.examMark

        // IF IT IS NOT A VALID UPDATED MARK
        if(!isValidUpdatedMarks){
            throw new ServerCustomError(errorMessageKeys.examMarkExceeded, responseStatus.badRequest);
        }

        // SAVE EXAM DETAILS INTO THE DATABASE
        await prisma.exam.update({
            data: {
                rightAnswers: updatedRightAnswers,
                wrongAnswers: updatedWrongAnswers
            },
            where: {
                examId: decryptedData.examId,
            }
        })

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
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
    catch(error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}