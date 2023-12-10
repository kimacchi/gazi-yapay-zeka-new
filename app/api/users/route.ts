import { getList, deleteAllUsers } from "@/controllers/userController"
import { User } from "@/types/user"
import { NextApiRequest } from "next"

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

interface UserRequest extends NextApiRequest{
    json(): Promise<User>
    body: User
}

export async function GET(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const {searchParams} = new URL(req.url);

    const page = parseInt((searchParams.get("page") ? searchParams.get("page") : "1") as string)
    const perPage = parseInt((searchParams.get("perPage") ? searchParams.get("perPage") : "20") as string)

    const list = await getList(page, perPage, pb)
    return new Response(JSON.stringify(list))
}

export async function DELETE(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: delete all users but check if the request has the validation
    const user = await deleteAllUsers(pb);
    return new Response(JSON.stringify(user))
}