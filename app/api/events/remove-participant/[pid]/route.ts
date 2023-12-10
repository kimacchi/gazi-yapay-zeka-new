import { removeAnyParticipant } from "@/controllers/eventController";
import { user } from "@nextui-org/react";
import {cookies} from "next/headers"
import PocketBase from "pocketbase";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const {searchParams} = new URL(req.url);
    const user_id = searchParams.get("user_id");
    if(user_id)
        return new Response(JSON.stringify(await removeAnyParticipant(params.pid, user_id, pb)));
    else
        return new Response(JSON.stringify({error: "user_id is not provided"}));
}