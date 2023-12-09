import { getEvent, updateEvent, deleteEvent } from "@/controllers/eventController";
import {cookies} from "next/headers"
import PocketBase from "pocketbase";
// import pb from "@/controllers/pocketbase"


const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
// const token = cookies().get("token")
// pb.authStore.loadFromCookie(token?.value || "");

export async function GET(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get one event
    return new Response(JSON.stringify(await getEvent(params.pid, pb)));
    
}
export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: update one event
    return new Response(JSON.stringify(await updateEvent(params.pid, await req.json(), pb)));
}
export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: delete one event
    return new Response(JSON.stringify(await deleteEvent(params.pid, pb)));
}