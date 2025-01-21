import "server-only";

import {NextResponse} from "next/server";
import errorMessages from "@/server/config/error-messages";
import cryptoPublic from "@/client/lib/crypto-public";
import {isProductionServer, showEncryptedData} from "@/client/utils/enivorment-type";
import cookieKeys from "@/server/config/cookie-keys";

export default function errorResponseMiddleware(error, cookie = false) {
    if(typeof cookie !== "boolean") {
        throw new Error("cookie field must be a boolean");
    }

    if(error?.name && error.name === "PrismaClientValidationError") {
        error.message = isProductionServer ? "client validation error" : error.message;
    }

    const responseBody = {
        message: errorMessages[error.message.toLowerCase()] || error.message,
        statusCode: error.statusCode || 500,
        error: true
    }
    const encryptedResponse = cryptoPublic.encryptObject(responseBody);

    const response = NextResponse.json(
        {
            ...(showEncryptedData ? {encryptedResponse} : responseBody)
        },
        {
            status: error.statusCode || 500,
        }
    );

    if(cookie) {
        response.cookies.delete(cookieKeys.userAuth);
    }

    return response;
}