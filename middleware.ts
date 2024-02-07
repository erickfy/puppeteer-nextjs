import {
    DEFAULT_UNAUTHORIZED_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    privateRoutes,
    publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {

    const { nextUrl } = request;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.some(route => {
        if (route.startsWith("/profile/")) {
            return route.startsWith('/profile')
        } else {
            return nextUrl.pathname === route;
        }
    });

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (!isPrivateRoute) {
        return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, nextUrl))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}