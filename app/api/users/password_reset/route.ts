import { sendPasswordReset } from "@/controllers/userController";
import { NextApiRequest } from "next";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

interface PasswordResetRequest extends NextApiRequest {
    json(): Promise<{email: string}>,
    body: {email: string}
}


// TODO: set the pocketbase mail settings to match the domain of the app
export async function POST(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const {email} = await req.json();
    const result = await sendPasswordReset(email, pb)
    return new Response(JSON.stringify(result));
}