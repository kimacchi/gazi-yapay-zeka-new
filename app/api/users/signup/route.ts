import { createUser } from "@/controllers/userController"
import { User } from "@/types/user"
import { NextApiRequest } from "next"

interface UserRequest extends NextApiRequest{
    json(): Promise<User>
    body: User
}

export async function POST(request: Request) {
    const body = await request.json()
    console.log(body, "this is inside route")
    const user = await createUser(body)
    return new Response(JSON.stringify(user))
    // return new Response(JSON.stringify({"dfa": "sadfa"}))
}