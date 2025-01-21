import {NextResponse, NextRequest} from "next/server";
import {cookies} from "next/headers";
import cookieKeys from "@/server/config/cookie-keys";
import {errorMessageKeys} from "@/server/config/error-messages";
import jsonWebToken from "@/server/lib/jwt";

export async function GET(req) {
    try {
        const request = new NextRequest(req);
        // GET ALL COOKIES
        const allCookies = await cookies();

        // GET TOKEN FROM COOKIES
        const token = allCookies.get(cookieKeys.userAuth)?.value;

        if(!token) {
            throw new Error(errorMessageKeys.unAuthorized);
        }

        // VERIFY THE TOKEN
        const isValidated = jsonWebToken.verify(token);

        // THROW NEW ERROR IF NO ID FOUND FROM THE TOKEN
        if(!isValidated?.id) {
            throw new Error(errorMessageKeys.unAuthorized);
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
            throw new Error(errorMessageKeys.unAuthorized);
        }

        return NextResponse.json({verified: true}, {status: 200})
    } catch(error) {
        return NextResponse.json({verified: false}, {status: 401})
    }
}