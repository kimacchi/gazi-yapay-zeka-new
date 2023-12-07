import { getUser, deleteUser, patchUser } from "@/controllers/userController";
import { NextApiRequest } from "next";
import { UserPatch } from "@/types/user";
import { cookies } from "next/headers";
import PocketBase from "pocketbase";


interface UserPatchRequest extends NextApiRequest{
    json(): Promise<UserPatch>
    body: UserPatch
} 

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");


export async function GET(req: Request, { params }: { params: { pid: string } }){
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    console.log(params)
    return new Response(JSON.stringify(await getUser(params.pid, pb)))
}

export async function DELETE(req: Request, {params}: {params: {pid: string}}){
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");

    const status = await deleteUser(params.pid, pb)
    return new Response(JSON.stringify(status));
}

export async function PATCH(req: Request, {params}: {params: {pid: string}}){
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");

    const body = await req.json();
    const patchedUser = await patchUser(params.pid, body, pb)
    return new Response(JSON.stringify(patchedUser))
}
