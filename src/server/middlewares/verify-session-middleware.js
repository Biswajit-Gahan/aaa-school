import "server-only";
import {cookies} from "next/headers";
import ServerCustomError from "@/server/helpers/error";
import {errorMessageKeys} from "@/server/config/error-messages";
import responseStatus from "@/server/config/response-status";
import jsonWebToken from "@/server/lib/jwt";
import prisma from "@/server/lib/prisma-client";
import cookieKeys from "@/server/config/cookie-keys";

export default async function verifySessionMiddleware() {
    // GET ALL COOKIES
    const allCookies = await cookies();

    // GET TOKEN FROM COOKIES
    const token = allCookies.get(cookieKeys.userAuth)?.value;

    // THROW NEW ERROR IF NO TOKEN FOUND
    if (!token) {
        throw new ServerCustomError(errorMessageKeys.unAuthorized, responseStatus.unAuthorized);
    }

    // VERIFY THE TOKEN
    const isValidated = jsonWebToken.verify(token);

    // THROW NEW ERROR IF NO ID FOUND FROM THE TOKEN
    if(!isValidated?.id) {
        throw new ServerCustomError(errorMessageKeys.unAuthorized, responseStatus.unAuthorized);
    }

    // FIND SESSION IN DATABASE
    const session = await prisma.session.findUnique({
        where: {
            userId: isValidated.id,
            AND: [{sessionId: {equals: token}}]
        },
        select: {
            sessionId: true,
        }
    });

    // THROW NEW ERROR IF NO SESSION ID FOUND OR SESSION ID IS NOT EQUALS TO CLIENT TOKEN
    if(!session?.sessionId){
        throw new ServerCustomError(errorMessageKeys.unAuthorized, responseStatus.unAuthorized);
    }

    // RETURN USER ID
    return isValidated.id;
}