import { createUser } from "@/controllers/userController"
import { User } from "@/types/user"
import { NextApiRequest } from "next"

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

interface UserRequest extends NextApiRequest{
    json(): Promise<User>
    body: User
}

export async function POST(request: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const body = await request.json()
    console.log(body, "this is inside route")
    const user = await createUser(body, pb)
    return new Response(JSON.stringify(user))
    // return new Response(JSON.stringify({"dfa": "sadfa"}))
}