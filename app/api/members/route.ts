import { createMember, getMembers } from "@/controllers/memberController";
import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
export async function GET(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get all members
    return new Response(JSON.stringify(await getMembers(pb)))
}

export async function POST(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const body = await req.formData()
    console.log(body, "this is inside post request member")
    // TODO: create a member
    const createdMember = await createMember(body, pb)
    return new Response(JSON.stringify(createdMember))
}