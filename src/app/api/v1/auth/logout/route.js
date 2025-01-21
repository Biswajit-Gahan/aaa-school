import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import prisma from "@/server/lib/prisma-client";
import successMessages from "@/server/config/success-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import cookieKeys from "@/server/config/cookie-keys";

export async function GET(req) {
    // TRY BLOCK
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // PARSING USER ID FROM SESSION MIDDLEWARE
        const userId = await verifySessionMiddleware();

        // UPDATE OR INSERT SESSION ID TO NULL IN DATABASE
        await prisma.session.upsert({
            create: {
                userId,
                sessionId: null,
            },

            update: {
                sessionId: null,
            },

            where: {
                userId,
            }
        })

        // CREATING RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            success: true,
        }

        // CREATING ENCRYPTED RESPONSE DATA
        const encryptedResponseData = cryptoPublic.encryptObject(responseData)

        // CREATING RESPONSE OBJECT
        const response = NextResponse.json(
            {
                ...(
                    showEncryptedData
                        ? {encryptedResponse: encryptedResponseData}
                        : responseData
                )
            },
            {
                status: responseStatus.ok
            }
        );

        // DELETING COOKIES IN
        response.cookies.delete(cookieKeys.userAuth);

        // RETURN RESPONSE
        return response;

    } catch(error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error, true);
    }
}