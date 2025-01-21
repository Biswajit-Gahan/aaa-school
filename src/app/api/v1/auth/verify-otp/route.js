import {NextResponse, NextRequest} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import ServerCustomError from "@/server/helpers/error";
import {errorMessageKeys} from "@/server/config/error-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import regularExpressions from "@/client/utils/regular-expressions";
import prisma from "@/server/lib/prisma-client";
import jsonWebToken from "@/server/lib/jwt";
import cuid2 from "@/server/lib/cuid-2";
import successMessages from "@/server/config/success-messages";
import {showEncryptedData} from "@/client/utils/enivorment-type";
import cookieKeys from "@/server/config/cookie-keys";

export async function POST(req) {
    // TRY BLOCK
    try {
        // CREATE NEXT REQUEST OBJECT
        const request = new NextRequest(req);

        // PARSING ENCRYPTED DATA FROM REQUEST BODY
        const {encryptedData = undefined} = await request.json();

        // THROW ERROR IF NO ENCRYPTED DATA FOUND
        if(!encryptedData){
            throw new ServerCustomError(errorMessageKeys.invalidBody, responseStatus.badRequest);
        }

        // DECRYPT ENCRYPTED DATA
        const decryptedData = cryptoPublic.decryptObject(encryptedData);

        // THROW ERROR IF NO MOBILE NUMBER FOUND
        if (!regularExpressions.mobileNumber.test(decryptedData?.mobileNumber)) {
            throw new ServerCustomError(errorMessageKeys.invalidMobileNumber, responseStatus.badRequest);
        }

        // THROW ERROR IF NO OTP NUMBER FOUND
        if (!regularExpressions.otpNumber.test(decryptedData?.otpNumber)) {
            throw new ServerCustomError(errorMessageKeys.invalidOtpNumber, responseStatus.badRequest);
        }

        // FETCH OTP FROM DATABASE
        const foundOtp = await prisma.otp.findUnique({
            where: {
                mobileNumber: decryptedData.mobileNumber,
                AND: [{otpNumber: {equals: decryptedData.otpNumber,}}]
            }
        })

        // THROW ERROR IF NOT OTP FOUND
        if(!foundOtp) {
            throw new ServerCustomError(errorMessageKeys.invalidOtpNumber, responseStatus.unAuthorized);
        }

        // UPDATE OTP TO NULL
        await prisma.otp.update({
            data: {
                otpNumber: null,
                otpValidityStart: null,
                otpValidityEnd: null,
            },
            where: {
                mobileNumber: decryptedData.mobileNumber,
            }
        })

        // FETCH STUDENT ID FROM DATABASE
        const student = await prisma.student.upsert({
            create: {
                studentId: cuid2.id(),
                mobileNumber: decryptedData.mobileNumber,
            },
            update: {},
            where: {
                mobileNumber: decryptedData.mobileNumber,
            },
            select: {
                studentId: true
            }
        });

        // THROW ERROR IF STUDENT ID NOT FOUND
        if(!student?.studentId){
            throw new ServerCustomError(errorMessageKeys.invalidOtpNumber, responseStatus.unAuthorized);
        }

        // CREATE TOKEN USING THE STUDENT ID
        const token = jsonWebToken.sign({id: student.studentId});

        // UPDATING SESSION FOR THIS CURRENT USER IN DATABASE
        await prisma.session.upsert({
            create: {
                sessionId: token,
                userId: student.studentId,
            },
            update: {
                sessionId: token,
            },

            where: {
                userId: student.studentId,
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

        // CREATE RESPONSE OBJECT
        const response = NextResponse.json(
            {
                ...(showEncryptedData ? {encryptedResponse: encryptedResponseData} : responseData)
            },
            {
                status: responseStatus.ok
            }
        )

        // SET COOKIE IN RESPONSE
        response.cookies.set(cookieKeys.userAuth, token, {
            httpOnly: true,
            secure: true,
            sameSite: "secure",
            path: "/"
        })

        // RETURN RESPONSE
        return response;
    }
    // CATCH BLOCK
    catch (error) {
        // RETURN ERROR RESPONSE HANDLER
        return errorResponseMiddleware(error);
    }
}