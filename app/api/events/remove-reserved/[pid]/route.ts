import { deleteReserved } from "@/controllers/eventController";
import { cookies } from "next/headers";
import PocketBase from "pocketbase";
// import pb from "@/controllers/pocketbase"


const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const {searchParams} = new URL(req.url);
    const user_id = searchParams.get("user_id");
    // TODO: delete one event
    return new Response(JSON.stringify(await deleteReserved(params.pid, user_id || "", pb)));
}