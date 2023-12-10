import { sendEmailReset } from "@/controllers/userController";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");


// TODO: set the pocketbase mail settings to match the domain of the app
export async function POST(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const {email} = await req.json();
    const result = await sendEmailReset(email, pb)
    return new Response(JSON.stringify(result));
}