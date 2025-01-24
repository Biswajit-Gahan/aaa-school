import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import {errorMessageKeys} from "@/server/config/error-messages";
import responseStatus from "@/server/config/response-status";
import ServerCustomError from "@/server/helpers/error";
import cryptoPublic from "@/client/lib/crypto-public";
import regularExpressions from "@/client/utils/regular-expressions";
import successMessages from "@/server/config/success-messages";
import {showEncryptedData} from "@/client/utils/enivorment-type";

export async function POST(req) {
    // TRY BLOCK
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // VERIFY USER SESSION
        const userId = await verifySessionMiddleware();

        // PARSING ENCRYPTED DATA FROM REQUEST BODY
        const {encryptedData = undefined} = await request.json();

        // THROW ERROR IF NO ENCRYPTED DATA FOUND
        if(!encryptedData){
            throw new ServerCustomError(errorMessageKeys.invalidBody, responseStatus.badRequest);
        }

        // DECRYPT ENCRYPTED DATA
        const decryptedData = cryptoPublic.decryptObject(encryptedData);


        // THROW ERROR IF NO FULL NAME FOUND
        if (!regularExpressions.fullName.test(decryptedData?.fullName)) {
            throw new ServerCustomError(errorMessageKeys.invalidName, responseStatus.badRequest);
        }

        // THROW ERROR IF NO EXAM GROUP FOUND
        if (!regularExpressions.examGroup.test(decryptedData?.examGroup)) {
            throw new ServerCustomError(errorMessageKeys.invalidExamGroup, responseStatus.badRequest);
        }

        // UPDATE USER FULL NAME INTO THE DATABASE
        await prisma.student.update({
            data: {
                fullName: decryptedData.fullName.toLowerCase(),
                examGroup: decryptedData.examGroup,
            },
            where: {
                studentId: userId
            }
        });

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.created,
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
                status: responseStatus.created
            }
        );
    } catch(error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}