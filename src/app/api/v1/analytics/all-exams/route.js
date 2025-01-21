import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import ServerCustomError from "@/server/helpers/error";
import {errorMessageKeys} from "@/server/config/error-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import successMessages from "@/server/config/success-messages";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import examModel from "@/server/models/exam-model";

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

        // GETTING DATA FROM DATABASE AS PER THE ANALYTICS TYPE
        const exam = !decryptedData?.examId
            ? await examModel.getAggregatedMarks(userId)
            : await examModel.getAggregatedMarks(userId, decryptedData.examId);

        // THROW NEW ERROR IF NO EXAM DATA FOUND
        if(!exam._count || exam._count === 0){
            throw new ServerCustomError(errorMessageKeys.notDataFound, responseStatus.notFound);
        }

        // CREATING ANALYTICS DATA
        const examData = {
            totalExamMark: exam._sum.examMark,
            totalCorrectAnswers: exam._sum.rightAnswers,
            totalWrongAnswers: exam._sum.wrongAnswers,
            totalNotAnswered: exam._sum.examMark - (exam._sum.rightAnswers + exam._sum.wrongAnswers)
        };

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            data: examData,
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
    } catch(error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}