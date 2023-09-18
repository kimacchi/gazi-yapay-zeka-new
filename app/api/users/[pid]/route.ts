import { getUser, deleteUser, patchUser } from "@/controllers/userController";
import { NextApiRequest } from "next";
import { UserPatch } from "@/types/user";

interface UserPatchRequest extends NextApiRequest{
    json(): Promise<UserPatch>
    body: UserPatch
} 

export async function GET(req: Request, { params }: { params: { pid: string } }){
    console.log(params)
    return new Response(JSON.stringify(await getUser(params.pid)))
}

export async function DELETE(req: Request, {params}: {params: {pid: string}}){
    const status = await deleteUser(params.pid)
    return new Response(JSON.stringify(status));
}

export async function PATCH(req: UserPatchRequest, {params}: {params: {pid: string}}){
    const body = await req.json();
    const patchedUser = await patchUser(params.pid, body)
    return new Response(JSON.stringify(patchedUser))
}
