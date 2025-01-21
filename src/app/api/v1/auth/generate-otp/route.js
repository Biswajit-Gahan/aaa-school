import {NextResponse, NextRequest} from "next/server";
import regularExpressions from "@/client/utils/regular-expressions";
import {errorMessageKeys} from "@/server/config/error-messages";
import successMessages from "@/server/config/success-messages";
import responseStatus from "@/server/config/response-status";
import prisma from "@/server/lib/prisma-client";
import cryptoPublic from "@/client/lib/crypto-public";
import ServerCustomError from "@/server/helpers/error";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import {showEncryptedData} from "@/client/utils/enivorment-type";

export async function POST(req) {
    // TRY BLOCK
    try {
        // CRATE REQUEST OBJECT
        const request = new NextRequest(req);

        // PARSING ENCRYPTED DATA FROM REQUEST BODY
        const {encryptedData = undefined} = await request.json();

        console.log(encryptedData);

        // THROW NEW ERROR IF NOT ENCRYPTED DATA FOUND
        if(!encryptedData){
            throw new ServerCustomError(errorMessageKeys.invalidBody, responseStatus.badRequest);
        }

        // DECRYPT ENCRYPTED DATA
        const decryptedData = cryptoPublic.decryptObject(encryptedData);

        console.log(decryptedData);

        // THROW NEW ERROR IF NO MOBILE NUMBER FOUND
        if (!regularExpressions.mobileNumber.test(decryptedData?.mobileNumber)) {
            throw new ServerCustomError(errorMessageKeys.invalidMobileNumber, responseStatus.badRequest);
        }

        // SET OTP START TIME AND OTP END TIME
        const otpStartTime = Date.now();
        const otpEndTime = Date.now() + (2 * 60 * 1000);

        // UPSERT OTP IN DATABASE
        await prisma.otp.upsert({
            create: {
                mobileNumber: decryptedData.mobileNumber,
                otpNumber: "101010",
                otpValidityStart: new Date(otpStartTime).toISOString(),
                otpValidityEnd: new Date(otpEndTime).toISOString(),
            },
            update: {
                otpNumber: "101010",
                otpValidityStart: new Date(otpStartTime).toISOString(),
                otpValidityEnd: new Date(otpEndTime).toISOString(),
            },
            where: {
                mobileNumber: decryptedData.mobileNumber,
            }
        });

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.otpSentSuccessfully,
            statusCode: responseStatus.ok,
            success: true,
        }

        // CREATE ENCRYPTED RESPONSE DATA
        const encryptedResponseData = cryptoPublic.encryptObject(responseData)

        // RETURN RESPONSE
        return NextResponse.json(
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
        )

    }
    // CATCH BLOCK
    catch(error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}