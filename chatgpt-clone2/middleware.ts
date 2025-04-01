import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "./constants/routes";
import { cookies } from "next/headers";
import { verify } from "./actions/sessions";

//
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPublicResponse = PUBLIC_ROUTES.includes(pathname); //public_routes 로그인없이도 접근 가능 하도록 하는 
    const cookieStore = await cookies()

    const cookie = cookieStore.get('session')?.value;
    const session = await verify(cookie);

    if (!isPublicResponse && !session) {
        //로그인을 하지 않았는데 채팅 페이지에 접근 할 경우
        console.log(isPublicResponse, ">>>>>>>>>>", !session, "    pathname : ", pathname)
        // 로그인이 안되었을경우 로그인으로 redirect
        return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl))
    }

    if (isPublicResponse && session) {
        //로그인을 한 상태에서 로그인, 호원가입에 넘기지 않도록
        return NextResponse.redirect(new URL(BASE_URL, request.nextUrl))

    }

    return NextResponse.next();

}

//미들웨어는 프로젝트에 모든 경로에서 호출이 되기 떄문에
//특정경로를 정확히 타겟팅하거나 제외하기 위해 matcher config 설정
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        //아래 파일 제외하고 모든 요청에 middleware 실행되도록 matcher  설정 
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}



