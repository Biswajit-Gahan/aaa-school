import {NextRequest, NextResponse} from "next/server";
import cookieKeys from "@/server/config/cookie-keys";
import {errorMessageKeys} from "@/server/config/error-messages";
import {cookies} from "next/headers";

export default async function middleware(req) {
        const request = new NextRequest(req);
    try {

        const path = request.nextUrl.pathname;
        const cookieStore = await cookies();
        let userAuth = cookieStore.get(cookieKeys.userAuth)?.value || undefined;

        const PROTECTED_ROUTES = ['/student/home'];

        if (PROTECTED_ROUTES.includes(path)) {
            if(!userAuth) {
                throw new Error(errorMessageKeys.unAuthorized);
            }

            const response = await fetch("http://localhost:3000/api/v1/auth/verify-token", {
                headers: {
                    "Cookie": cookieStore.toString()
                }
            });

            if(!response.ok) {
                throw new Error(errorMessageKeys.unAuthorized);
            }
        }

        if(userAuth && path === "/student/login") {
            return NextResponse.redirect(new URL("/student/home", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        const response = NextResponse.redirect(new URL("/student/login", request.url));
        if(error.message === errorMessageKeys.unAuthorized) {
            response.cookies.delete(cookieKeys.userAuth);
            return response;
        }
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}