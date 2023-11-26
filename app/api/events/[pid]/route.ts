import { getEvent } from "@/controllers/eventController";
import {cookies} from "next/headers"

import PocketBase from "pocketbase";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
const token = cookies().get("token")
pb.authStore.loadFromCookie(token?.value || "");

export async function GET(req: Request, { params }: { params: { pid: string } }) {
    // TODO: get one event
    return new Response(JSON.stringify(await getEvent(params.pid, pb)));
}
export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    // TODO: update one event
    return new Response(JSON.stringify({}));
}
export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    // TODO: delete one event
    return new Response(JSON.stringify({}));
}