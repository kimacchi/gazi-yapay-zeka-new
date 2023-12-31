import { addParticipant, removeParticipant } from "@/controllers/eventController";
import {cookies} from "next/headers"
import PocketBase from "pocketbase";
// import pb from "@/controllers/pocketbase"

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
// const token = cookies().get("token")
// pb.authStore.loadFromCookie(token?.value || "");

export async function POST(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const body = await req.json();
    return new Response(JSON.stringify(await addParticipant(params.pid, body, pb)));
}

export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    return new Response(JSON.stringify(await removeParticipant(params.pid, pb)));
}