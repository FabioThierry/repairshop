import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  // eslint-disable-next-line
  async function middleware(request: NextRequest) {
    // console.log("req", request);
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    "/((?!api|_next_static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)",
  ],
};
