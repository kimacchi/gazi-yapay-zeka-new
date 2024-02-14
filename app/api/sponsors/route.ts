import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
export async function GET(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get all the sponsors
    return new Response(JSON.stringify({}))
}

export async function POST(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: create a new sponsor
    return new Response(JSON.stringify({}));
}


