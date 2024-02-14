import { deleteMember, getMember, updateMember } from "@/controllers/memberController";
import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
export async function GET(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get one member
    return new Response(JSON.stringify(await getMember(params.pid, pb)));
}
export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const body = await req.formData();
    // TODO: update one member
    return new Response(JSON.stringify(await updateMember(params.pid, body, pb)));
}
export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: delete one member
    return new Response(JSON.stringify(await deleteMember(params.pid, pb)));
}