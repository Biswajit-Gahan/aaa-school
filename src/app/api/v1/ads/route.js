import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import successMessages from "@/server/config/success-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import adModel from "@/server/models/ad-model";

export async function GET(req){
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // VERIFY USER SESSION
        const userId = await verifySessionMiddleware();

        // GET ALL ADS DATA FROM DATABASE
        const ads = await adModel.getAllAds();

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            data: ads,
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
    } catch (error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}