import {NextRequest, NextResponse} from "next/server";
import errorResponseMiddleware from "@/server/middlewares/error-response-middleware";
import verifySessionMiddleware from "@/server/middlewares/verify-session-middleware";
import successMessages from "@/server/config/success-messages";
import responseStatus from "@/server/config/response-status";
import cryptoPublic from "@/client/lib/crypto-public";
import {showEncryptedData} from "@/client/utils/enivorment-type";

export async function GET(req) {
    // TRY BLOCK
    try {
        // CREATING REQUEST OBJECT
        const request = new NextRequest(req);

        // VERIFY SESSION
        const userId = await verifySessionMiddleware();

        // GET STUDENT DETAILS FROM DATABASE
        const student = await prisma.student.findUnique({
            where: {
                studentId: userId,
            },
            select: {
                fullName: true,
                examGroup: true,
                mobileNumber: true,
            }
        })

        // CREATE RESPONSE DATA
        const responseData = {
            message: successMessages.success,
            statusCode: responseStatus.ok,
            data: {
                name: student?.fullName || null,
                mobileNumber: student?.mobileNumber || null,
                examGroup: student?.examGroup || null,
                isRegistered: student?.fullName ? true: false
            },
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
        console.log(error)
        return errorResponseMiddleware(error);
    }
}