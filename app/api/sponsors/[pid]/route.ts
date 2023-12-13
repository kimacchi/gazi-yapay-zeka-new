import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
export async function GET(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get single sponsor
    return new Response(JSON.stringify({}))
}

export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: delete single sponsor
    return new Response(JSON.stringify({}));
}

export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: update single sponsor
    return new Response(JSON.stringify({}))
}