import { sendPasswordReset } from "@/controllers/userController";
import { NextApiRequest } from "next";

interface PasswordResetRequest extends NextApiRequest {
    json(): Promise<{email: string}>,
    body: {email: string}
}


// TODO: set the pocketbase mail settings to match the domain of the app
export async function POST(req: Request) {
    const {email} = await req.json();
    const result = await sendPasswordReset(email)
    return new Response(JSON.stringify(result));
}