import {NextApiRequest} from "next";
import {resetPassword} from "@/controllers/userController";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

interface PasswordResetRequest extends NextApiRequest {
    json(): Promise<{
        password: string,
        passwordConfirm: string
    }
>,
    body: {
        password: string,
        passwordConfirm: string
    }
}

export async function POST(req: Request, {params}: {params: {token: string}}) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const {password, passwordConfirm} = await req.json();
    const result = await resetPassword(params.token, password, passwordConfirm, pb)
    return new Response(JSON.stringify(result));
}
