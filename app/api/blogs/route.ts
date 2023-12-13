import { getAllBlogs, createBlog } from "@/controllers/blogController"
import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function GET(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const blogs = await getAllBlogs()
    return new Response(JSON.stringify(blogs))
}

export async function POST(req: Request) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const body = await req.formData()
    const record = await createBlog(body)
    return new Response(JSON.stringify(record))
}