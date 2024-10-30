import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    console.log(req);
  },
  {
    isReturnToCurrentUrl: true,
  }
);

export const config = {
  matcher: [
    "/((?!api|_next_static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)",
  ],
};
