// import pb from "@/controllers/pocketbase"
// import { login } from "@/controllers/userController"
import { User } from "@/types/user";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

interface UserRequest extends NextApiRequest {
  json(): Promise<User>;
  body: User;
}

export async function POST(request: Request) {
  // ! this makes no sense, user needs to click the button in order for this to work
  // const token = cookies().get("pb_auth")?.value
  // pb.authStore.loadFromCookie(token || "");
  // if(pb.authStore.isValid){
  //     return new Response(JSON.stringify({
  //         token: pb.authStore.token,
  //         record: pb.authStore.model
  //     }))
  // }
  const login = async (verifier: string, password: string, pb: PocketBase) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(verifier, password);
      console.log(authData);
      console.log(pb.authStore.model);
      cookies().set("pb_auth", pb.authStore.exportToCookie({ httpOnly: false }));
      return authData;
    } catch (error) {
      const err = error as any;

      if (
        err.response.message === "Failed to authenticate." ||
        err.status === 400
      ) {
        return { error: error, status: 400 };
      }
      return { error: error };
    }
  };

  const body = await request.json();
  const authData = await login(body.email, body.password, pb);
//   cookies().set("pb_auth", pb.authStore.exportToCookie({ httpOnly: false }));
  return new Response(JSON.stringify(authData));
}
