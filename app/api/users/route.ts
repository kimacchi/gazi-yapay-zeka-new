import { getList } from "@/controllers/userController"
import { User } from "@/types/user"
import { NextApiRequest } from "next"

interface UserRequest extends NextApiRequest{
    json(): Promise<User>
    body: User
}

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);

    const page = parseInt((searchParams.get("page") ? searchParams.get("page") : "1") as string)
    const perPage = parseInt((searchParams.get("perPage") ? searchParams.get("perPage") : "20") as string)

    const list = await getList(page, perPage)
    return new Response(JSON.stringify(list))
}