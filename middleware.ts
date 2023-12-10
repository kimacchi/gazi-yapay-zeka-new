import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PocketBase from "pocketbase";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  let cookie = req.cookies.get("pb_auth");
  const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
  if (cookie) {
    try {
      pb.authStore.loadFromCookie(cookie.value);
      console.log("worked!");
    } catch (error) {
      pb.authStore.clear();
      // response.headers.set(
      //   "set-cookie",
      //   pb.authStore.exportToCookie({ httpOnly: false })
      // );
      console.log("failed...");
    }
  }

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    if(pb.authStore.isValid) console.log("it is valid!")
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
    
  } catch (err) {
    // clear the auth store on failed refresh
    console.log("failed to refresh auth");
    pb.authStore.clear();
    response.headers.set(
      "set-cookie",
      pb.authStore.exportToCookie({ httpOnly: false })
    );
  }
  // if(req.nextUrl.pathname.startsWith("/signup")){
  //   pb.authStore.clear();
  //   response.headers.set(
  //     "set-cookie",
  //     ""
  //   );
  //   const loginUrl = new URL("/signup", req.url);
  //   return NextResponse.redirect(loginUrl);

  // }
  if(pb.authStore.isValid && req.nextUrl.pathname.startsWith("/login")){
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  if(!pb.authStore.isValid && req.nextUrl.pathname.startsWith("/dashboard")){
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}
