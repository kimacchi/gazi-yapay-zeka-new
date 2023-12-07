import pb from "@/controllers/pocketbase"
import { login } from "@/controllers/userController"
import { User } from "@/types/user"
import { NextApiRequest } from "next"
import { cookies } from "next/headers"

interface UserRequest extends NextApiRequest{
    json(): Promise<User>
    body: User
}

export async function POST(request: Request) {
    const body = await request.json()
    const authData = await login(body.email, body.password)
    console.log(pb.authStore.token)
    document.cookie = pb.authStore.exportToCookie({httpOnly: false})
    cookies().set("token", pb.authStore.token, {path: "/", secure: true})
    console.log(cookies().getAll(), "xxxx")
    return new Response(JSON.stringify(authData))
}