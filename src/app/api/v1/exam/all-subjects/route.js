import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import ServerCustomError from "@/server/helpers/error";
import {errorMessageKeys} from "@/server/config/error-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import regularExpressions from "@/client/utils/regular-expressions";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import successMessages from "@/server/config/success-messages";

export async function POST(req) {
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

        // THROW ERROR IF NO EXAM GROUP FOUND
        if (!regularExpressions.examGroup.test(decryptedData?.examGroup)) {
            throw new ServerCustomError(errorMessageKeys.invalidName, responseStatus.badRequest);
        }

        // GET ALL SUBJECTS FROM DATABASE
        const subjects = await prisma.subject.findMany({
            where: {
                examGroup: decryptedData.examGroup,
            },
            select: {
                subjectId: true,
                subjectName: true,
            }
        })

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            data: subjects,
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