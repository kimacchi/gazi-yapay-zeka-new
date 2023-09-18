import { login } from "@/controllers/userController"
import { User } from "@/types/user"
import { NextApiRequest } from "next"

interface UserRequest extends NextApiRequest{
    json(): Promise<User>
    body: User
}

export async function POST(request: UserRequest) {
    const body = await request.json()
    const authData = await login(body.email, body.password)
    return new Response(JSON.stringify(authData))
}