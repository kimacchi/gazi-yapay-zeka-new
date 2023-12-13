import { getCommittees } from "@/controllers/committeeController"
import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function GET(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get all committees
    return new Response(JSON.stringify(await getCommittees(pb)))
}

export async function POST(req: Request) {
    // TODO: create a committee
    return new Response(JSON.stringify({}))
}