import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        // await để lấy session
        const session = await auth();

        // Nếu chưa đăng nhập, redirect về /sign-in
        if (!session.userId) {
            const url = new URL("/sign-in", req.url);
            return NextResponse.redirect(url);
        }
    }
});
