import { deleteCommittee, updateCommittee, getCommittee} from "@/controllers/committeeController";
import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function GET(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get one committee
    return new Response(JSON.stringify(await getCommittee(params.pid, pb)));
}
export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: update one committee
    const body = await req.json();

    return new Response(JSON.stringify(await updateCommittee(params.pid, body, pb)));
}
export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: delete one committee
    return new Response(JSON.stringify(await deleteCommittee(params.pid, pb)));
}