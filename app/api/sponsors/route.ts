import { cookies } from "next/headers";
import { createSponsor, getSponsors } from "@/controllers/sponsorController"

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function GET(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: get all the sponsors
    return new Response(JSON.stringify(await getSponsors(pb)))
}

export async function POST(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    // TODO: create a new sponsor
    const body = await req.formData()

    const createdSponsor = await createSponsor(body, pb)
    return new Response(JSON.stringify(createdSponsor));
}


