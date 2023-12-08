import { getAdminList } from "@/controllers/eventController"
import {cookies} from "next/headers"
import PocketBase from "pocketbase";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const page = searchParams.get("page");
    const perPage = searchParams.get("per_page");

    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    if(pb.authStore.isValid){
        const adminList = await getAdminList(pb)
        return new Response(JSON.stringify(adminList))
    }else{
        return new Response(JSON.stringify({error: "Not Authorized"}))
    }

}