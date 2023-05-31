// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const Authheader = request.headers.get("Authorization");
  const origin = request.headers.get("origin");
  let err: any = " ";
  if (Authheader) {
    const token = Authheader.split(`Bearer `)[1];

    const { userinfo } = await (
      await fetch(`http://${origin}.com/api/api-clients/${token}`)
    ).json();
    if (userinfo) {
      try {
        const auth = new Headers(request.headers);
        auth.set(`Authorization`, token);

        return NextResponse.next({ request: { headers: auth } });
      } catch (error) {
        err = error;
      }
    }
    err = "authentication token must be bearer token";
  } else {
    err = `authorization header required`;
    return new NextResponse(JSON.stringify({ err }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/orders/:path*",
};
