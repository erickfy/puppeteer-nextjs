import {
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_UNAUTHORIZED_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    privateRoutes,
    publicRoutes,
} from "@/routes";
import { verifyRequestOrigin } from "lucia";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {

    const { nextUrl } = request;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.some(route => {
        if (route.startsWith("/profile/")) {
          // Para las rutas de perfil con expresiones regulares
        //   const regex = new RegExp(`^${route}$`);
            //   return regex.test(nextUrl.pathname);
            console.log("((((((((((((((((((((((((((((((((((((((((((((((((((((((")
        return route.startsWith('/profile')
        } else {
          // Para otras rutas, verificación exacta
          return nextUrl.pathname === route;
        }
      });
    
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // console.log("isPublicRoute", isPublicRoute)
    console.log("isPrivateRoute", isPrivateRoute)

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (!isPrivateRoute) {
        return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, nextUrl))
        // const url = new URL(request.url);
        // const urlAuthorized = `${url.origin}${apiAuthPrefix}/check-cookie`;

        // const req = await fetch(urlAuthorized, { method: 'GET' });

        // if (!req.ok) {
        //     console.error(`Error: ${req.status} - ${req.statusText}`);
        //     const { status } = req
        //     if (status === 401) {
        //         // go to protected
        //         return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, nextUrl))
        //     } else if (status === 404) {
        //         // notFound()
        //     }
        //     if (status === 200) {
        //         return NextResponse.next();
        //     }
        // }
        // console.log("bueno", isPrivateRoute)
        // return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, nextUrl))
    }

    // const originHeader = request.headers.get("Origin");
    // const hostHeader = request.headers.get("Host");
    // if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
    //     return new NextResponse(null, {
    //         status: 403
    //     });
    // }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}