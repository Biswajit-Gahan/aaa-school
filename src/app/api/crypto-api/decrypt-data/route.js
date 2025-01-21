import {NextRequest, NextResponse} from "next/server";
import responseStatus from "@/server/config/response-status";
import ServerCustomError from "@/server/helpers/error";
import errorMessages, {errorMessageKeys} from "@/server/config/error-messages";
import cryptoPublic from "@/client/lib/crypto-public";
import successMessages from "@/server/config/success-messages";
import {isProductionServer} from "@/client/utils/enivorment-type";

export async function POST(req) {
    // TRY BLOCK
    try {
        // THROW ERROR IF IT IS A PRODUCTION SERVER
        if(isProductionServer) {
            throw new ServerCustomError(errorMessageKeys.unAuthorized, responseStatus.unAuthorized);
        }

        // CREATE REQUEST OBJECT
        const request = new NextRequest(req);

        // PARSE DATA FROM REQUEST BODY
        const {data= undefined} = await request.json();

        // THROW NEW ERROR IF NO DATA FOUND
        if(!data){
            throw new ServerCustomError(errorMessageKeys.invalidBody, responseStatus.badRequest);
        }

        // DECRYPT THE DATA
        const decryptedData = await cryptoPublic.decryptObject(data);

        // RETURN THE RESPONSE
        return NextResponse.json(
            {
                message: successMessages.success,
                statusCode: responseStatus.ok,
                data: decryptedData,
                success: true
            }
        )
    }
    // CATCH BLOCK
    catch (error) {
        // RETURN THE ERROR RESPONSE
        return NextResponse.json(
            {
                message: errorMessages[error.message.toLowerCase()] || error.message,
                statusCode: error.statusCode || 500,
                error: true
            },
            {
                status: error.statusCode || 500,
            }
        )
    }
}
