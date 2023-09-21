import {NextApiRequest} from "next";
import {resetPassword} from "@/controllers/userController";

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
    const {password, passwordConfirm} = await req.json();
    const result = await resetPassword(params.token, password, passwordConfirm)
    return new Response(JSON.stringify(result));
}
